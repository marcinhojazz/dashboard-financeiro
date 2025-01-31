"use client";

import styled from "styled-components";
import { Card, Text, Button, Flex, Table } from "@radix-ui/themes";
import { useEffect, useState } from "react";

export default function VisaoGeral() {
  const [dados] = useState({
    receitas: 10000,
    despesas: 5500,
    pendentes: 2000,
    saldo: 4500,
    transacoes: [
      { data: "28/04/2023", conta: "Baker Hughes", setor: "Oil and Gas", estado: "TX", tipo: "Depósito", valor: 5565 },
      { data: "08/01/2023", conta: "General Mills", setor: "Food Consumer", estado: "MN", tipo: "Depósito", valor: 3716 },
      { data: "17/12/2022", conta: "Wynn Resorts", setor: "Hotels", estado: "NV", tipo: "Retirada", valor: 1480 },
      { data: "25/08/2022", conta: "Hyatt Hotels", setor: "Hotels", estado: "IL", tipo: "Depósito", valor: 6894 },
      { data: "17/12/2022", conta: "Fossil Group", setor: "Apparel", estado: "TX", tipo: "Depósito", valor: 4390 },
    ],
  });

  useEffect(() => {
    console.log("✅ Página Visão Geral carregada!");
  }, []);

  return (
    <Container>
      <Title>📊 Visão Geral</Title>

      {/* 🔹 Resumo Financeiro */}
      <ResumoContainer>
        <CardResumo cor="#16A34A">
          <Text size="4">📥 Receitas</Text>
          <Valor cor="#16A34A">R$ {dados.receitas.toLocaleString()}</Valor>
        </CardResumo>

        <CardResumo cor="#E63946">
          <Text size="4">📤 Despesas</Text>
          <Valor cor="#E63946">R$ {dados.despesas.toLocaleString()}</Valor>
        </CardResumo>

        <CardResumo cor="#FACC15">
          <Text size="4">⏳ Pendentes</Text>
          <Valor cor="#FACC15">R$ {dados.pendentes.toLocaleString()}</Valor>
        </CardResumo>

        <CardResumo cor="#7C3AED">
          <Text size="4">💰 Saldo Total</Text>
          <Valor cor="#7C3AED">R$ {dados.saldo.toLocaleString()}</Valor>
        </CardResumo>
      </ResumoContainer>

      {/* 🔹 Transações Recentes */}
      <SectionTitle>📜 Transações Recentes</SectionTitle>
      <TableContainer>
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
            {dados.transacoes.map((transacao, index) => (
              <Table.Row key={index}>
                <Table.Cell>{transacao.data}</Table.Cell>
                <Table.Cell>{transacao.conta}</Table.Cell>
                <Table.Cell>{transacao.setor}</Table.Cell>
                <Table.Cell>{transacao.estado}</Table.Cell>
                <Table.Cell>
                  <TipoTransacao cor={transacao.tipo === "Depósito" ? "#16A34A" : "#E63946"}>
                    {transacao.tipo}
                  </TipoTransacao>
                </Table.Cell>
                <Table.Cell>R$ {transacao.valor.toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </TableContainer>

      {/* 🔹 Ações */}
      <ButtonContainer>
        <Button variant="solid" color="green">➕ Nova Transação</Button>
        <Button variant="solid" color="blue">📈 Ver Relatórios</Button>
      </ButtonContainer>
    </Container>
  );
}

// 🔹 **Estilização**
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #E5E7EB;
`;

const ResumoContainer = styled(Flex)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const CardResumo = styled(Card)<{ cor: string }>`
  background: rgba(255, 255, 255, 0.1);
  border-left: 5px solid ${({ cor }) => cor};
  padding: 20px;
  width: 220px;
  text-align: center;
  color: #E5E7EB;
`;

const Valor = styled(Text)<{ cor: string }>`
  font-size: 20px;
  font-weight: bold;
  color: ${({ cor }) => cor};
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  margin-top: 20px;
  color: #E5E7EB;
`;

const TableContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const TipoTransacao = styled.span<{ cor: string }>`
  font-weight: bold;
  color: ${({ cor }) => cor};
`;

const ButtonContainer = styled(Flex)`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

