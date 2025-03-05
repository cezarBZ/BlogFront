import axiosClient from "./axiosClient";
import { setCookie } from "nookies";

type loginCredentials = {
  email: string;
  password: string;
};

export const login = async (credentials: loginCredentials) => {
  try {
    const response = await axiosClient.put("/user/login", credentials);
    const { token } = response.data;

    setCookie(null, "token", token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    window.location.href = "/";
  } catch (error) {
    console.error("Erro no login:", error);
  }
};

export const logout = () => {
  localStorage.removeItem("token");

  window.location.href = "/";
};
