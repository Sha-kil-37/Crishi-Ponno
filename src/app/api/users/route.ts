// import db from "@/lib/db";
// import User from "@/models/User";
// GET /api/users
export async function GET() {
  // await db();

  // const users = await User.find();

  // return Response.json(users);
  return Response.json("Hello from the users API route!");
}
