import mongoose from "mongoose";
//
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

export default async function db() {
  try {
    await mongoose.connect(
      "mongodb+srv://shakil:z0ug93teaJ3u3Cgv@cluster0.gyknvhi.mongodb.net/crishiponno?appName=Cluster0",
      {
        autoIndex: true,
      },
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
