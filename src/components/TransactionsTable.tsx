"use client";

import { useState } from "react";
import { Button, Flex } from "@radix-ui/themes";
import styled from "styled-components";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { Transaction } from "@/types/types";

type TransactionsTableProps = {
  transactions: Transaction[];
};

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (!transactions.length) {
    return <LoadingText>Nenhuma transação encontrada.</LoadingText>;
  }

  return (
    <StyledTableContainer>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Conta</th>
            <th>Indústria</th>
            <th>Valor</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {paginatedTransactions.map((transaction) => (
            <tr key={transaction.date}>
              <td>{formatDate(transaction.date)}</td>
              <td>{transaction.account}</td>
              <td>{transaction.industry}</td>
              <td>{formatCurrency(parseFloat(transaction.amount) / 100)}</td>
              <td>{transaction.transaction_type === "deposit" ? "Receita" : "Despesa"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <PaginationContainer>
          <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            ← Anterior
          </Button>
          <PageIndicator>Página {currentPage} de {totalPages}</PageIndicator>
          <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Próxima →
          </Button>
        </PaginationContainer>
      )}
    </StyledTableContainer>
  );
}

// 🎨 **Estilos**
const StyledTableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  th, td {
    padding: 12px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background: #f4f4f4;
    font-weight: bold;
  }
`;

const PaginationContainer = styled(Flex)`
  margin-top: 20px;
  justify-content: center;
  gap: 10px;
`;

const PageIndicator = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;
