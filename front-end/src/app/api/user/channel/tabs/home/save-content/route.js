import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelHomeModel } from "@/lib/models/homepage/homepage.model.js";

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
    if (!user.hasChannel)
      throw new Error(`Don't have channel | Create one now`);

    // getting the details
    const { pageContent } = await req.json();
    if (!pageContent) throw new Error(`page content cannot be empty.`);

    // saving the response
    const homePage = await ChannelHomeModel.findOne({ userId: user._id });
    if (!homePage) {
      const newHomePage = new ChannelHomeModel({
        userId: user._id,
        pageContent,
      });
      await newHomePage.save();
    } else {
      await ChannelHomeModel.updateOne({ userId: user._id }, { pageContent });
    }

    return NextResponse.json({
      success: true,
      message: "Home page saved successfully.",
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
};
