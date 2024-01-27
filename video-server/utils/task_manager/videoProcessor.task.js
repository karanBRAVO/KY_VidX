import { Queue, Worker } from "bullmq";
import dotenv from "dotenv";
import path from "path";
import { createNewDirIfNotExists } from "../createNewDir.js";
import {
  createMultipleResolutions,
  createThumbnails,
  createHLSfiles,
  createMasterFile,
  removeTempFiles,
} from "./processVideo.js";

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

export const videoProcessorWorker = new Worker(
  queueName,
  async (job) => {
    try {
      const filepath = job.data.filePath;

      const mainDir = path.join(
        path.dirname(filepath),
        path.basename(filepath, path.extname(filepath))
      );
      const multipleResolutionsDir = path.join(mainDir, "multiple_resolutions");
      const thumbnailDir = path.join(mainDir, "thumbnail");
      const hlsDir = path.join(mainDir, "hls");

      createNewDirIfNotExists(
        mainDir,
        thumbnailDir,
        multipleResolutionsDir,
        hlsDir
      );

      await createThumbnails(filepath, thumbnailDir);
      await createMultipleResolutions(filepath, multipleResolutionsDir);
      await createHLSfiles(multipleResolutionsDir, hlsDir);
      createMasterFile(hlsDir);
      removeTempFiles(multipleResolutionsDir, filepath);
    } catch (err) {
      return err;
    }
  },
  {
    connection: {
      host: process.env.Q_HOST || "localhost",
      port: process.env.Q_PORT || 6379,
    },
    autorun: false,
    removeOnComplete: true,
    removeOnFailure: true,
  }
);

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
