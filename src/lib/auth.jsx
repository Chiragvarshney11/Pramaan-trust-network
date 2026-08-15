import { createContext, useContext, useEffect, useState } from "react";
import { api } from "./api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.me().then(({ user }) => setUser(user)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function login(credentials) {
    const data = await api.login(credentials);
    setUser(data.user);
    return data.user;
  }

  async function register(payload) {
    const data = await api.register(payload);
    setUser(data.user);
    return data.user;
  }

  async function logout() {
    await api.logout().catch(() => {});
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
