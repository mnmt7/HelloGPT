import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import { loadSummarizationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

import { Document } from "langchain/document";

import formidable from "formidable";

import path from "path";
export const config = {
  api: {
    bodyParser: false,
  },
};

async function loadPDF(pdfPath) {
  const loader = new PDFLoader(pdfPath);

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
}

export default async function handler(req, res) {
  try {
    const { fields, files } = await readFile(req);

    // console.log(files);
    let i = 0;

    // console.log(files[`pdfFiles[${0}]`]);

    while (files[`pdfFiles[${i}]`]) {
      const file = files[`pdfFiles[${i}]`][0];
      // console.log(file);

      const filePath = file.filepath;
      console.log(filePath);

      // console.log(" filePath ", filePath);

      await loadPDF(filePath);
      i++;
    }

    return res.status(200).json({ result: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err });
  }
}

const readFile = (req, saveLocally) => {
  const options = {
    multiples: true,
  };

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
