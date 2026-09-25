"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal, X } from "lucide-react";
import { type ReactNode, useState } from "react";

interface MobileFilterProps {
  triggerLabel?: string;
  children: ReactNode;
  onClear: () => void;
  onApply?: () => void;
}

export default function MobileFilter({
  triggerLabel = "Filters",
  children,
  onClear,
  onApply,
}: MobileFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="inline-flex items-center gap-2 rounded-xl border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
        >
          <SlidersHorizontal className="size-4" />
          {triggerLabel}
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="max-h-[92vh] overflow-y-auto rounded-t-2xl p-0"
      >
        <SheetHeader className="border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <SheetTitle className="text-left text-base font-semibold text-slate-900">
              Filters
            </SheetTitle>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600"
              aria-label="Close filters"
            >
              <X className="size-4" />
            </button>
          </div>
        </SheetHeader>

        <div className="space-y-5 p-4 pb-6">{children}</div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white p-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClear}
            className="flex-1 rounded-xl border-slate-200 text-slate-700"
          >
            Clear
          </Button>
          <Button
            type="button"
            onClick={() => {
              onApply?.();
              setOpen(false);
            }}
            className="flex-1 rounded-xl bg-[#1f7a1f] text-white hover:bg-[#145d14]"
          >
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
