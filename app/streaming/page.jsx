"use client";
import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import PromptBox from "../components/PromptBox";
import ResultStreaming from "../components/ResultStreaming";
import TwoColumnLayout from "app/components/TwoColumnLayout";

const Streaming = () => {
  const [generating, setGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState("");
  const [source, setSource] = useState(null);

  const processToken = (token) => {
    return token.replace(/\\n/g, "\n").replace(/\"/g, "");
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      setGenerating(true);
      await fetch("/api/streaming", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: prompt }),
      });

      if (source) {
        source.close();
      }

      const newSource = new EventSource("/api/streaming");
      setSource(newSource);

      newSource.addEventListener("newToken", (event) => {
        const token = processToken(event.data);
        console.log(event.data);
        setData((prevData) => prevData + token);
      });

      newSource.addEventListener("end", (event) => {
        newSource.close();
      });
    } catch (err) {
      console.error(err);
      setError(error);
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    return () => {
      if (source) {
        source.close();
      }
    };
  }, [source]);

  return (
    <>
      <TwoColumnLayout
        leftChildren={
          <>
            <PageHeader heading1="Streaming" heading2="Spit a Rap." />
          </>
        }
        rightChildren={
          <>
            <ResultStreaming data={data} />
            <PromptBox
              prompt={prompt}
              handlePromptChange={handlePromptChange}
              handleSubmit={handleSubmit}
              placeHolderText={"Enter your name and city"}
              error={error}
              pngFile="pdf"
              generating={generating}
            />
          </>
        }
      />
    </>
  );
};

export default Streaming;
