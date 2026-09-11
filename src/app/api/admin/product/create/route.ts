import { NextResponse } from "next/server";
import mongoose from "mongoose";
import db from "@/lib/db";
import Product from "@/models/product/Product";
import { productSchema } from "@/schemas/product.schema";
import { createSlug } from "@/lib/admin/createSlug";
import cloudinary from "@/lib/cloudinary";
import { createSku } from "@/lib/admin/createSku";
//
export async function POST(request: Request) {
  //
  try {
    const formData = await request.formData();
    const image = formData.get("image");
    // Parse and validate the form data
    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      description: formData.get("description"),
      shortDescription: formData.get("shortDescription"),
      price: Number(formData.get("price")),
      status: formData.get("status"),
      brand: formData.get("brand"),
      category: formData.get("category"),
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
    // sku
    const sku = createSku({
      name: parsed.data.name,
      category: parsed.data.category,
      brand: parsed.data.brand,
    });
    // price
    const price = Number(parsed.data.price);
    // category
    const category = new mongoose.Types.ObjectId(parsed.data.category);
    //
    const brand = new mongoose.Types.ObjectId(parsed.data.brand);
    //  Connect to MongoDB
    await db();
    // Check duplicate category

    const existingProduct = await Product.findOne({
      $or: [{ name: parsed.data.name }, { slug: slug }],
    }).lean();

    if (existingProduct) {
      return NextResponse.json(
        {
          error: "A product with this name already exists.",
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
          folder: "crishi-ponno/products",
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
    const product = await Product.create({
      name: parsed.data.name,
      slug: createSlug({ value: parsed.data.name }),
      description: parsed.data.description,
      shortDescription: parsed.data.shortDescription,
      price: price,
      brand: brand,
      category: category,
      status: parsed.data.status,
      sku: sku,
      image: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
    //
    return NextResponse.json(
      {
        msg: "Product created successfully.",
        product: product,
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
        { error: "A product with this name already exists." },
        { status: 409 },
      );
    }

    return NextResponse.json(
      { error: "Unable to create product." },
      { status: 500 },
    );
  }
}
