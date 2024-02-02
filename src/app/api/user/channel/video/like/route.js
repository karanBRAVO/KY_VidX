import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";
import { LikedVideoModel } from "@/lib/models/likedVideos/likedVideo.js";

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
    const { videoId } = await req.json();
    if (!videoId) throw new Error(`video Id not found`);

    // checking for the video
    const video = await VideoModel.findOne({ videoId });
    if (!video) throw new Error(`Video not found`);
    if (video.likes.includes(user._id))
      throw new Error(`Already liked the video.`);

    // checking user logs for likes
    const liked = await LikedVideoModel.findOne({ userId: user._id });
    if (!liked) {
      const newLikes = new LikedVideoModel({ userId: user._id, videoIds: [] });
      await newLikes.save();
    } else if (liked.videoIds.includes(video.videoId)) {
      throw new Error(`Already liked`);
    }

    // adding to the database
    await VideoModel.updateOne({ videoId }, { $set: { likes: user._id } });
    await LikedVideoModel.updateOne(
      { userId: user._id },
      { $push: { videoIds: videoId } }
    );

    return NextResponse.json({
      success: true,
      message: "Liked successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
