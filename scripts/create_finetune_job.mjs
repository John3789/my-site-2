import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is missing in .env.local");
}

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const job = await client.fineTuning.jobs.create({
  model: "gpt-4.1-mini-2025-04-14",
  training_file: "file-MEav1Zc4KLM58ehFifpAb3",
  method: {
    type: "supervised",
    supervised: {
      hyperparameters: {
        n_epochs: 2
      }
    }
  }
});

console.log("Fine-tune job created");
console.log("job_id =", job.id);
console.log("status =", job.status);

