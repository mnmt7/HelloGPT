"use client";

import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import Title from "../components/Title";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ResultWithSources from "../components/ResultWithSources";
import ButtonContainer from "../components/ButtonContainer";
import Button from "../components/Button";

const endpoint = "/api/resume-query-metadata";

const ResumeReader = () => {
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("Who has worked at Coinbase?");
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([
    {
      text: "After loading the vector database, ask me anything about your documents! E.g., Has anyone worked at Meta? Where did Joanna Smith go to school? Does Kaito Esquivel have any recommendations?",
      type: "bot",
    },
  ]);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  const handleSubmitUpload = async () => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Uploading resumes...",
          type: "bot",
        },
      ]);

      const response = await fetch(`/api/resume-upload`);
      const transcriptRes = await response.json();

      if (!response.ok) {
        throw new Error(transcriptRes.error);
      }

      console.log({ transcriptRes });

      const summariesArray = JSON.parse(transcriptRes.output);

      const newMessages = summariesArray.map((summary) => ({
        text: summary.summary,
        type: "bot",
      }));

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      setPrompt("");
    } catch (err) {
      console.error(err);
      setError("Error");
    }
  };

  const handleSubmit = async () => {
    try {
      setGenerating(true);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "...", type: "bot", sourceDocuments: null },
      ]);

      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const searchRes = await response.json();
      console.log({ searchRes });

      setMessages((prevMessages) => prevMessages.slice(0, -1));

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.output,
          type: "bot",
          sourceDocuments: searchRes.sourceDocuments,
        },
      ]);
      setPrompt("");
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <>
      <>
        <TwoColumnLayout
          leftChildren={
            <>
              <PageHeader
                heading1="RoboHR"
                heading2="Your personal HR assistant"
                description="This tool uses Document Loaders, OpenAI Embeddings, Summarization Chain, Pinecone, VectorDB QA Chain, Prompt Templates, and the Vector Store Agent."
              />

              <ButtonContainer>
                <Button
                  handleSubmit={handleSubmitUpload}
                  endpoint=""
                  buttonText=" Upload Resumes 📂"
                />
              </ButtonContainer>
            </>
          }
          rightChildren={
            <>
              <ResultWithSources messages={messages} pngFile="robohr" />

              <PromptBox
                prompt={prompt}
                handlePromptChange={handlePromptChange}
                handleSubmit={handleSubmit}
                error={error}
                placeHolderText={"Enter Prompt"}
                generating={generating}
              />
            </>
          }
        />
      </>
    </>
  );
};

export default ResumeReader;
