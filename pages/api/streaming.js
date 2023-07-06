import { OpenAI } from "langchain/llms/openai";
import SSE from "express-sse";
export const dynamic = "force-dynamic";
const sse = new SSE();

export default function handler(req, res) {
  if (req.method === "POST") {
    const { input } = req.body;

    if (!input) {
      throw new Error("No input");
    }
    // Initialize model
    const llm = new OpenAI({
      streaming: true,
      callbacks: [
        {
          handleLLMNewToken(token) {
            sse.send(token, "newToken");
          },
        },
      ],
    });

    const [creator, thing] = input.split(", ");
    // create the prompt
    const prompt = `You are ${creator}. Create me a short song or rap (depending on what you are) about ${thing}. \n\n Make sure to first mention who you are, a brief bio about you and what you are going to do. This is not part of the song. So you can mention it in a normal manner.
    
    `;
    console.log(prompt);
    // call frontend to backend
    llm.call(prompt).then(() => {
      sse.send(null, "end");
    });

    return res.status(200).json({ result: "Streaming complete " });
  } else if (req.method === "GET") {
    sse.init(req, res);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
