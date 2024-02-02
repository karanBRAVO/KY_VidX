import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { SubscriptionModel } from "@/lib/models/subscriptions/subscriptions.model.js";

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
    const { ownerId } = await req.json();
    if (!ownerId) throw new Error(`Owner not found`);

    // checks for channel
    const channel = await ChannelModel.findOne({ userId: ownerId });
    if (!channel) throw new Error(`Channel not found`);
    if (!channel.subscribers.includes(user._id))
      throw new Error(`Not subscribed to this channel`);

    // finding the user log of subscriptions
    const subscription = await SubscriptionModel.findOne({ userId: user._id });
    if (!subscription) throw new Error(`No subscription found`);
    if (!subscription.subscriptions.includes(channel._id)) {
      throw new Error(`Not Subscribed to ${channel.channelName}`);
    }

    // removing the subscription to the owner log
    await ChannelModel.updateOne(
      { userId: ownerId },
      { $pull: { subscribers: user._id } }
    );

    // removing the subscription to the user log
    await SubscriptionModel.updateOne(
      { userId: user._id },
      { $pull: { subscriptions: channel._id } }
    );

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
