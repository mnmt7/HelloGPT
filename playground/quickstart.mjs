import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

// to run, go to terminal and enter: cd playground
// then enter: node quickstart.mjs
console.log("Welcome to the LangChain Quickstart Module!");

// ********** CHAIN **********
// const template =
//   "You are coach of {team} IPL team! IPL auction is going to be held next month. Each team is allowed to retain only {noOfPlayers} players. Which {noOfPlayers} players you will pick and why?";

// const prompt = new PromptTemplate({
//   template,
//   inputVariables: ["team", "noOfPlayers"],
// });

// console.log(prompt);

// const formattedPrompt = await prompt.format({
//   team: "Chennai Super Kings",
//   noOfPlayers: 3,
// });

// console.log(formattedPrompt);

// const model = new OpenAI({
//   temperature: 0.9,
// });

// const llmChain = new LLMChain({ prompt, llm: model });

// const resChain = await llmChain.call({
//   team: "Chennai Super Kings",
//   noOfPlayers: 3,
// });

// console.log(resChain);

// // ********** AGENT **********
// const agentModel = new OpenAI({
//   temperature: 0,
//   modelName: "text-davinci-003",
// });

// const tools = [
//   new Calculator(),
//   new SerpAPI(process.env.SERPAPI_API_KEY, {
//     hl: "en", // language
//     gl: "us", // country to search from
//     location: "Austin, Texas, United States", // location used to localize search results
//   }),
// ];

// const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
//   agentType: "zero-shot-react-description",
//   verbose: true,
//   maxIterations: 5,
// });

// const input =
//   "You are coach of Chennai IPL team! IPL 2025 auction is going to be held next month. Each team is allowed to retain only 3 players. Which 3 players you will pick and why";

// const result = await executor.call({ input });

// console.log(result);

// ********** PLAN AND EXECUTE AGENT **********
// const chatModel = new ChatOpenAI({
//   temperature: 0,
//   modelName: "gpt-3.5-turbo",
//   verbose: true,
// });

// const tools = [
//   new Calculator(),
//   new SerpAPI(process.env.SERPAPI_API_KEY, {
//     hl: "en", // language
//     gl: "us", // country to search from
//     location: "Austin, Texas, United States", // location used to localize search results
//   }),
// ];

// const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
//   llm: chatModel,
//   tools: tools,
// });

// const input =
//   "You are coach of Chennai IPL team! IPL 2025 auction is going to be held next month. Each team is allowed to retain only 3 players. Which 3 players you will pick and why";

// const result = await executor.call({ input });

// console.log(result);

// ********** MEMORY **********
const model = new OpenAI();
const memory = new BufferMemory();
const conversationChain = new ConversationChain({
  llm: model,
  memory: memory,
  verbose: true,
});

const res1 = await conversationChain.call({
  input: "Hey, Rock is now the President of US",
});

console.log(res1);

const res2 = await conversationChain.call({
  input: "Who is the President of the US? Give one line description of him.",
});

console.log(res2);
