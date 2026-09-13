import { NextResponse } from "next/server";
import Product from "@/models/product/Product";
import db from "@/lib/db";
//
export async function GET() {
  try {
    await db();

    const allProduct = await Product.find({});
    console.log(allProduct)
    // .sort({ createdAt: -1 }).lean();
    return NextResponse.json({
      success: true,
      data: allProduct,
    });
  } catch (error) {
    console.error("GET /api/admin/product/all-product error:", error);
    //
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch all-product",
      },
      {
        status: 500,
      },
    );
  }
}
