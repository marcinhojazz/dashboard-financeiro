"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Icons } from "../utils/icons";

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const router = useRouter();
  console.log("Sidebar renderizado, isOpen:", isOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <SidebarContainer $isOpen={isOpen}>
      <ToggleButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "←" : "→"}
      </ToggleButton>

      <NavList>
        <NavItem onClick={() => router.push("/dashboard")} $isOpen={isOpen}>
          <Icons.HomeIcon size="24px" color="white" />
          <Text $isOpen={isOpen}>Visão Geral</Text>
        </NavItem>
        <NavItem onClick={() => router.push("/dashboard/relatorios")} $isOpen={isOpen}>
          <Icons.ReportIcon size="24px" color="white" />
          <Text $isOpen={isOpen}>Relatórios</Text>
        </NavItem>
        <NavItem onClick={() => router.push("/dashboard/configuracoes")} $isOpen={isOpen}>
          <Icons.SettingsIcon size="24px" color="white" />
          <Text $isOpen={isOpen}>Configurações</Text>
        </NavItem>
      </NavList>

      <LogoutWrapper $isOpen={isOpen}>
        <LogoutButton $isOpen={isOpen} onClick={handleLogout}>
          <Icons.LogoutIcon size="24px" color="white" />
          <Text $isOpen={isOpen}>Sair</Text>
        </LogoutButton>
      </LogoutWrapper>

    </SidebarContainer>
  );
}

// 🛠️ **Estilização**
const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "80px")};
  height: 100vh;
  background: #1e1e2f;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
  transition: width 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
`;

const ToggleButton = styled.button`
  background: #1e1e2f;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 3px solid white;
  right: -19px;
  position: absolute;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  flex-grow: 1;
  margin-top: 20px;
`;

const NavItem = styled.button<{ $isOpen: boolean }>`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  padding: 10px;
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: background 0.2s, justify-content 0.3s, padding 0.3s;
  gap: ${({ $isOpen }) => ($isOpen ? "12px" : "0")}; /* Remove o espaço lateral dos ícones quando fechado */
  
  justify-content: ${({ $isOpen }) => ($isOpen ? "flex-start" : "center")}; /* Alinha à esquerda quando aberto e centraliza quando fechado */
  padding-left: ${({ $isOpen }) => ($isOpen ? "16px" : "0")};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Text = styled.span<{ $isOpen: boolean }>`
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
  white-space: nowrap;
  width: ${({ $isOpen }) => ($isOpen ? "auto" : "0")}; /* Mantém o espaço reservado */
  overflow: hidden;
`;

const LogoutWrapper = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $isOpen }) => $isOpen ? "flex-start" : "center"};
  padding: 10px;
`;

const LogoutButton = styled.button<{ $isOpen: boolean }>`
  background: #e63946;
  width: ${({ $isOpen }) => ($isOpen ? "100%" : "50px")}; /* Reduz a largura quando fechado */
  height: 50px;
  color: white;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: ${({ $isOpen }) => ($isOpen ? "flex-start" : "center")}; /* Alinha quando aberto */
  padding: ${({ $isOpen }) => ($isOpen ? "10px 16px" : "0")};
  gap: ${({ $isOpen }) => ($isOpen ? "8px" : "0")}; /* Remove o espaçamento do ícone quando fechado */
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s ease, width 0.3s ease;

  &:hover {
    background: #c72e3b;
  }
`;
