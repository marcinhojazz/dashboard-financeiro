"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Table, Select, Button, Text, Card, Flex } from "@radix-ui/themes";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title as ChartTitle, Tooltip, Legend, ArcElement } from "chart.js";

// 📢 REGISTRANDO ESCALAS NECESSÁRIAS PARA EVITAR O ERRO
Chart.register(CategoryScale, LinearScale, BarElement, ChartTitle, Tooltip, Legend, ArcElement);

interface Transacao {
  date: number;
  amount: string;
  transaction_type: string;
  currency: string;
  account: string;
  industry: string;
  state: string;
}

export default function Relatorios() {
  const [dados, setDados] = useState<Transacao[]>([]);
  const [filtroConta, setFiltroConta] = useState("");
  const [filtroSetor, setFiltroSetor] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  useEffect(() => {
    fetch("/data/transactions.json")
      .then((res) => res.json())
      .then((data: Transacao[]) => {
        setDados(data);
      })
      .catch((err) => console.error("Erro ao carregar transações:", err));
  }, []);

  // 🔹 Filtragem de dados
  const transacoesFiltradas = dados.filter((t) => 
    (filtroConta ? t.account === filtroConta : true) &&
    (filtroSetor ? t.industry === filtroSetor : true) &&
    (filtroTipo ? t.transaction_type === filtroTipo : true)
  );

  // 🔹 Gráficos - Receitas x Despesas
  const totalDepositos = transacoesFiltradas
    .filter((t) => t.transaction_type === "deposit")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const totalRetiradas = transacoesFiltradas
    .filter((t) => t.transaction_type === "withdraw")
    .reduce((acc, t) => acc + parseFloat(t.amount), 0);

  const graficoReceitasDespesas = {
    labels: ["Receitas", "Despesas"],
    datasets: [
      {
        label: "R$",
        data: [totalDepositos, totalRetiradas],
        backgroundColor: ["#16A34A", "#E63946"],
      },
    ],
  };

  // 🔹 Gráfico - Distribuição por Setor
  const setores = [...new Set(transacoesFiltradas.map((t) => t.industry))];
  const valoresPorSetor = setores.map((setor) =>
    transacoesFiltradas
      .filter((t) => t.industry === setor)
      .reduce((acc, t) => acc + parseFloat(t.amount), 0)
  );

  const graficoSetores = {
    labels: setores,
    datasets: [
      {
        label: "Valor (R$)",
        data: valoresPorSetor,
        backgroundColor: ["#7C3AED", "#FACC15", "#06B6D4", "#DC2626", "#3B82F6"],
      },
    ],
  };

  return (
    <Container>
      <Title>📜 Relatórios Financeiros</Title>

      {/* 🔹 Filtros */}
      <FiltrosContainer>
        <Select.Root onValueChange={setFiltroConta} value={filtroConta}>
          <Select.Trigger placeholder="Filtrar por Conta" />
          <Select.Content>
            {[...new Set(dados.map((t) => t.account))].map((conta) => (
              <Select.Item key={conta} value={conta}>{conta}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Select.Root onValueChange={setFiltroSetor} value={filtroSetor}>
          <Select.Trigger placeholder="Filtrar por Setor" />
          <Select.Content>
            {[...new Set(dados.map((t) => t.industry))].map((setor) => (
              <Select.Item key={setor} value={setor}>{setor}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>

        <Select.Root onValueChange={setFiltroTipo} value={filtroTipo}>
          <Select.Trigger placeholder="Filtrar por Tipo" />
          <Select.Content>
            <Select.Item value="deposit">Depósito</Select.Item>
            <Select.Item value="withdrawal">Retirada</Select.Item>
          </Select.Content>
        </Select.Root>

        <Button onClick={() => { setFiltroConta(""); setFiltroSetor(""); setFiltroTipo(""); }}>
          🔄 Resetar Filtros
        </Button>
      </FiltrosContainer>

      {/* 🔹 Gráficos */}
      <GraficosContainer>
        <Card size="5">
          <Text size="4">📊 Receitas vs Despesas</Text>
          <Bar data={graficoReceitasDespesas} />
        </Card>
        
        <Card size="5">
          <Text size="4">🏢 Distribuição por Setor</Text>
          <Pie data={graficoSetores} />
        </Card>
      </GraficosContainer>

      {/* 🔹 Tabela de Transações */}
      <SectionTitle>📄 Transações</SectionTitle>
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
            {transacoesFiltradas.slice(0, 10).map((t, index) => (
              <Table.Row key={index}>
                <Table.Cell>{new Date(t.date).toLocaleDateString("pt-BR")}</Table.Cell>
                <Table.Cell>{t.account}</Table.Cell>
                <Table.Cell>{t.industry}</Table.Cell>
                <Table.Cell>{t.state}</Table.Cell>
                <Table.Cell>
                  <TipoTransacao cor={t.transaction_type === "deposit" ? "#16A34A" : "#E63946"}>
                    {t.transaction_type === "deposit" ? "Depósito" : "Retirada"}
                  </TipoTransacao>
                </Table.Cell>
                <Table.Cell>R$ {parseFloat(t.amount).toLocaleString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </TableContainer>
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

const FiltrosContainer = styled(Flex)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const GraficosContainer = styled(Flex)`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #E5E7EB;
  margin-top: 20px;
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const TipoTransacao = styled.span<{ cor: string }>`
  color: ${({ cor }) => cor};
  font-weight: bold;
`;

