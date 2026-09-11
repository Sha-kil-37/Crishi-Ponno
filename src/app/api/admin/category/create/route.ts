import { NextResponse } from "next/server";
import mongoose from "mongoose";
import db from "@/lib/db";
import Category from "@/models/category/Category";
import { categorySchema } from "@/schemas/category.schema";
import { createSlug } from "@/lib/admin/createSlug";
import cloudinary from "@/lib/cloudinary";
//
export async function POST(request: Request) {
  //
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    // Parse and validate the form data
    const parsed = categorySchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      parent: formData.get("parent"),
      status: formData.get("status"),
      image: image instanceof File ? image : null,
    });
    //
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }
    // slug
    const slug = createSlug({ value: parsed.data.name });
    //  Connect to MongoDB
    await db();
    // Check duplicate category
    const existingCategory = await Category.findOne({
      $or: [{ name: parsed.data.name }, { slug: slug }],
    }).lean();

    if (existingCategory) {
      return NextResponse.json(
        {
          error: "A category with this name already exists.",
        },
        { status: 409 },
      );
    }
    // Convert File → Buffer
    const bytes = await parsed.data.image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "crishi-ponno/categories",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      uploadStream.end(buffer);
    });

    const result = uploadResult as {
      secure_url: string;
      public_id: string;
    };

    // call db to ensure connection is established before proceeding
    await db();
    // Save Cloudinary information in MongoDB
    const category = await Category.create({
      name: parsed.data.name,
      parent: parsed.data.parent,
      slug: slug,
      description: parsed.data.description,
      status: parsed.data.status,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
    //
    return NextResponse.json(
      {
        msg: "Category created successfully.",
        category: category,
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

    return NextResponse.json(
      { error: "Unable to create category." },
      { status: 500 },
    );
  }
}
