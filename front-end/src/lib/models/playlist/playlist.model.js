import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Who is creating this playlist?"],
    },
    category: {
      type: String,
      enum: ["watch-later", "channel"],
      required: [true, "category is required"],
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Playlist name is required"],
      unique: [true, "name must be unique"],
    },
    desc: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Playlist description is required"],
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

export const PlaylistModel =
  mongoose.models["playlist"] || new mongoose.Model("playlist", playlistSchema);
