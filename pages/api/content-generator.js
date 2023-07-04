// /pages/api/transcript_chat.js
import { YoutubeTranscript } from "youtube-transcript";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import extractVideoId from "../../utils/extractVideoId";
import getVideoMetaData from "../../utils/getVideoMetaData";
import ResearchAgent from "../../agents/ResearchAgent";

// Global Variables
let chain;
let chatHistory = [];
let transcript = "";
let metadataString = "";
let research;

// Initialize Chain with Data
const initChain = async (transcript, metadataString, research, topic) => {
  try {
    const llm = new ChatOpenAI({
      temperature: 0.7,
      modelName: "gpt-3.5-turbo",
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "You are a helpful social media assistant that provides research, new content and advice to me. \n You are given a transcript of the video: {transcript} \n "
        //and video metadata: {metadata} as well as additional research: {research}"
      ),
      HumanMessagePromptTemplate.fromTemplate(
        "{input}. Remember to use the video transcript references." // and research as well as metadata
      ),
    ]);

    const question = `Write me a script for a new video that provides a commentary on this video in a light hearted, joking manner. It should complement ${topic} with puns`;

    chain = new LLMChain({
      prompt: chatPrompt,
      llm,
      verbose: true,
    });

    const response = await chain.call({
      transcript,
      metadata: metadataString,
      research,
      input: question,
    });

    chatHistory.push({
      role: "assistant",
      content: response.text,
    });

    return response;
  } catch (error) {
    console.error(
      `An error occurred during the initialization of the Chat Prompt: ${error.message}`
    );
    throw error; // rethrow the error to let the calling function know that an error occurred
  }
};

export default async function handler(req, res) {
  const { prompt, topic, firstMsg } = req.body;
  console.log(`Prompt: ${prompt} Topic: ${topic}`);

  if (
    chain === undefined &&
    !prompt.includes("https://www.youtube.com/watch?v=")
  ) {
    return res.status(400).json({
      error:
        "Chain not initialized. Please send a YouTube URL to initialize the chain.",
    });
  }

  chatHistory.push({
    role: "user",
    content: prompt,
  });

  if (firstMsg) {
    console.log("Received URL");
    try {
      const videoId = extractVideoId(prompt);

      const transcriptResponse = await YoutubeTranscript.fetchTranscript(
        videoId
      );

      if (!transcriptResponse) {
        return res.status(400).json({
          error: "An error occurred while fetching transcript",
        });
      }

      transcript = transcriptResponse.map((item) => item.text).join(" ");

      // const metadata = await getVideoMetaData(videoId);

      // metadataString = JSON.stringify(metadata, null, 2);

      // research = await ResearchAgent(topic);

      const response = await initChain(
        transcript,
        "metadataString",
        "research",
        topic
      );

      // return res.status(200).json({ output: research });
      return res.status(200).json({
        output: response,
        chatHistory,
        transcript,
        metadata,
        research,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching transcript" });
    }
  } else {
    console.log("Received question");
    try {
      const question = prompt;

      console.log("Question: ", question);
      console.log("Using old chain: ", chain);

      const response = await chain.call({
        transcript,
        metadata: metadataString,
        research,
        input: question,
      });

      chatHistory.push({
        role: "user",
        content: question,
      });

      chatHistory.push({
        role: "assistant",
        content: response.text,
      });

      // just make sure to modify this response as necessary.
      return res.status(200).json({
        output: response,
        metadata: metadataString,
        transcript,
        chatHistory,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred during the conversation." });
    }
  }
}
