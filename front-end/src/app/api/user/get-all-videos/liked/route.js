import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";
import { LikedVideoModel } from "@/lib/models/likedVideos/likedVideo";

// to send videos to the home page
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

    // getting all liked videos
    const likedVideos = await LikedVideoModel.findOne({ userId: user._id });
    if (!likedVideos || likedVideos.videoIds.length === 0)
      throw new Error(`No liked videos`);

    // getting all the info about the videos
    let videos = await Promise.all(
      likedVideos.videoIds.map(async (obj) => {
        const video = await VideoModel.findOne({ videoId: obj.videoId });
        const channel = await ChannelModel.findOne({
          channelName: video.channelName,
        });
        const uploadedBy = await UserModel.findOne({ _id: channel.userId });
        return {
          userId: channel.userId,
          videoId: video.videoId,
          uploader: uploadedBy.image,
          thumbnail: video.thumbnail,
          title: video.title,
          desc: video.desc,
          duration: video.metadata.duration,
          views: video.views.length,
          dateTime: video.createdAt,
          likedOn: obj.time,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "Videos sent.",
      videos,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
