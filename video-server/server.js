import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import UploadRouter from "./routes/upload.route.js";
import { videoProcessorWorker } from "./utils/task_manager/videoProcessor.task.js";

// creating the express app
const app = express();

// env file setup
dotenv.config();

// cors setup
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// defining the port
const port = process.env.PORT || 5590;

// running the video processing worker
videoProcessorWorker.run();

// serving
app.use(express.static("./videos"));
app.use("/video-server", UploadRouter);

// starting listener
app.listen(port, (err) => {
  if (err) return err;
  console.log(`Server listening on ${port}`);
});
