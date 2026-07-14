"use client";
const googleIcon = "/icons/google.svg";
//
import { signIn } from "next-auth/react";
import Image from "next/image";
//
export default function GoogleButton() {
  //
  return (
    <button
      className="w-full cursor-pointer rounded-xl border border-[#dcebdc] bg-white px-4 py-2 flex justify-center items-center gap-2 shadow-sm transition hover:-translate-y-0.5"
      onClick={() => signIn("google", { callbackUrl: "/?auth=success" })}
    >
      <Image
        className="h-6"
        src={googleIcon}
        alt="Google Icon"
        width={50}
        height={0}
      />
      <span className="font-medium text-lg">Google</span>
    </button>
  );
}
