import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import { ZeroShotAgent } from "langchain/agents";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { AgentExecutor } from "langchain/agents";
import SerpAPITool from "../tools/SerpAPI";
import WebBrowserTool from "../tools/WebBrowser";

const ResearchAgent = async (topic) => {
  try {
    const SerpAPI = SerpAPITool();
    const webbrowser = WebBrowserTool();

    const tools = [SerpAPI, webbrowser];

    const promptTemplate = ZeroShotAgent.createPrompt(tools, {
      prefix: `Answer the following questions as best as you can. You have access to the following tools:`,
      suffix: `Begin! Answer concisely. It's okay if you don't know the answer.`,
    });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      new SystemMessagePromptTemplate(promptTemplate),
      HumanMessagePromptTemplate.fromTemplate(`{input}`),
    ]);

    const llm = new ChatOpenAI({});

    const llmChain = new LLMChain({
      llm,
      prompt: chatPrompt,
    });

    const agent = new ZeroShotAgent({
      llmChain,
      allowedTools: tools.map((tool) => tool.name),
    });

    const executor = AgentExecutor.fromAgentAndTools({
      agent,
      tools,
      returnIntermediateSteps: false,
      maxIterations: 3,
      verbose: true,
    });

    const result = await executor.run(`Who is ${topic}?`);

    return result;
  } catch (err) {
    console.error(err);
  }
};

export default ResearchAgent;
