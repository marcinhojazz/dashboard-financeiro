"use client";

import Sidebar from "@/components/Sidebar";
import { Theme } from "@radix-ui/themes";
import styled from "styled-components";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    console.log("✅ DashboardLayout renderizado, isSidebarOpen:", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <Theme>
      <Container>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <Content $isSidebarOpen={isSidebarOpen}>{children}</Content>
      </Container>
    </Theme>
  );
}

// 🔹 Estilos ajustados para dividir corretamente a tela
const Container = styled.div`
  display: flex; /* Divide corretamente o espaço */
  height: 100vh;
  width: 100vw;
`;

const Content = styled.main<{ $isSidebarOpen: boolean }>`
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "250px" : "80px")};
  overflow-y: auto;
`;
