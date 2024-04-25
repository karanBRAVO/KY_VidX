import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    videoId: {
      type: mongoose.Types.ObjectId,
      ref: "video",
      required: [true, "To which video this comment belongs to?"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Who is writing this comment?"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
    },
  },
  { timestamps: true }
);

export const CommentModel =
  mongoose.models["comment"] || mongoose.model("comment", commentSchema);
