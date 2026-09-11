// import { NextResponse } from "next/server";
// import mongoose from "mongoose";
// import db from "@/lib/db";
// import { createSlug } from "@/lib/admin/createSlug";
// import Product from "@/models/product/Product";
// import { productSchema } from "@/schemas/product.schema";
//
export async function POST(request: Request) {
  //
  try {
    const formData = await request.formData();
    console.log(formData);
  } catch (error) {
    console.log(error);
  }
}
