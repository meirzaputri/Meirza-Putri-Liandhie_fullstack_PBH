import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (data) => api.post("/register", data);
export const login = (data) => api.post("/login", data);
export const me = (token) =>
  api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const logout = (token) =>
  api.post("/logout", null, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default api;
