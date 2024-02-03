import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { PlaylistModel } from "@/lib/models/playlist/playlist.model.js";

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

    // getting details
    const { category, name, desc } = await req.json();
    if (!category || !name || !desc) throw new Error(`Invalid values provided`);

    // checking for playlist
    const playlist = await PlaylistModel.findOne({ name });
    if (playlist) throw new Error(`Playlist already exists`);

    // creating a new playlist
    const newPlaylist = new PlaylistModel({
      userId: user._id,
      category,
      name,
      desc,
    });
    await newPlaylist.save();

    return NextResponse.json({
      success: true,
      message: "Playlist created successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
