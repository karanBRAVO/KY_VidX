import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    channelName: {
      type: String,
      required: [true, "Channel Name is required"],
      trim: true,
    },
    videoId: {
      type: String,
      required: [true, "Video Id is required"],
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      lowercase: true,
      default: "This is a video title",
    },
    desc: {
      type: String,
      trim: true,
      required: [true, "Description is required"],
      default: "This is a video description",
    },
    data: {
      type: String,
      required: [true, "Data is required"],
      default: "This is video data",
    },
    url: {
      type: String,
      required: [true, "Url is required"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"],
      trim: true,
      default: "",
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
    metadata: {
      duration: {
        type: Number, // seconds
        trim: true,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const VideoModel =
  mongoose.models["video"] || mongoose.model("video", videoSchema);
