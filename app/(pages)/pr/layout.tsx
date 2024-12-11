"use client";

import Loading from "@/components/ui/loading";
import { usePR } from "@/context/pr";
import React, { PropsWithChildren } from "react";

const PRLayout = ({ children }: PropsWithChildren) => {
  const { loading } = usePR();
  return loading ? (
    <Loading />
  ) : (
    <div className="relative w-full h-full p-3 md:p-5">{children}</div>
  );
};

export default PRLayout;
