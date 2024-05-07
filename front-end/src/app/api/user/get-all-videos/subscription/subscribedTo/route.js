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

    // getting all the subscriptions
    const sub = await SubscriptionModel.findOne({ userId: user._id });
    if (!sub || sub.subscriptions.length === 0)
      throw new Error(`You have no subscriptions`);

    // getting the subscribed to details
    let subTo = await Promise.all(
      sub.subscriptions.map(async (obj) => {
        const { channelId, time } = obj;
        const channel = await ChannelModel.findOne({ _id: channelId });
        const user = await UserModel.findOne({ _id: channel.userId });
        return {
          channelId,
          channelName: channel.channelName,
          userId: user._id,
          userName: user.name,
          userImage: user.image,
          subscribedDate: time,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "Subscribed To Data sent.",
      subTo,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
