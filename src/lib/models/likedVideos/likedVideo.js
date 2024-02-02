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
          unique: true,
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
