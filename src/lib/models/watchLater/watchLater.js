import mongoose from "mongoose";

const watchLaterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "user",
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

export const WatchLaterModel =
  mongoose.models["subscription"] ||
  new mongoose.model("subscription", watchLaterSchema);
