import express from "express";
import { uploadNewVideo } from "../controllers/upload.controller.js";

const router = express.Router();

router.post("/upload-new-video", uploadNewVideo);

export default router;
