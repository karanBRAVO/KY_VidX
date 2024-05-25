import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      unique: true,
    },
    announcements: {
      type: [
        {
          title: {
            type: String,
          },
          announcement: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const AnnouncementModel =
  mongoose.models["announcement"] ||
  mongoose.model("announcement", announcementSchema);
