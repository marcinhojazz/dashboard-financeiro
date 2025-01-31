import StyledComponentsRegistry from "../utils/StyledComponentsRegistry";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import * as Toast from "@radix-ui/react-toast";
import "./globals.css"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Financeiro",
  description: "Gerencie suas transações de forma eficiente.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <Theme accentColor="blue" grayColor="sand" radius="medium" scaling="100%">
            <Toast.Provider>
              {children}
            </Toast.Provider>
          </Theme>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
