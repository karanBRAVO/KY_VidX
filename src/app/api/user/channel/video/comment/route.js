import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";
import { CommentModel } from "@/lib/models/channel/video/comments/comment.model.js";

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
    const { videoId, comment } = await req.json();
    if (!videoId) throw new Error(`Video Id not provided`);
    if (!comment) throw new Error(`Comment not provided`);

    // checks on video
    const video = await VideoModel.findOne({ videoId });
    if (!video) throw new Error(`Video not found`);

    // adding to the database
    const newComment = await CommentModel({
      videoId,
      userId: user._id,
      comment,
    });
    await newComment.save();

    return NextResponse.json({
      success: true,
      message: "Commented successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
