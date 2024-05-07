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
    if (!category || !name || !desc)
      throw new Error(`All value must be provided`);

    // checking for playlist collection
    const playlist = await PlaylistModel.findOne({ userId: user._id });

    if (!playlist) {
      // creating a new playlist
      const newPlaylist = new PlaylistModel({
        userId: user._id,
        playlists: {
          category,
          name,
          desc,
        },
      });
      await newPlaylist.save();
    } else {
      // checking if name is unique
      for (let i = 0; i < playlist.playlists.length; i++) {
        if (
          playlist.playlists[i].category === String(category) &&
          playlist.playlists[i].name === String(name).toLowerCase()
        ) {
          throw new Error(`Playlist name must be unique. | Already taken.`);
        }
      }
      // update the collection
      await PlaylistModel.updateOne(
        { userId: user._id },
        { $push: { playlists: { category, name, desc } } }
      );
    }

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
