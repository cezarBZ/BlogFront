import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      destroyCookie(null, "token");
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
