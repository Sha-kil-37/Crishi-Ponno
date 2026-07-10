"use client";
//
import { createContext, useContext, useState, ReactNode } from "react";
//
type DialogContextType = {
  open: boolean;
  openDialog: () => void;
  closeDialog: () => void;
};

const DialogContext = createContext<DialogContextType | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  //
  return (
    <DialogContext.Provider
      value={{
        open,
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
