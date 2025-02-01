"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TransactionsTable from "@/components/TransactionsTable";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import { Transaction } from "@/types/types";

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    account: "",
    industry: "",
  });

  useEffect(() => {
    fetch("/data/transactions.json")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Erro ao carregar os dados:", err));
  }, []);

  // ✅ Aplicar os filtros e busca ANTES de passar os dados à tabela
  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date).toISOString().split("T")[0];
  
    return (
      (!filters.startDate || transactionDate >= filters.startDate) &&
      (!filters.endDate || transactionDate <= filters.endDate) &&
      (!filters.account || transaction.account === filters.account) &&
      (!filters.industry || transaction.industry === filters.industry)
    );
  });

  return (
    <div>
      <h1>Transações</h1>

      {/* ✅ Componentes de Filtros */}
      <SearchBar onSearch={setSearchQuery} />
      <Filters filters={filters} setFilters={setFilters} />

      {/* ✅ Agora passamos apenas as transações filtradas */}
      <TransactionsTable transactions={filteredTransactions} />

      {/* ✅ Botão para voltar ao Dashboard */}
      <button
        onClick={() => router.push("/dashboard")}
        style={{ marginTop: "20px", padding: "10px", cursor: "pointer" }}
      >
        ← Voltar para o Dashboard
      </button>
    </div>
  );
}
