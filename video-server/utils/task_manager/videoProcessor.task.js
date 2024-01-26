import { Queue, Worker } from "bullmq";
import dotenv from "dotenv";

dotenv.config();

export const queueName = "video-processing-queue";

export const videoProcessorQueue = new Queue(queueName, {
  connection: {
    host: process.env.Q_HOST || "localhost",
    port: process.env.Q_PORT || 6379,
  },
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});

export const videoProcessorWorker = new Worker(queueName, async (job) => {}, {
  connection: {
    host: process.env.Q_HOST || "localhost",
    port: process.env.Q_PORT || 6379,
  },
  autorun: false,
  removeOnComplete: true,
  removeOnFailure: true,
});

videoProcessorWorker.on("completed", (job, result, prev) => {
  console.log(`Job [${job.name}] completed`);
});

videoProcessorWorker.on("progress", (job, progess) => {});

videoProcessorWorker.on("failed", (job, err) => {
  console.log(`Job [${job.name}] failed: ${err}`);
});

videoProcessorWorker.on("error", (err) => {
  console.log(err);
});
