import { NextResponse } from "next/server";
import Product from "@/models/Product";
import db from "@/lib/db";
// GET /api/products
export async function GET() {
  try {
    await db();

    const products = await Product.find();

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Database error",
    });
  }
}
