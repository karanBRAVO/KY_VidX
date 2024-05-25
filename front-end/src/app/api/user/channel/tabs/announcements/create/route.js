import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { AnnouncementModel } from "@/lib/models/announcements/announcement.model.js";

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
    if (!user.hasChannel) throw new Error(`Don't have channel`);

    // getting the details
    const { title, announcement } = await req.json();
    if (!title) throw new Error(`Title not found`);
    if (!announcement) throw new Error(`Announcement not found`);

    // adding to the database
    const userAnnouncements = await AnnouncementModel.findOne({
      userId: user._id,
    });
    if (userAnnouncements) {
      await AnnouncementModel.updateOne(
        { _id: userAnnouncements._id },
        { $push: { announcements: { title, announcement } } }
      );
    } else {
      const newAnnouncement = new AnnouncementModel({
        userId: user._id,
        announcements: [{ title, announcement }],
      });
      await newAnnouncement.save();
    }

    return NextResponse.json({
      success: true,
      message: "Announcement Posted successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
