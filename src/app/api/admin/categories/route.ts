import { NextResponse } from "next/server";
import mongoose from "mongoose";
import db from "@/lib/db";
import Category from "@/models/admin/category/Category";
import { categorySchema } from "@/schemas/category.schema";
import { createSlug } from "@/lib/admin/createSlug";
//
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    const parsed = categorySchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      parent: formData.get("parent") || undefined,
      status: formData.get("status"),
      image: image instanceof File ? image : null,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    await db();
    const imageData = parsed.data.image
      ? `data:${parsed.data.image.type};base64,${Buffer.from(
          await parsed.data.image.arrayBuffer(),
        ).toString("base64")}`
      : null;
    console.log(imageData);
    // const category = await Category.create({
    //   ...parsed.data,
    //   slug: createSlug({ value: formData.get("name") as string }),
    //   image: imageData,
    // });

    return NextResponse.json(
      {
        msg: "Category created successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (
      error instanceof mongoose.mongo.MongoServerError &&
      error.code === 11000
    ) {
      return NextResponse.json(
        { error: "A category with this name already exists." },
        { status: 409 },
      );
    }

    console.error("Category creation failed:", error);
    return NextResponse.json(
      { error: "Unable to create category." },
      { status: 500 },
    );
  }
}
