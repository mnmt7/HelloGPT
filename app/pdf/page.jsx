"use client";

import React, { useState } from "react";
import ResultWithSources from "../components/ResultWithSources";
import PromptBox from "../components/PromptBox";
import Button from "../components/Button";
import PageHeader from "../components/PageHeader";
import TwoColumnLayout from "../components/TwoColumnLayout";
import ButtonContainer from "../components/ButtonContainer";
import "../globals.css";

// import loader from "./loader.svg";

import { useDropzone } from "react-dropzone";

const PDFLoader = () => {
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const onDrop = async (acceptedFiles) => {
    setUploading(true);

    const file = acceptedFiles[0];

    try {
      const formData = new FormData();
      formData.append("pdfFile", file);

      const response = await fetch("/api/pdf-upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("Error uploading file");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "application/pdf",
  });

  const [prompt, setPrompt] = useState("How to get rich?");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm a Naval AI. What would you like to know?",
      type: "bot",
    },
  ]);
  const [error, setError] = useState("");

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (endpoint) => {
    try {
      console.log(`sending ${prompt}`);
      console.log(`using ${endpoint}`);

      const response = await fetch(`/api/${endpoint}`, {
        method: "GET",
      });

      const searchRes = await response.json();
      console.log(searchRes);
      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleSubmitPrompt = async (endpoint) => {
    setGenerating(true);
    try {
      setPrompt("");

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: prompt, type: "user", sourceDocuments: null },
      ]);

      const response = await fetch(`/api/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const searchRes = await response.json();

      console.log({ searchRes });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: searchRes.result.text,
          type: "bot",
          sourceDocuments: searchRes.result.sourceDocuments,
        },
      ]);

      setError("");
    } catch (error) {
      console.log(error);
      setError(error.message);
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
              heading1="💬 PDF-GPT"
              heading2="Ask anything contained in a PDF document"
              description="This tool will
            let you ask anything contained in a PDF document. This tool uses
            Embeddings, Pinecone, VectorDBQAChain, and VectorStoreAgents. The Book THE ALMANACK OF NAVAL RAVIKANT is provided as a sample. Click on the button below to upload your own PDF."
            />
            <div className="py-5 w-50 text-xl bg-teal-400 text-center rounded-xl hover:cursor-pointer hover:bg-teal-300">
              {uploading ? (
                <img src={""} alt="Uploading..." />
              ) : (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? "Drop Book 📚" : "Upload Book 📚"}
                </div>
              )}
            </div>
          </>
        }
        rightChildren={
          <>
            <ResultWithSources messages={messages} pngFile="pdf" />
            <PromptBox
              generating={generating}
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={() => handleSubmitPrompt("/pdf-query")}
              placeHolderText={"How to get rich?"}
              error={error}
              disableButton={generating}
            />
          </>
        }
      />
    </>
  );
};

export default PDFLoader;
