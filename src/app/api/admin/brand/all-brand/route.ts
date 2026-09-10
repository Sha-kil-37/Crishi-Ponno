import { NextResponse } from "next/server";
import Brand from "@/models/brand/Brand";
import db from "@/lib/db";
//
export async function GET() {
  try {
    await db();

    const allBrand = await Brand.find({});
    // .sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: allBrand,
    });
  } catch (error) {
    console.error("GET /api/admin/brand/all-brand error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch all-brand data",
      },
      {
        status: 500,
      },
    );
  }
}
