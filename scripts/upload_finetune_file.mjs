import dotenv from "dotenv";
import fs from "fs";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing. Confirm it exists in .env.local");
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const path = "dr-salerno-ai-training/salerno_train_chat_1000.jsonl";

if (!fs.existsSync(path)) {
  throw new Error(`File not found: ${path}\nRun: ls -la dr-salerno-ai-training/`);
}

const file = await client.files.create({
  file: fs.createReadStream(path),
  purpose: "fine-tune",
});

console.log("training_file_id =", file.id);

