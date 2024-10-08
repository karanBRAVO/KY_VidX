import { connectToDB } from "@/lib/db/connect";
import { NextResponse } from "next/server";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";

export const GET = async (req, res) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) throw new Error("Invalid request");

    // connect to db
    await connectToDB();

    // finding the user in db
    const user = await UserModel.findOne({ _id: userId });
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
          userId: user._id,
          userImg: user.image,
          videoId: video.videoId,
          title: video.title,
          desc: video.desc,
          thumbnail: video.thumbnail,
          visibility: video.visibility,
          views: video.views.length,
          duration: video.metadata.duration,
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
