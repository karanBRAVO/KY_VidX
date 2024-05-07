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
    const playlist = req.nextUrl.searchParams.get("playlist");
    if (!playlist) throw new Error(`Channel name not provided`);

    let videos = [];

    return NextResponse.json({
      success: true,
      message: "Playlist Videos sent.",
      videos,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
