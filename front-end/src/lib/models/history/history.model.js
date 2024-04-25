import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      unique: true,
      required: true,
    },
    details: {
      type: [
        {
          type: {
            videoId: {
              type: mongoose.Types.ObjectId,
              ref: "video",
              required: [true, "Video id is required in history"],
            },
            time: {
              type: Date,
              default: new Date(),
              required: [true, "History time is required"],
            },
          },
          required: [true, "Details are required"],
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const HistoryModel =
  mongoose.models["history"] || mongoose.model("history", historySchema);
