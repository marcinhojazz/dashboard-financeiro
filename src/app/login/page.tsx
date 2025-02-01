"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("user", JSON.stringify({ username }));
      router.push("/dashboard");
    } else {
      alert("Credenciais inválidas!");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <Container>
      <h1>Login</h1>
      <Input type="text" placeholder="Usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Entrar</Button>
    </Container>
  );
}

// Estilos
const Container = styled.div`
  max-width: 300px;
  margin: auto;
  padding: 50px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
`;
