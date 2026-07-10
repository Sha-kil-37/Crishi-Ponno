import UserModel from "@/models/User";
import db from "@/lib/db";
import { handleApiError } from "@/lib/error-handler";
import { User } from "@/types/user";
// 
const user: User[] = [];
//
// GET /api/users
export async function GET() {
  try {
    console.log(user);
    await db();
    const data = await UserModel.find();
    return Response.json(data, { status: 200 });
  } catch (error) {
    return handleApiError(error);
  }
}
