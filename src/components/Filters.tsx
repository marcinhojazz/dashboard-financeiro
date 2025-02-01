"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Transaction } from "@/types/types";

type FiltersProps = {
  filters: {
    startDate: string;
    endDate: string;
    account: string;
    industry: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    startDate: string;
    endDate: string;
    account: string;
    industry: string;
  }>>;
};

export default function Filters({ filters, setFilters }: FiltersProps) {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  useEffect(() => {
    // ✅ Buscar dados do JSON e extrair contas e indústrias únicas
    fetch("/data/transactions.json")
      .then((res) => res.json())
      .then((data: Transaction[]) => {
        const uniqueAccounts = Array.from(new Set(data.map((t) => t.account))).sort();
        const uniqueIndustries = Array.from(new Set(data.map((t) => t.industry))).sort();
        setAccounts(uniqueAccounts);
        setIndustries(uniqueIndustries);
      })
      .catch((err) => console.error("Erro ao carregar os filtros:", err));
  }, []);

  return (
    <FiltersContainer>
      {/* 📅 Filtro por Faixa de Data */}
      <FilterGroup>
        <label>Data Início:</label>
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
        />
      </FilterGroup>

      <FilterGroup>
        <label>Data Fim:</label>
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
      </FilterGroup>

      {/* 🏦 Filtro por Conta */}
      <FilterGroup>
        <label>Conta:</label>
        <select value={filters.account} onChange={(e) => setFilters({ ...filters, account: e.target.value })}>
          <option value="">Todas as Contas</option>
          {accounts.map((account) => (
            <option key={account} value={account}>
              {account}
            </option>
          ))}
        </select>
      </FilterGroup>

      {/* 🏭 Filtro por Indústria */}
      <FilterGroup>
        <label>Indústria:</label>
        <select value={filters.industry} onChange={(e) => setFilters({ ...filters, industry: e.target.value })}>
          <option value="">Todas as Indústrias</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </FilterGroup>
    </FiltersContainer>
  );
}

// 🎨 **Estilos**
const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  select, input {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 180px;
  }
`;
