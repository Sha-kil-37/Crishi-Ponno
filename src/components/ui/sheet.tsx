"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | null>(null);

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}

export function SheetTrigger({
  children,
  asChild,
}: {
  children: React.ReactNode;
  asChild?: boolean;
}) {
  if (!asChild) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

export function SheetContent({
  className,
  side = "bottom",
  children,
}: {
  side?: "left" | "right" | "bottom";
  className?: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(SheetContext);
  if (!context || !context.open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/35"
      onClick={() => context.onOpenChange(false)}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "absolute inset-x-0 bottom-0 mx-auto w-full max-w-xl overflow-hidden bg-white shadow-2xl",
          side === "bottom" && "rounded-t-2xl",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
}

export function SheetTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <h2 className={cn(className)}>{children}</h2>;
}
