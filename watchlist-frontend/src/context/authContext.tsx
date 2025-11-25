import React, { createContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  email: string | null;
  role: string | null;
  login: (token: string, email: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  email: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (token: string, email: string, role: string) => {
    setToken(token);
    setEmail(email);
    setRole(role);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, email, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
