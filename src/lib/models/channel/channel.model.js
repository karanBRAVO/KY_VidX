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
    subscribers: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "user",
          unique: true,
        },
      ],
      default: [],
    },
    videos: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "video",
          unique: true,
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
  mongoose.models["channel"] || new mongoose.model("channel", channelSchema);
