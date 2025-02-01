"use client";

import { Bar, Line } from "react-chartjs-2";
import styled from "styled-components";
import "chart.js/auto";
import { Transaction } from "@/types/types";

type ChartsProps = {
  transactions: Transaction[];
};

export default function Charts({ transactions }: ChartsProps) {
  if (!transactions.length) {
    return <ChartsContainer><p>Nenhuma transação encontrada.</p></ChartsContainer>;
  }

  // ✅ Agrupar receitas e despesas por mês
  const monthlyData = transactions.reduce((acc: Record<string, { deposit: number; withdraw: number }>, transaction: Transaction) => {
    const date = new Date(transaction.date);
    const month = `${date.getFullYear()}-${date.getMonth() + 1}`;

    if (!acc[month]) {
      acc[month] = { deposit: 0, withdraw: 0 };
    }

    const amount = parseFloat(transaction.amount) / 100;
    if (transaction.transaction_type === "deposit") {
      acc[month].deposit += amount;
    } else {
      acc[month].withdraw += amount;
    }

    return acc;
  }, {});

  const months = Object.keys(monthlyData);
  const deposits = months.map((month) => monthlyData[month].deposit);
  const withdrawals = months.map((month) => monthlyData[month].withdraw);

  // ✅ Configuração dos gráficos
  const barChartData = {
    labels: months,
    datasets: [
      { label: "Receitas", backgroundColor: "green", data: deposits },
      { label: "Despesas", backgroundColor: "red", data: withdrawals },
    ],
  };

  const lineChartData = {
    labels: months,
    datasets: [
      { label: "Saldo", borderColor: "blue", data: deposits.map((deposit, i) => deposit - withdrawals[i]) },
    ],
  };

  return (
    <ChartsContainer>
      <h2>Receitas e Despesas</h2>
      <Bar data={barChartData} />

      <h2>Saldo ao Longo do Tempo</h2>
      <Line data={lineChartData} />
    </ChartsContainer>
  );
}

// 🎨 **Estilos**
const ChartsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  h2 {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;
