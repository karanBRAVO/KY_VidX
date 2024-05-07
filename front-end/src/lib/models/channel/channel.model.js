import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User Id is required"],
      unique: [true, "Channel name must be unique"],
      ref: "user",
    },
    channelName: {
      type: String,
      required: [true, "Channel Name is required"],
      unique: true,
      trim: true,
    },
    tagLine: {
      type: String,
      required: [true, "Tag Line is required"],
    },
    bgImgUrl: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/vidx-484df.appspot.com/o/Logo.png?alt=media&token=3a6f9ba6-1a26-4367-9a0b-5b0dc2bc8280",
    },
    subscribers: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
      ],
      default: [],
    },
    videos: {
      type: [
        {
          type: String,
          ref: "video",
        },
      ],
      default: [],
    },
    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const ChannelModel =
  mongoose.models["channel"] || mongoose.model("channel", channelSchema);
