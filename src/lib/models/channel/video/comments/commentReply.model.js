import mongoose from "mongoose";

const commentReplySchema = new mongoose.Schema(
  {
    commentId: {
      type: mongoose.Types.ObjectId,
      ref: "comment",
      required: [true, "To which video this comment belongs to?"],
    },
    reply: {
      type: [
        {
          userId: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, "Who is writing this comment?"],
          },
          comment: {
            type: String,
            required: [true, "Comment is required"],
          },
          dated: {
            type: Date,
            default: new Date(),
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const CommentReplyModel =
  mongoose.models["commentreply"] ||
  new mongoose.model("commentreply", commentReplySchema);
