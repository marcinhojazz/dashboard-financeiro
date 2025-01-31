import React from "react";
import styled from "styled-components";

// Tipo para os ícones
type IconProps = {
  size?: string | number;
  color?: string;
};

// Estilizando o SVG com Styled Components
const StyledSVG = styled.svg<IconProps>`
  width: ${({ size }) => (typeof size === "number" ? `${size}px` : size || "1em")};
  height: ${({ size }) => (typeof size === "number" ? `${size}px` : size || "1em")};
  fill: ${({ color }) => color || "currentColor"};
`;

// Função auxiliar para criar ícones
const createIcon = (path: React.ReactNode) => {
  const IconComponent = (props: IconProps) => <StyledSVG {...props}>{path}</StyledSVG>;

  // Definir um nome para facilitar debug
  IconComponent.displayName = "IconComponent";
  
  return IconComponent;
};


// Definição dos ícones
export const Icons = {
  LogoutIcon: createIcon(
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 6.5C4.159 8.148 3 10.334 3 13a9 9 0 1 0 18 0c0-2.666-1.159-4.852-3-6.5M12 2v9m0-9c-.7 0-2.008 1.994-2.5 2.5M12 2c.7 0 2.008 1.994 2.5 2.5"/>
  ),
  HomeIcon: createIcon(
    <path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
  ),
  SettingsIcon: createIcon(
    <path fill="currentColor" d="M10 20h4l1-4h-6zM4 8h16l-2-6H6zM4 14h16v6H4z" />
  ),
  ReportIcon: createIcon(
    <>
      <path fill="currentColor" d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1z" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
      <path fill="currentColor" d="M11 7h2v7h-2z" />
    </>
  ),
};
