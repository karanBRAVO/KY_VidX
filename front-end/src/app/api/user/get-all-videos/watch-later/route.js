import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { ChannelModel } from "@/lib/models/channel/channel.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";
import { PlaylistModel } from "@/lib/models/playlist/playlist.model.js";

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
    const playlistName = req.nextUrl.searchParams.get("playlist");
    if (!playlistName) throw new Error(`Playlist name not provided`);

    // getting the collection
    const playlist = await PlaylistModel.findOne({
      userId: user._id,
      "playlists.name": playlistName,
    });
    if (!playlist) throw new Error(`Playlist not found`);

    // video ids in playlist
    const { videoIds } = playlist.playlists.find(
      (value) => value.name === playlistName
    );
    let videos = await Promise.all(
      videoIds.map(async (obj) => {
        const video = await VideoModel.findOne({ videoId: obj.videoId });
        const channel = await ChannelModel.findOne({
          channelName: video.channelName,
        });
        const uploader = await UserModel.findOne({ _id: channel.userId });

        return {
          userId: uploader._id,
          videoId: video.videoId,
          uploader: uploader.image,
          title: video.title,
          desc: video.desc,
          thumbnail: video.thumbnail,
          duration: video.metadata.duration,
          dateTime: video.createdAt,
          views: video.views.length,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "Playlist Videos sent.",
      videos,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
