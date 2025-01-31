"use client";

import { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { Button, TextField, Select, Switch, Card, Flex, Text } from "@radix-ui/themes";

export default function Configuracoes() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [tema, setTema] = useState("claro");
  const [notificacoes, setNotificacoes] = useState(true);

  // Carregar configurações do usuário
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    setNome(usuario.nome || "Usuário");
    setEmail(usuario.email || "email@exemplo.com");
    setTema(usuario.tema || "claro");
    setNotificacoes(usuario.notificacoes ?? true);
  }, []);

  // Salvar configurações no LocalStorage
  const salvarConfiguracoes = () => {
    const usuario = { nome, email, tema, notificacoes };
    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Configurações salvas com sucesso! ✅");
  };

  // 🔹 Função para tipar `onChange`
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  return (
    <Container>
      <Title>⚙ Configurações</Title>

      {/* 📄 Informações Pessoais */}
      <SectionTitle>📄 Informações Pessoais</SectionTitle>
      <Card>
        <Flex direction="column" gap="3">
          <TextField.Root placeholder="Nome" value={nome} onChange={handleInputChange(setNome)} />
          <TextField.Root placeholder="E-mail" value={email} onChange={handleInputChange(setEmail)} />
        </Flex>
      </Card>

      {/* 🔑 Segurança */}
      <SectionTitle>🔑 Segurança</SectionTitle>
      <Card>
        <Flex direction="column" gap="3">
          <TextField.Root type="password" placeholder="Senha Atual" value={senhaAtual} onChange={handleInputChange(setSenhaAtual)} />
          <TextField.Root type="password" placeholder="Nova Senha" value={novaSenha} onChange={handleInputChange(setNovaSenha)} />
        </Flex>
      </Card>

      {/* 🎨 Aparência */}
      <SectionTitle>🎨 Aparência</SectionTitle>
      <Card>
        <Select.Root value={tema} onValueChange={setTema}>
          <Select.Trigger />
          <Select.Content>
            <Select.Item value="claro">🌞 Claro</Select.Item>
            <Select.Item value="escuro">🌙 Escuro</Select.Item>
          </Select.Content>
        </Select.Root>
      </Card>

      {/* 🔔 Notificações */}
      <SectionTitle>🔔 Notificações</SectionTitle>
      <Card>
        <Flex justify="between" align="center">
          <Text>Ativar Notificações</Text>
          <Switch checked={notificacoes} onCheckedChange={setNotificacoes} />
        </Flex>
      </Card>

      <SalvarButton onClick={salvarConfiguracoes}>💾 Salvar Configurações</SalvarButton>
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

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #E5E7EB;
  margin-top: 20px;
`;

const SalvarButton = styled(Button)`
  width: 100%;
  background: #3B82F6;
  color: white;
  padding: 12px;
  margin-top: 20px;
  font-size: 16px;
`;
