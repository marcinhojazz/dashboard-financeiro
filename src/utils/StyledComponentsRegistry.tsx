"use client";

import React, { useState, useEffect } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default function StyledComponentsRegistry({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Evita erros de hidratação

  return <StyleSheetManager>{children}</StyleSheetManager>;
}
