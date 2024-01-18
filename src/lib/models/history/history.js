import mongoose from "mongoose";

const likedVideoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
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

export const LikedVideoModel =
  mongoose.models["subscription"] ||
  new mongoose.model("subscription", likedVideoSchema);
