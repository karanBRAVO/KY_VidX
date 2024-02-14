import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
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

    // getting the channel details
    const channelDetails = await ChannelModel.findOne({ userId: user._id });
    if (!channelDetails) throw new Error(`Channel not found`);

    // getting the details from req
    const { videoId, title, desc, data, url, thumbnail, tags, metadata } =
      await req.json();
    if (
      !videoId ||
      !title ||
      !desc ||
      !data ||
      !url ||
      !thumbnail ||
      !tags ||
      !metadata
    )
      throw new Error(`All fields are required`);

    // saving the video
    const newVideo = await VideoModel({
      channelName: channelDetails.channelName,
      videoId,
      title,
      desc,
      data,
      url,
      thumbnail,
      tags,
      metadata,
    });
    await newVideo.save();

    // updating the channel details
    await ChannelModel.updateOne(
      { _id: channelDetails._id },
      { $push: { videos: [videoId] } }
    );

    return NextResponse.json({
      success: true,
      message: "Video uploaded successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
