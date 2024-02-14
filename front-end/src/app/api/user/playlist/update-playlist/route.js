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

    // getting the details
    const { playlistId, name, desc, category } = await req.json();
    if (!playlistId || !name || !desc || !category)
      throw new Error(`All fields not provided`);

    // fetching playlists
    const playlist = await PlaylistModel.findOne({ _id: playlistId });
    if (!playlist) throw new Error(`No playlist found`);

    // finding playlist with name
    const hasSameName = await PlaylistModel.findOne({ name });
    if (hasSameName) throw new Error(`Playlist with same name already exists`);

    // updating the playlist
    await PlaylistModel.updateOne(
      { _id: playlistId },
      { $set: { category, name, desc } }
    );

    return NextResponse.json({
      success: true,
      message: "Playlist updated successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
