import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";

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

    // getting the video id
    const { videoId } = req.params;
    if (!videoId) throw new Error(`Video id must be provided`);

    // finding the video
    const video = await VideoModel.findOne({ videoId });
    if (!video) throw new Error(`Video not found`);

    // getting the updated details
    const { title, desc, data, thumbnail, tags } = await req.json();
    if (!title || !desc || !data || !tags)
      throw new Error(`All fields must be provided`);

    // updating the details
    await VideoModel.updateOne(
      { videoId },
      { $set: { title, desc, data, thumbnail, tags } }
    );

    return NextResponse.json({
      success: true,
      message: "Video updated successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
