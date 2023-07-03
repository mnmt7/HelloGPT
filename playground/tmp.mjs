// import {
//   ChatPromptTemplate,
//   HumanMessagePromptTemplate,
//   SystemMessagePromptTemplate,
// } from "langchain/prompts";

import { ZeroShotAgent } from "langchain/agents";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";

// const chatPrompt = ChatPromptTemplate.fromPromptMessages([
//   SystemMessagePromptTemplate.fromTemplate(
//     "You are a helpful social media assistant that provides research, new content and advice to me. \n You are given a transcript of the video: {transcript} \n and video metadata: {metadata} as well as additional research: {research}"
//   ),
//   HumanMessagePromptTemplate.fromTemplate(
//     "{input}. Remember to use the video transcript and research as references."
//   ),
// ]);

// console.log(
//   SystemMessagePromptTemplate.fromTemplate(
//     "You are a helpful social media assistant that provides research, new content and advice to me. \n You are given a transcript of the video: {transcript} \n and video metadata: {metadata} as well as additional research: {research}"
//   )
// );

// console.log(
//   HumanMessagePromptTemplate.fromTemplate(
//     "{input}. Remember to use the video transcript and research as references."
//   )
// );

// console.log(chatPrompt);

// const promptTemplate = ZeroShotAgent.createPrompt([], {
//   prefix: `Answer the following questions as best as you can. You have access to the following tools:`,
//   suffix: `Begin! Answer concisely. It's okay if you don't know the answer.`,
// });

// console.log(promptTemplate);

const loader = new DirectoryLoader(
  "/home/mnmt/dev/langchain/openai-javascript-course/data/resumes",
  {
    ".pdf": (path) => new PDFLoader(path, "/pdf"),
  }
);

const docs = await loader.load();

// console.log("Loaded", docs.length, "documents");

// const splitter = new CharacterTextSplitter({
//   separator: "\n",
//   chunkSize: 200,
//   chunkOverlap: 20,
// });

// const splitDocs = await splitter.splitDocuments(docs);

// console.log(splitDocs[0]);
// console.log(splitDocs[1]);

const chatHistory = [
  {
    role: "human",
    content:
      "You are a helpful social media assistant that provides research, new content and advice to me. \n You are given a transcript of the video: {transcript} \n and video metadata: {metadata} as well as additional research: {research}",
  },
];

const model = new ChatOpenAI({
  temperature: 0.8,
  modelName: "gpt-3.5-turbo",
});

const vectorStore = await HNSWLib.fromDocuments(
  [{ pageContent: "hello world" }],
  new OpenAIEmbeddings()
);

let chain = ConversationalRetrievalQAChain.fromLLM(
  model,
  vectorStore.asRetriever(),
  { verbose: true }
);

const response = await chain.call({
  question: "what is the video about?",
  chat_history: chatHistory,
});

chatHistory.push({
  role: "assistant",
  content: response.text,
});
