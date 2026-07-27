"use client";
//
import { createContext, useContext, useState, ReactNode } from "react";
//
type DialogOptions = {
  children?: ReactNode;
};

type DialogContextType = {
  open: boolean;
  content: ReactNode | null;
  openDialog: (options?: DialogOptions) => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  //
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<ReactNode | null>(null);
  //
  const openDialog = (options?: DialogOptions) => {
    setContent(options?.children ?? null);
    setOpen(true);
  };
  //
  const closeDialog = () => setOpen(false);
  //
  return (
    <DialogContext.Provider
      value={{
        open,
        content,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("useDialog must be used inside DialogProvider");
  }

  return context;
}
