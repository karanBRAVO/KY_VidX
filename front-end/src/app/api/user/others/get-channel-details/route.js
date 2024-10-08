import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model";

export const GET = async (req, res) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) throw new Error(`Invalid request`);

    // connect to db
    await connectToDB();

    // finding the user in db
    const user = await UserModel.findOne({ _id: userId });
    if (!user) throw new Error(`User not found`);

    // checking if the user has channel
    if (!user.hasChannel) throw new Error(`Sorry, No channel found`);

    // getting the channel details
    const channel = await ChannelModel.findOne({ userId: user._id });
    if (!channel) throw new Error(`Sorry, No channel found`);

    // details to be sent back to the user
    const details = {
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      userImage: user.image,
      userDob: user.dob,
      createdAt: user.createdAt,
      channelId: channel._id,
      channelName: channel.channelName,
      tagline: channel.tagLine,
      subscribers: channel.subscribers.length,
      videos: channel.videos.length,
      location: channel.location,
      joinedat: channel.createdAt,
      bgImg: channel.bgImgUrl,
      views: 0,
    };

    // calculate the views
    await Promise.all(
      channel.videos.map(async (videoId) => {
        const video = await VideoModel.findOne({ videoId });
        details.views += video.views.length;
      })
    );

    return NextResponse.json({
      success: true,
      message: "Channel details sent successfully",
      details,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
