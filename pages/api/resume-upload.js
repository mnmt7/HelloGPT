import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import { loadSummarizationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";

import formidable from "formidable";

import path from "path";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const { fields, files } = await readFile(req);

    console.log(files);

    const loader = new DirectoryLoader("/tmp", {
      ".pdf": (path) => new PDFLoader(path, "/pdf"),
    });

    const docs = await loader.load();

    console.log("Loaded", docs.length, "documents");

    const splitter = new CharacterTextSplitter({
      separator: "\n",
      chunkSize: 200,
      chunkOverlap: 20,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    const reducedDocs = splitDocs.map((doc) => {
      // console.log(doc.metadata);
      const fileName = doc.metadata.source.split("/").pop();
      const [_, firstName, lastName] = fileName.split("_");
      return {
        ...doc,
        metadata: {
          first_name: firstName,
          last_name: lastName.slice(0, -4),
          docType: "resume",
        },
      };
    });

    let summaries = [];
    const model = new OpenAI({ temperature: 0 });
    const summarizeAllChain = loadSummarizationChain(model, {
      type: "map_reduce",
    });

    const summarizeRes = await summarizeAllChain.call({
      input_documents: docs,
    });

    summaries.push({ summary: summarizeRes.text });

    for (let doc of docs) {
      const summarizeChain = loadSummarizationChain(model, {
        type: "map_reduce",
      });

      const summarizeRes = await summarizeChain.call({
        input_documents: [doc],
      });

      console.log(summarizeRes);

      summaries.push({ summary: summarizeRes.text });
    }

    const client = new PineconeClient();
    await client.init({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

    await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });

    const summaryStr = JSON.stringify(summaries, null, 2);

    return res.status(200).json({ output: summaryStr });

    return;
  } catch (err) {
    // If we have an error

    console.error(err);
    return res.status(500).json({ error: err });
  }
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
