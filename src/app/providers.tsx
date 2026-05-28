"use client";

import { MantineProvider } from "@mantine/core";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MantineProvider>
      {children}
      <Toaster richColors closeButton />
    </MantineProvider>
  );
}
