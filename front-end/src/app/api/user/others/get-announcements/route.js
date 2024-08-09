import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { AnnouncementModel } from "@/lib/models/announcements/announcement.model.js";

export const GET = async (req, res) => {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) throw new Error("Invalid request");

    // connect to db
    await connectToDB();

    // finding the user in db
    const user = await UserModel.findOne({ _id: userId });
    if (!user) throw new Error(`User not found`);

    // checking the channel details
    if (!user.hasChannel) throw new Error(`Don't have channel`);

    // getting the announcements
    const userAnnouncements = await AnnouncementModel.findOne({
      userId: user._id,
    });
    if (!userAnnouncements) throw new Error(`He has no announcements`);
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
