import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    // commentor's id
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: [true, "Who is writing this comment?"],
    },
    // actual comment data
    comment: {
      type: String,
      trim: true,
      required: [true, "Comment is required"],
    },
    // replied to this comment
    replies: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "comment",
        },
      ],
      default: [],
    },
    // if this comment is a reply to another comment
    repliedTo: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
      default: undefined,
    },
  },
  { timestamps: true }
);

export const CommentModel =
  mongoose.models["comment"] || mongoose.model("comment", commentSchema);
