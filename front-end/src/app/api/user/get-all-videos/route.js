import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";

export const GET = async (req, res) => {
  try {
    // connect to db
    await connectToDB();

    // finding all the videos
    const videos = await VideoModel.find({});
    if (!videos || videos.length === 0) throw new Error("No videos found");

    // finding the channel details and user details
    const details = await Promise.all(
      videos.map(async (video) => {
        const channel_name = video.channelName;

        const channel = await ChannelModel.findOne({
          channelName: channel_name,
        });
        if (!channel) {
          reject("Channel not found");
        }

        const user = await UserModel.findOne({ _id: channel.userId });
        if (!user) {
          reject("User not found");
        }

        return {
          userId: user._id,
          userName: user.name,
          userImage: user.image,
          channelName: channel.channelName,
          subscribersCount: channel.subscribers.length,
          videosCount: channel.videos.length,
          channelLocation: channel.location,
          videoId: video._id,
          videoVideoId: video.videoId,
          videoTitle: video.title,
          videoDescription: video.desc,
          videoData: video.data,
          videoThumbnail: video.thumbnail,
          videoTags: video.tags,
          videoLikes: video.likes.length,
          videoViews: video.view.length,
          videoUploadDate: video.createdAt,
          videoUrl: video.url,
          videoMetaData: video.metaData,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "Videos sent.",
      details,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
