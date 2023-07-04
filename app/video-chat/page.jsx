"use client";

import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import ResultWithSources from "../components/ResultWithSources";
import TwoColumnLayout from "../components/TwoColumnLayout";

const VideoChat = () => {
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState(
    "https://www.youtube.com/watch?v=0lJKucu6HJc"
  );
  const [error, setError] = useState(null);
  const [firstMsg, setFirstMsg] = useState(true);

  const [messages, setMessages] = useState([
    {
      text: "Hi there! I'm YT chatbot. Please provide a YouTube video URL and I'll answer any questions you have.",
      type: "bot",
    },
  ]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setGenerating(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      const response = await fetch(`/api/video-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt, firstMsg }),
      });

      console.log({ response });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchRes = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.output.text,
          type: "bot",
        },
      ]);

      setPrompt("");
      setFirstMsg(false);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error fetching transcript. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading1="YouTube Chatbot"
              heading2="Talk to Your Videos"
              description="This tool uses the YouTube API, Text Splitters, and the Conversational Retrieval QA CHain."
            />
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="youtube" />
            <PromptBox
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={handleSubmit}
              placeHolderText={
                messages.length === 1
                  ? "Enter a youtube url, e.g., https://www.youtube.com/watch?v=O_9JoimRj8w"
                  : "Ask a follow up question"
              }
              error={error}
              generating={generating}
            />
          </>
        }
      />
    </>
  );
};

export default VideoChat;
