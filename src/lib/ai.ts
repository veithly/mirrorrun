import OpenAI from "openai";

export function crusoeClient() {
  const apiKey = process.env.CRUSOE_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({
    apiKey,
    baseURL: process.env.CRUSOE_BASE_URL || "https://api.inference.crusoecloud.com/v1",
  });
}

export function crusoeModel() {
  return process.env.CRUSOE_MODEL || "hack-crusoe/Nemotron-3-Nano-30B-A3B-FP8";
}
