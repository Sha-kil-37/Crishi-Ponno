import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  const variants = {
    default: "bg-[#1f7a1f] text-white hover:bg-[#145d14]",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    ghost: "text-slate-700 hover:bg-slate-100",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-5 text-base",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f7a1f]/30 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
