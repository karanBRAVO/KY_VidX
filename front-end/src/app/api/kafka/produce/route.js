import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db/connect";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { UserModel } from "@/lib/models/user.model.js";
import { get_producer } from "@/lib/_kafka/producer";

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

    // getting the message to be sent
    const { topic_name, msg } = await req.json();
    if (!msg) throw new Error(`Message not found`);
    if (!topic_name) throw new Error(`No topic name`);

    const _data = {
      userId: user._id,
      msg,
    };

    // producing the message
    const producer = await get_producer();

    await producer.send({
      topic: topic_name,
      messages: [
        { key: Math.random().toString(), value: JSON.stringify(_data) },
      ],
    });

    return NextResponse.json({
      success: true,
      message: "Data produced successfully.",
    });
  } catch (e) {
    return NextResponse.json({ success: false, error: e.message });
  }
};
