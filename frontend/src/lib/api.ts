import axios from "axios";
import { getToken } from "./auth";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000/api";

const api = axios.create({ baseURL: API_BASE });

// set token on every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && config.headers)
    config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export const setAuthToken = (token?: string) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

export default api;
