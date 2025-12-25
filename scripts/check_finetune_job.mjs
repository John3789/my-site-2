import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: ".env.local" });

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ change this if you ever want to check the other job
const JOB_ID = "ftjob-BmR7vtMGpkvUc5dC1zk6aLdn";

const job = await client.fineTuning.jobs.retrieve(JOB_ID);

console.log("job_id =", job.id);
console.log("status =", job.status);

if (job.status === "succeeded") {
  console.log("fine_tuned_model =", job.fine_tuned_model);
}

if (job.status === "failed") {
  console.log("error =", job.error);
}

