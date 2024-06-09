"use client";
import { initPredefinedDiscount } from "@/logic/promotion/InitPredefinedDiscount";
import React, { ReactNode, useEffect } from "react";

interface InitProps {
  children: ReactNode;
}

export default function Init({ children }: InitProps) {
  useEffect(() => {
    initPredefinedDiscount();
  }, []);
  return <>{children}</>;
}
