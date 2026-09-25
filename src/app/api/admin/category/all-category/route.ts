import { NextResponse } from "next/server";
import Category from "@/models/category/Category";
import db from "@/lib/db";
//
export async function GET() {
  //
  try {
    await db();
    //
    const allCategory = await Category.find({});
    // .sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: allCategory,
    });
  } catch (error) {
    console.error("GET /api/admin/category/all-category error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch all-category",
      },
      {
        status: 500,
      },
    );
  }
}
