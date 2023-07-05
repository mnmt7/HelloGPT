"use client";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ResultWithSources from "../components/ResultWithSources";
import "../globals.css";

export default function page() {
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "I remember everything",
      type: "bot",
    },
  ]);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const handleSubmit = async () => {
    try {
      setGenerating(true);
      const response = await fetch("/api/memory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt, isFirstMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const searchRes = await response.json();

      setIsFirstMessage(false);
      setPrompt("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user" },
        { text: searchRes.output.response, type: "bot" },
      ]);
      setError("");
    } catch (err) {
      console.log(err);
    } finally {
      setGenerating(false);
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading1="Memory"
              heading2="Let's see if it can remember whatever information you provide"
              description="This tool uses Buffer Memory and Conversation Chain to remember whatever you provide."
            />
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="brain" />
            <PromptBox
              generating={generating}
              prompt={prompt}
              handleSubmit={handleSubmit}
              placeholderText="Type here..."
              error={error}
              handlePromptChange={handlePromptChange}
            />
          </>
        }
      />
    </>
  );
}
