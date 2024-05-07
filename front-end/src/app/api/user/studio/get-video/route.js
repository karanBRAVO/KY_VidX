import { connectToDB } from "@/lib/db/connect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";

export const GET = async (req, res) => {
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

    // getting the search params
    const videoId = req.nextUrl.searchParams.get("videoId");
    if (!videoId) throw new Error(`Video Id must be specified`);

    // checking if channel
    if (!user.hasChannel)
      throw new Error(`You don't have channel | Create one now.`);

    // getting the channel details
    const channel = await ChannelModel.findOne({ userId: user._id });
    if (!channel) throw new Error(`Channel not found`);

    // verifying the id
    if (!channel.videos.includes(videoId))
      throw new Error(`No Video Id found in your channel`);

    // getting the video details
    const video = await VideoModel.findOne({ videoId });
    if (!video) throw new Error(`Video not found`);

    let videoData = {
      videoId,
      title: video.title,
      desc: video.desc,
      data: video.data,
      url: video.url,
      thumbnail: video.thumbnail,
      visibility: video.visibility,
      tags: video.tags,
      likes: video.likes.length,
      views: video.views.length,
    };

    return NextResponse.json({
      success: true,
      message: "Video sent successfully",
      videoData,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
