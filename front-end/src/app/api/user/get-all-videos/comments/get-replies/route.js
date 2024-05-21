import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect.js";
import { UserModel } from "@/lib/models/user.model.js";
import { CommentModel } from "@/lib/models/channel/video/comments/comment.model.js";

// to send video comments replies
export const GET = async (req, res) => {
  try {
    // connect to db
    await connectToDB();

    // getting the video id
    const videoId = req.nextUrl.searchParams.get("videoId");
    if (!videoId) throw new Error(`Invalid video id in the request`);
    const commentId = req.nextUrl.searchParams.get("commentId");
    if (!commentId) throw new Error(`Invalid comment id in the request`);

    // getting the comment doc
    const commentDoc = await CommentModel.findOne({ _id: commentId });
    if (!commentDoc)
      throw new Error(`No such comment document found for ${commentId}`);

    // details about the video comments to be sent
    const details = await Promise.all(
      commentDoc.replies.map(async (commentId) => {
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
        message: "comment replies sent.",
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
