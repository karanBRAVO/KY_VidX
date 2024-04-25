import mongoose from "mongoose";

const likedVideoSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      unique: true,
      required: true,
    },
    videoIds: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "video",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const LikedVideoModel =
  mongoose.models["subscription"] ||
  mongoose.model("subscription", likedVideoSchema);
