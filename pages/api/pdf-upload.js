import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

import formidable from "formidable";

import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  console.log("Inside the PDF handler");

  const { fields, files } = await readFile(req);

  const bookPath = files.pdfFile[0].filepath;
  const loader = new PDFLoader(bookPath);

  const docs = await loader.load();

  if (docs.length === 0) {
    console.log("No documents found");
    return;
  }

  const splitter = new CharacterTextSplitter({
    separator: " ",
    chunkSize: 250,
    chunkOverlap: 10,
  });

  const splitDocs = await splitter.splitDocuments(docs);

  const reducedDocs = splitDocs.map((doc) => {
    const reducedMetadata = { ...doc.metadata };
    delete reducedMetadata.pdf;
    return new Document({
      pageContent: doc.pageContent,
      metadata: reducedMetadata,
    });
  });

  const client = new PineconeClient();

  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });

  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), {
    pineconeIndex,
  });

  return res.status(200).json({ result: reducedDocs });
}

const readFile = (req, saveLocally) => {
  const options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/uploads");
    options.filename = (name, ext, path, form) => {
      const fileName = Date.now().toString() + "-" + name + ext;
      return fileName;
    };
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
