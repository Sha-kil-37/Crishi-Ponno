import { NextResponse } from "next/server";
import mongoose from "mongoose";
import db from "@/lib/db";
import { brandSchema } from "@/schemas/brand.schema";
import { createSlug } from "@/lib/admin/createSlug";
import cloudinary from "@/lib/cloudinary";
import Brand from "@/models/brand/Brand";
//
export async function POST(request: Request) {
  //
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    // Parse and validate the form data
    const parsed = brandSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
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
    const slug = createSlug({ value: parsed.data.name });
    //  Connect to MongoDB

    await db();

    // Check duplicate brand

    const existingBrand = await Brand.findOne({
      $or: [{ name: parsed.data.name }, { slug: slug }],
    }).lean();

    if (existingBrand) {
      return NextResponse.json(
        {
          error: "A brand with this name already exists.",
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
          folder: "crishi-ponno/brands",
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
    const brand = await Brand.create({
      name: parsed.data.name,
      description: parsed.data.description,
      slug: slug,
      status: parsed.data.status,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
    //
    return NextResponse.json(
      {
        msg: "Brand created successfully.",
        brand: brand,
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
        { error: "A brand with this name already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Unable to create brand." },
      { status: 500 },
    );
  }
}
