import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import { ChannelHomeModel } from "@/lib/models/homepage/homepage.model.js";

export const GET = async (req, res) => {
  try {
    // connect to db
    await connectToDB();

    // getting the user id
    const userId = req.nextUrl.searchParams.get("userId");
    if (!userId) throw new Error(`User id not provided`);

    // getting the home page
    const homePage = await ChannelHomeModel.findOne({ userId });
    if (!homePage) throw new Error(`Couldn't find the home page`);

    // data to be sent
    let pageContent = homePage.pageContent;

    return NextResponse.json({
      success: true,
      message: "Channel Home page sent successfully",
      pageContent,
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
