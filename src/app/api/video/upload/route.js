import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    const userData = await req.json();
    console.log(userData);

    return NextResponse.json({
      success: true,
      message: "File Upload Successfully.",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
