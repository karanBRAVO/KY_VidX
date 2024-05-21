import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { CommentModel } from "@/lib/models/channel/video/comments/comment.model.js";

// save the comment reply
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

    // checking if comment id exists
    const commentDoc = await CommentModel.findOne({ _id: commentId });
    if (!commentDoc) throw new Error(`Comment not found`);

    // saving the reply
    const newReply = new CommentModel({
      userId: user._id,
      comment,
      repliedTo: commentDoc._id,
    });
    await newReply.save();

    // updating the comment document
    await CommentModel.updateOne(
      { _id: commentDoc._id },
      { $push: { replies: newReply._id } }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Replied to comment successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      { status: 500 }
    );
  }
};
