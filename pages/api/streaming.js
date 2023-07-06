import { OpenAI } from "langchain/llms/openai";
import SSE from "express-sse";
export const dynamic = "force-dynamic";
const sse = new SSE();

export default function handler(req, res) {
  // const { input } = req.body;

  // if (!input) {
  //   throw new Error("No input");
  // }

  let responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const encoder = new TextEncoder();

  // Initialize model
  const llm = new OpenAI({
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken(token) {
          writer.write(encoder.encode(token));
        },
      },
    ],
  });

  // const [creator, thing] = input.split(", ");
  // create the prompt
  // const prompt = `You are ${creator}. Create me a short song or rap (depending on what you are) about ${thing}. \n\n Make sure to first mention who you are, a brief bio about you and what you are going to do. This is not part of the song. So you can mention it in a normal manner.`;

  const prompt = `You are Drake. Create me a short song or rap (depending on what you are) about Outlaw. \n\n Make sure to first mention who you are, a brief bio about you and what you are going to do. This is not part of the song. So you can mention it in a normal manner.`;
  console.log(prompt);
  // call frontend to backend
  llm.call(prompt).then(() => {
    writer.write(encoder.encode("end"));
    writer.close();
  });

  return new Response(responseStream.readable, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "text/event-stream; charset=utf-8",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
      "Content-Encoding": "none",
    },
  });
}

export const config = {
  runtime: "edge",
};
