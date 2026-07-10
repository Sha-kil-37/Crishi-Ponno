"use client";

import { useDialog } from "@/hooks/useDialog";

export default function Dialog() {
  const { open, closeDialog } = useDialog();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        onClick={closeDialog}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Dialog */}
      <div className="relative z-10 w-[90%] max-w-lg rounded-xl bg-white p-8 shadow-2xl">

        <button
          onClick={closeDialog}
          className="absolute right-4 top-4 text-2xl"
        >
          ✕
        </button>

        <h2 className="mb-4 text-3xl font-bold">
          Welcome 👋
        </h2>

        <p className="text-gray-600">
          This is your global dialog. You can show login,
          register, search, cart preview, newsletter,
          or promotional content here.
        </p>

        <button
          onClick={closeDialog}
          className="mt-8 rounded-lg bg-black px-5 py-3 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}