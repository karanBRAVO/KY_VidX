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
          videoId: { type: String },
          time: { type: Date, default: Date.now() },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const LikedVideoModel =
  mongoose.models["likedvideo"] ||
  mongoose.model("likedvideo", likedVideoSchema);
