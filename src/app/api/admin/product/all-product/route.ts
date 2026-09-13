import { NextResponse } from "next/server";
import Product from "@/models/product/Product";
import "@/models/brand/Brand";
import "@/models/category/Category";
import db from "@/lib/db";
//
export async function GET() {
  //
  try {
    await db();
    const products = await Product.find({})
      .populate("brand", "name")
      .populate("category", "name");
    //

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("GET /api/admin/product/all-product error:", error);

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
