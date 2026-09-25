import db from "@/lib/db";
import Brand from "@/models/brand/Brand";
import Category from "@/models/category/Category";
import Product from "@/models/product/Product";
import {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  PRODUCT_STATUS_OPTIONS,
  SORT_OPTIONS,
  escapeRegExp,
  parseListParam,
} from "@/lib/shop/productFilters";
import { NextRequest, NextResponse } from "next/server";
//
export async function GET(request: NextRequest) {
  try {
    await db();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search")?.trim() || "";
    const letter = searchParams.get("letter")?.trim() || "";
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const statusParam = searchParams.get("status");
    const categoryParam = searchParams.get("category");
    const brandParam = searchParams.get("brand");
    const sortParam = searchParams.get("sort") || "recommended";
    const pageParam = searchParams.get("page") || "1";
    const limitParam = searchParams.get("limit") || String(DEFAULT_LIMIT);

    const page = Number.isFinite(Number(pageParam))
      ? Math.max(Number(pageParam), 1)
      : 1;
    const limit = Number.isFinite(Number(limitParam))
      ? Math.min(Math.max(Number(limitParam), 1), MAX_LIMIT)
      : DEFAULT_LIMIT;

    const filter: Record<string, unknown> = {};
    const nameFilters: Array<Record<string, unknown>> = [];

    if (search) {
      const sanitizedSearch = escapeRegExp(search);
      nameFilters.push({
        name: {
          $regex: sanitizedSearch,
          $options: "i",
        },
      });
    }

    if (letter && /^[A-Z]$/i.test(letter)) {
      const normalizedLetter = letter.toUpperCase();
      nameFilters.push({
        name: {
          $regex: `^${escapeRegExp(normalizedLetter)}`,
          $options: "i",
        },
      });
    }

    if (nameFilters.length > 0) {
      if (nameFilters.length === 1) {
        Object.assign(filter, nameFilters[0]);
      } else {
        filter.$and = nameFilters;
      }
    }

    const minPrice = minPriceParam !== null ? Number(minPriceParam) : undefined;
    const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : undefined;

    if (
      typeof minPrice === "number" &&
      Number.isFinite(minPrice) &&
      minPrice >= 0
    ) {
      filter.price = {
        ...(filter.price as Record<string, number> | undefined),
        $gte: minPrice,
      };
    }

    if (
      typeof maxPrice === "number" &&
      Number.isFinite(maxPrice) &&
      maxPrice >= 0
    ) {
      filter.price = {
        ...(filter.price as Record<string, number> | undefined),
        $lte: maxPrice,
      };
    }

    if (
      filter.price &&
      minPrice !== undefined &&
      maxPrice !== undefined &&
      minPrice > maxPrice
    ) {
      filter.price = {
        $gte: maxPrice,
        $lte: minPrice,
      };
    }

    const validStatuses = parseListParam(statusParam).filter(
      (status): status is (typeof PRODUCT_STATUS_OPTIONS)[number] =>
        PRODUCT_STATUS_OPTIONS.includes(
          status as (typeof PRODUCT_STATUS_OPTIONS)[number],
        ),
    );

    if (validStatuses.length > 0) {
      filter.status = { $in: validStatuses };
    }

    const categorySlugs = parseListParam(categoryParam);
    if (categorySlugs.length > 0) {
      const categories = await Category.find(
        { slug: { $in: categorySlugs } },
        "_id",
      ).lean();
      const categoryIds = categories.map(({ _id }) => _id);
      if (categoryIds.length > 0) {
        filter.category = { $in: categoryIds };
      }
    }

    const brandSlugs = parseListParam(brandParam);
    if (brandSlugs.length > 0) {
      const brands = await Brand.find(
        { slug: { $in: brandSlugs } },
        "_id",
      ).lean();
      const brandIds = brands.map(({ _id }) => _id);
      if (brandIds.length > 0) {
        filter.brand = { $in: brandIds };
      }
    }

    const sortMap: Record<string, Record<string, 1 | -1>> = {
      recommended: { createdAt: -1 },
      newest: { createdAt: -1 },
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      "name-asc": { name: 1 },
      "name-desc": { name: -1 },
    };

    const normalizedSortKey = SORT_OPTIONS.some(
      (option) => option.value === sortParam,
    )
      ? sortParam
      : "recommended";

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("brand", "name slug")
        .populate("category", "name slug")
        .sort(sortMap[normalizedSortKey])
        .skip(skip)
        .limit(limit)
        .select({
          name: 1,
          slug: 1,
          sku: 1,
          price: 1,
          unit: 1,
          status: 1,
          brand: 1,
          category: 1,
          image: 1,
          createdAt: 1,
          updatedAt: 1,
        })
        .lean(),
      Product.countDocuments(filter),
    ]);

    const totalPages = Math.max(Math.ceil(total / limit), 1);

    return NextResponse.json({
      success: true,
      data: {
        products,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
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
