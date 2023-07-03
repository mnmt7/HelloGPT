"use client";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ResultWithSources from "../components/ResultWithSources";
import "../globals.css";

export default function page() {
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

      console.log(searchRes);

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
    }
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <>
      <Title headingText="Memory" emoji="🧠" />
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader
              heading="I remember everything"
              boldText="Let's see if it can remember whatever information you provide"
              description="This tool uses Buffer Memory and Conversation Chain to remember whatever you provide."
            />
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="brain" />
            <PromptBox
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
