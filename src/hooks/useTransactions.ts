"use client";
import { useEffect, useState } from "react";

interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export default function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/data/transactions.json");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  return { transactions, loading };
}
