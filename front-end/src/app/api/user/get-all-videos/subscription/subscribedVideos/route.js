import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";
import { SubscriptionModel } from "@/lib/models/subscriptions/subscriptions.model.js";

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

    // get the channel name from search query
    const channelName = req.nextUrl.searchParams.get("channelName");
    if (!channelName) throw new Error(`Channel name not provided`);

    // check if channel exists
    const channel = await ChannelModel.findOne({ channelName });
    if (!channel) throw new Error(`Channel not found`);

    // get subscription collection
    const sub = await SubscriptionModel.findOne({ userId: user._id });
    if (!sub) throw new Error(`No subscription found`);

    // check if subscribed to that channel
    if (!channel.subscribers.includes(user._id))
      throw new Error(`No subscription found in channel`);

    let isSubscribed = false;
    for (let i = 0; i < sub.subscriptions.length; i++) {
      if (String(sub.subscriptions[i].channelId) === String(channel._id)) {
        isSubscribed = true;
        break;
      }
    }
    if (!isSubscribed) throw new Error(`No subscription found`);

    // get all the videos for the given channel name
    const AllVideos = await VideoModel.find({ channelName })
      .sort({ createdAt: -1 })
      .limit(3);
    if (!AllVideos || AllVideos.length === 0)
      throw new Error(`No videos found`);

    // data to be sent to the client
    let videos = await Promise.all(
      AllVideos.map(async (obj) => {
        const channel = await ChannelModel.findOne({
          channelName: obj.channelName,
        });
        const videoUploader = await UserModel.findOne({ _id: channel.userId });
        return {
          userId: videoUploader._id,
          videoId: obj.videoId,
          uploader: videoUploader.image,
          thumbnail: obj.thumbnail,
          title: obj.title,
          desc: obj.desc,
          duration: obj.metadata.duration,
          views: obj.views.length,
          dateTime: obj.createdAt,
          visibility: obj.visibility,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "Subscribed Videos sent.",
      videos,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
