"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Button, Card, Flex, Text } from "@radix-ui/themes";

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    // Simula um login e redireciona para o dashboard
    localStorage.setItem("user", "demoUser");
    router.push("/dashboard");
  };

  return (
    <Container>
      <Card size="3">
        <Flex direction="column" align="center" gap="3">
          <Title>Bem-vindo ao Dashboard Financeiro</Title>
          <Text size="4" align="center">
            Gerencie suas receitas, despesas e saldo de forma eficiente.
          </Text>
          <Button onClick={handleLogin}>Acessar o Dashboard</Button>
        </Flex>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;
