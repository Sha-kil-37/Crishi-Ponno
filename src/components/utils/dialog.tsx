"use client";
//
import { useEffect, useState } from "react";
import { useDialog } from "@/hooks/useDialog";
//
export default function Dialog() {
  const { open, closeDialog, content } = useDialog();
  const [isVisible, setIsVisible] = useState(false);
  //
  useEffect(() => {
    if (open) {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const timeout = window.setTimeout(() => setIsVisible(false), 200);
    return () => window.clearTimeout(timeout);
  }, [open]);
  //
  if (!open && !isVisible) return null;
  //
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100 ease-out" : "opacity-0 ease-in"
      }`}
    >
      {/* Overlay */}
      <div
        onClick={closeDialog}
        className={`absolute inset-0 backdrop-blur-xs transition-opacity duration-50 ${
          isVisible ? "opacity-100 ease-out" : "opacity-0 ease-in"
        }`}
      />

      {/* Dialog */}
      <div
        className={`border border-[#dcebdc] shadow-[0_10px_30px_rgba(15,61,46,0.08)] relative z-10 max-w-lg rounded p-8 transition-all duration-300 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100 ease-out"
            : "translate-y-4 scale-95 opacity-0 ease-in"
        }`}
      >
        <button
          onClick={closeDialog}
          className="cursor-pointer absolute right-4 top-4 text-2xl"
        >
          ✕
        </button>

        {content ? (
          <div>{content}</div>
        ) : (
          <div>
            <p className="">
              This is your global dialog. You can show login, register, search,
              cart preview, newsletter, or promotional content here.
            </p>

            <button
              onClick={closeDialog}
              className="cursor-pointer mt-8 rounded-lg  px-5 py-3"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
