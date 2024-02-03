import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";

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
    const { channelName, tagLine, bgImgUrl, location } = await req.json();
    if (!channelName || !tagLine || !bgImgUrl || !location)
      throw new Error(`All fields are required`);

    // finding the channel
    const channel = await ChannelModel.findOne({ userId: user._id });
    if (!channel) throw new Error(`Channel not found`);

    // finding the channel by channel name
    const hasSameChannelSame = await ChannelModel.findOne({ channelName });
    if (hasSameChannelSame) throw new Error(`Channel name already take`);

    // updating the channel
    await ChannelModel.updateOne(
      { _id: channel._id },
      { $set: { channelName, tagLine, bgImgUrl, location } }
    );

    return NextResponse.json({
      success: true,
      message: "Channel updated successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
