import { connectToDB } from "@/lib/db/connect";
import { NextResponse } from "next/server";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";

export const GET = async (req, res) => {
  try {
    // connect to db
    await connectToDB();

    // getting the search params
    const videoId = req.nextUrl.searchParams.get("videoId");
    if (!videoId) throw new Error(`Video Id must be specified`);

    // getting the video details
    const video = await VideoModel.findOne({ videoId });
    if (!video) throw new Error(`Video not found`);

    // getting the channel
    const channel = await ChannelModel.findOne({
      channelName: video.channelName,
    });
    if (!channel) throw new Error(`Channel not found`);

    // getting the uploader
    const uploader = await UserModel.findOne({ _id: channel.userId });
    if (!uploader) throw new Error(`User not found`);

    let videoData = {
      userId: channel.userId,
      videoId,
      channelName: video.channelName,
      title: video.title,
      data: video.data,
      views: String(video.views.length),
      userImg: uploader.image,
      uploadDate: video.createdAt,
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
