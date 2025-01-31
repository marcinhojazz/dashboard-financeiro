"use client";

import { useState, useEffect } from "react";
import { Table, Text, Button, Flex } from "@radix-ui/themes";
import styled from "styled-components";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";

interface Transaction {
  date: number;
  amount: string;
  transaction_type: "deposit" | "withdraw";
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [hydrated, setHydrated] = useState(false); // 👈 Adiciona um estado para renderizar apenas no cliente

  useEffect(() => {
    setHydrated(true); // 🚀 Garante que o componente é renderizado APENAS no cliente

    async function fetchTransactions() {
      try {
        const response = await fetch("/data/transactions.json");
        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.statusText}`);
        }
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

  if (!hydrated) {
    return null; // Evita erro de hidratação
  }

  if (loading) {
    return <LoadingText>Carregando transações...</LoadingText>;
  }

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTransactions = transactions.slice(startIndex, endIndex);

  return (
    <>
      <StyledTableContainer>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Data</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Conta</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Setor</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Estado</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Tipo</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Valor</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {paginatedTransactions.map((transaction, index) => (
              <Table.Row key={index}>
                <Table.Cell>{formatDate(transaction.date)}</Table.Cell>
                <Table.Cell>{transaction.account}</Table.Cell>
                <Table.Cell>{transaction.industry}</Table.Cell>
                <Table.Cell>{transaction.state}</Table.Cell>
                <Table.Cell>
                  <Text color={transaction.transaction_type === "deposit" ? "green" : "red"}>
                    {transaction.transaction_type === "deposit" ? "Depósito" : "Retirada"}
                  </Text>
                </Table.Cell>
                <Table.Cell>
                  {formatCurrency(parseFloat(transaction.amount), transaction.currency)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </StyledTableContainer>

      {/* Paginação */}
      <PaginationContainer>
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Anterior
        </Button>
        <PageIndicator>Página {currentPage} de {totalPages}</PageIndicator>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Próximo
        </Button>
      </PaginationContainer>
    </>
  );
}

const StyledTableContainer = styled.div`
  width: 100%;
  margin-top: 20px;
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
