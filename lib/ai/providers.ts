import { customProvider, gateway } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { isTestEnvironment } from "../constants";
import { titleModel } from "./models";

export const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://github.com/Predat1/cHATBOT-MULTI-MODELE",
    "X-Title": "cHATBOT-MULTI-MODELE",
  },
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        chatModel,
        titleModel: mockTitleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": mockTitleModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  if (process.env.OPENROUTER_API_KEY) {
    return openrouter.languageModel(modelId);
  }

  return gateway.languageModel(modelId);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }

  if (process.env.OPENROUTER_API_KEY) {
    return openrouter.languageModel(titleModel.id);
  }

  return gateway.languageModel(titleModel.id);
}
