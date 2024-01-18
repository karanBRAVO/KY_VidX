import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: [true, "Channel Name is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      lowercase: true,
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
    },
    data: {
      type: Buffer,
      required: [true, "Data is required"],
    },
    tags: {
      type: [{ type: String }],
      default: [],
    },
    likes: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
          unique: true,
        },
      ],
      default: [],
    },
    views: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
          required: [true, "views are required"],
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const VideoModel =
  mongoose.models["video"] || new mongoose.model("video", videoSchema);
