//
const mongoose = await import("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;
// 
export default async function dbConnect() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  try {
    console.log(MONGODB_URI);
    // await mongoose.connect(MONGODB_URI, {
    //   autoIndex: true,
    // });
  } catch (error) {
    throw error;
  }
}
