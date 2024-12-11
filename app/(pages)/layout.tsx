import { IOProvider } from "@/context/io";
import { PRProvider } from "@/context/pr";
import { ProcessProvider } from "@/context/process";
import React, { PropsWithChildren } from "react";

const PagesLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-dvh max-w-5xl mx-auto">
      <ProcessProvider>
        <IOProvider>
          <PRProvider>{children}</PRProvider>
        </IOProvider>
      </ProcessProvider>
    </main>
  );
};

export default PagesLayout;
