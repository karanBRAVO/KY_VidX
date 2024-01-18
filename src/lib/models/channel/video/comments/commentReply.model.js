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
          userIDs: {
            type: mongoose.Types.ObjectId,
            ref: "user",
            required: [true, "Who is writing this comment?"],
          },
          comments: {
            type: String,
            required: [true, "Comment is required"],
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const CommentReplyModel =
  mongoose.models["comment"] ||
  new mongoose.model("comment", commentReplySchema);
