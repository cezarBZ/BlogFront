import axiosClient from "./axiosClient";
import { setCookie, destroyCookie } from "nookies";

type signinCredentials = {
  email: string;
  password: string;
};

type signupCredentials = {
  username: string;
  email: string;
  role?: number;
  password: string;
};

export const signin = async (credentials: signinCredentials) => {
  try {
    const response = await axiosClient.put("/Auth/signin", credentials);
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

export const signup = async (credentials: signupCredentials) => {
  try {
    const response = await axiosClient.post("/Auth/signup", credentials);
    const { data } = response.data;

    setCookie(null, "token", data.token, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    window.location.href = "/";
  } catch (error) {
    console.error("Erro no signup:", error);
  }
};

export const logout = () => {
  destroyCookie(null, "token");

  window.location.href = "/";
};
