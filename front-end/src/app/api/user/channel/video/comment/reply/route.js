import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { CommentModel } from "@/lib/models/channel/video/comments/comment.model.js";
import { CommentReplyModel } from "@/lib/models/channel/video/comments/commentReply.model.js";

export const POST = async (req, res) => {
  try {
    // getting the session details
    const token = await getToken({ req });
    const session = await getServerSession(authOptions);
    if (!token || !session) throw new Error(`Not authenticated`);

    // connect to db
    await connectToDB();

    // finding the user in db
    const user = await UserModel.findOne({
      name: session.user.name,
      email: session.user.email,
    });
    if (!user) throw new Error(`User not found`);

    // getting the details
    const { commentId, comment } = await req.json();
    if (!commentId) throw new Error(`Comment Id not provided`);
    if (!comment) throw new Error(`Comment not provided`);

    // checks on comments
    const com = await CommentModel.findOne({ _id: commentId });
    if (!com) throw new Error(`Comment not found`);

    // adding to the database
    const reply = await CommentReplyModel.findOne({ commentId });
    if (!reply) {
      // create a new reply document
      const newReply = new CommentReplyModel({
        commentId,
        reply: {
          userId: user._id,
          comment,
        },
      });
      await newReply.save();
    } else {
      // push to the reply array
      await CommentReplyModel.updateOne(
        { commentId },
        { $push: { userId: user._id, comment } }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Replied to comment successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
