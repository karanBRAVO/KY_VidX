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
      default:
        "https://firebasestorage.googleapis.com/v0/b/vidx-484df.appspot.com/o/Logo.png?alt=media&token=3a6f9ba6-1a26-4367-9a0b-5b0dc2bc8280",
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      required: [true, "Visibility is required"],
      default: "private",
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
        },
      ],
      default: [],
    },
    comments: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "comment",
        },
      ],
      default: [],
    },
    metadata: {
      duration: {
        type: Number, // seconds
        default: 0,
      },
      size: {
        type: Number, // bytes
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export const VideoModel =
  mongoose.models["video"] || mongoose.model("video", videoSchema);
