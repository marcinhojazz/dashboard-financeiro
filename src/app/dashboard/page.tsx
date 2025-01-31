"use client";

import SummaryCards from "@/components/SummaryCards";
import TransactionsTable from "@/components/TransactionsTable";
import RadixToast from "@/components/RadixToast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Garante que está rodando no cliente

    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/"); // Redireciona para login se não estiver autenticado
    }
  }, [router]);

  if (!isClient) {
    return null; // Evita erro de hidratação
  }

  return (
    <div>
      <h1>Dashboard Financeiro</h1>
      <SummaryCards />
      <RadixToast />
      <TransactionsTable />
    </div>
  );
}
