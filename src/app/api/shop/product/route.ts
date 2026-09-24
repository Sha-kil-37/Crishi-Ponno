import db from "@/lib/db";
import Brand from "@/models/brand/Brand";
import Category from "@/models/category/Category";
import Product from "@/models/product/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await db();
    //
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.trim() || "";
    const pageParam = searchParams.get("page") || "1";
    const limitParam = searchParams.get("limit") || "10";
    const page = Math.max(Number(pageParam), 1);
    const limit = Math.min(Math.max(Number(limitParam), 1), 100);
    const skip = (page - 1) * limit;
    let filter = {};

    if (search) {
      const searchRegex = { $regex: search, $options: "i" };
      const [matchingBrands, matchingCategories] = await Promise.all([
        Brand.find({ name: searchRegex }).select("_id").lean(),
        Category.find({ name: searchRegex }).select("_id").lean(),
      ]);
      const numericSearch = Number(search);
      const searchConditions: Array<Record<string, unknown>> = [
        { name: searchRegex },
        { shortDescription: searchRegex },
        { description: searchRegex },
        { status: searchRegex },
        ...matchingBrands.map(({ _id }) => ({ brand: _id })),
        ...matchingCategories.map(({ _id }) => ({ category: _id })),
      ];

      if (Number.isFinite(numericSearch)) {
        searchConditions.push({ price: numericSearch });
      }

      filter = { $or: searchConditions };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Product.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(total / limit);
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Get products error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch products",
      },
      {
        status: 500,
      },
    );
  }
}
