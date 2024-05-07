import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Who is creating this playlist?"],
    },
    playlists: {
      type: [
        {
          category: {
            type: String,
            enum: ["watch-later", "channel"],
            lowercase: true,
            trim: true,
          },
          name: {
            type: String,
            lowercase: true,
            trim: true,
          },
          desc: {
            type: String,
            lowercase: true,
            trim: true,
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
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const PlaylistModel =
  mongoose.models["playlist"] || mongoose.model("playlist", playlistSchema);
