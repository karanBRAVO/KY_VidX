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

    // checking the channel details
    if (user.hasChannel) throw new Error(`Already have channel`);

    // getting the channel details
    const { channelName, tagLine, bgImgUrl, location, dob } = await req.json();

    // creating the channel
    const newChannel = new ChannelModel({
      userId: user._id,
      channelName,
      tagLine,
      bgImgUrl,
      location,
    });
    await newChannel.save();

    // updating the channel status
    await UserModel.updateOne(
      { _id: user._id },
      { $set: { hasChannel: true, dob } }
    );

    return NextResponse.json({
      success: true,
      message: "Channel Created successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
