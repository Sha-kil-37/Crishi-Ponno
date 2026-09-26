import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
//
export async function GET(request: NextRequest) {
  try {
    await db();

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Categories",
      },
      {
        status: 500,
      },
    );
  }
}
