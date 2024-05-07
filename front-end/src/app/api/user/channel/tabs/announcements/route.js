import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    return NextResponse.json({
      success: true,
      message: "Announcements sent successfully",
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message,
    });
  }
};
