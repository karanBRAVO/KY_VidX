import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { VideoModel } from "@/lib/models/channel/video/video.model.js";
import { CommentModel } from "@/lib/models/channel/video/comments/comment.model.js";

// to send video comments
export const GET = async (req, res) => {
  try {
    // connect to db
    await connectToDB();

    // getting the video id
    const videoId = req.nextUrl.searchParams.get("videoId");
    if (!videoId) throw new Error(`Invalid video id in the request`);

    // getting the comments
    const video = await VideoModel.findOne({ videoId });
    if (!video) throw new Error(`No video found for ${videoId}`);

    // details about the video comments to be sent
    const details = await Promise.all(
      video.comments.map(async (commentId) => {
        const _c = await CommentModel.findOne({ _id: commentId });
        const _u = await UserModel.findOne({ _id: _c.userId });
        return {
          commentorId: _u._id,
          commentor: _u.name,
          commentor_image: _u.image,
          commentId: _c._id,
          comment: _c.comment,
          totalReplies: _c.replies.length,
          commentedAt: _c.createdAt,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        message: "Video comments sent.",
        details,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};
