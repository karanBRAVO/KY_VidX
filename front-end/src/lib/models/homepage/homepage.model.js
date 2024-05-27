import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    pageContent: {
      type: String,
      default: "# Welcome to VidX!",
      trim: true,
    },
  },
  { timestamps: true }
);

export const ChannelHomeModel =
  mongoose.models["homepage"] || mongoose.model("homepage", homeSchema);
