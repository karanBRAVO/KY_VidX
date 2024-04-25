import mongoose from "mongoose";

const channelSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: [true, "User Id is required"],
      unique: true,
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
      required: [true, "Background image URL is required"],
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
          type: mongoose.Types.ObjectId,
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
