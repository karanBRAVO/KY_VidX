import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { AnnouncementModel } from "@/lib/models/announcements/announcement.model.js";

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

    // checking the channel details
    if (!user.hasChannel) throw new Error(`Don't have channel`);

    // getting the announcements
    const userAnnouncements = await AnnouncementModel.findOne({
      userId: user._id,
    });
    if (!userAnnouncements) throw new Error(`You have no announcements`);
    if (userAnnouncements.announcements.length === 0)
      throw new Error(`No announcements yet.`);

    // details to be sent
    const details = userAnnouncements.announcements;

    return NextResponse.json({
      success: true,
      message: "Announcements sent successfully",
      details,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
