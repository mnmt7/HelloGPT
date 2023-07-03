import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

let llm;
let memory;
let chain;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input, isFirstMessage } = req.body;

    if (!input) {
      throw new Error("No input provided");
    }

    if (isFirstMessage) {
      console.log("Initializing...");
      llm = new OpenAI({
        model: "gpt-3.5-turbo",
      }); // default model is davinci
      memory = new BufferMemory();
      chain = new ConversationChain({ llm, memory });
    }

    const output = await chain.call({ input });

    console.log("input", input);
    console.log("output", output);

    return res.status(200).json({ output });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
