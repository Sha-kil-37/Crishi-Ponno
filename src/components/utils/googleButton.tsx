"use client";
const googleIcon = "/icons/google.svg";
//
import { signIn } from "next-auth/react";
import Image from "next/image";
//
export default function GoogleButton() {
  return (
    <button
      className="w-full cursor-pointer rounded border border-gray-300 flex justify-center items-center py-1"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Image className="h-6" src={googleIcon} alt="Google Icon" width={50} height={0} />
      <span className="font-medium text-lg">Google</span>
    </button>
  );
}
