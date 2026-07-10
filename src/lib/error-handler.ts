import { NextResponse } from "next/server";
//
export function handleApiError(error: unknown) {
  console.error(error);
  //
  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
}
