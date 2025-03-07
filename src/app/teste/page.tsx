"use client"
import { login } from "@/services/authService";
import React from "react";

const Teste = () => {
  const handleLogin = async () => {
    await login({ email: "trabson@example.com", password: "trabson123" });
  };
  return <button onClick={handleLogin}>Teste</button>;
};

export default Teste;
