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

    // checking if channel
    if (!user.hasChannel)
      throw new Error(`You don't have channel | Create one now.`);

    // getting the channel details
    const channel = await ChannelModel.findOne({ userId: user._id });
    if (!channel) throw new Error(`Channel not found`);

    // getting the videos
    let videos = await Promise.all(
      channel.videos.map(async (videoId) => {
        const video = await VideoModel.findOne({ videoId });
        return {
          videoId: video.videoId,
          title: video.title,
          desc: video.desc,
          data: video.data,
          thumbnail: video.thumbnail,
          visibility: video.visibility,
          tags: video.tags,
          likes: video.likes.length,
          views: video.views.length,
          metadata: video.metadata,
          uploadDate: video.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "Videos sent successfully",
      videos,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
