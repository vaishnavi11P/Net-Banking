// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";
// import { login as apiLogin } from "@/services/auth";

// type AuthState = {
//   username?: string;
//   token?: string;
//   type?: string;
// };

// export type AuthContextType = {
//   user: AuthState | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   login: (u: string, p: string) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [user, setUser] = useState<AuthState | null>(null);

//   useEffect(() => {
//     const token = localStorage.getItem("jwt_token");
//     const type = localStorage.getItem("token_type");
//     const username = localStorage.getItem("username");
//     if (token && username) setUser({ token, type: type || "Bearer", username });
//   }, []);

//   const login: AuthContextType["login"] = async (username, password) => {
//     const res = await apiLogin({ username, password });
//     localStorage.setItem("jwt_token", res.token);
//     localStorage.setItem("token_type", res.type);
//     localStorage.setItem("username", res.username);
//     setUser({ token: res.token, type: res.type, username: res.username });
//   };

//   const logout: AuthContextType["logout"] = () => {
//     localStorage.removeItem("jwt_token");
//     localStorage.removeItem("token_type");
//     localStorage.removeItem("username");
//     setUser(null);
//   };

//   const token = user?.token ?? null;
//   const isAuthenticated = !!token;

//   const value: AuthContextType = useMemo(
//     () => ({ user, token, isAuthenticated, login, logout }),
//     [user, token, isAuthenticated]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = (): AuthContextType => {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// };

// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { login as apiLogin } from "@/services/auth";

type AuthState = {
  username?: string;
  token?: string;
  type?: string;
};

export type AuthContextType = {
  user: AuthState | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthState | null>(null);

  // 1) Rehydrate from localStorage on initial mount
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const type = localStorage.getItem("token_type");
    const username = localStorage.getItem("username");
    if (token && username) setUser({ token, type: type || "Bearer", username });
  }, []);

  // 2) Auto-logout on refresh/close (clear persisted creds)
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem("jwt_token");
      localStorage.removeItem("token_type");
      localStorage.removeItem("username");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const login: AuthContextType["login"] = async (username, password) => {
    const res = await apiLogin({ username, password });
    localStorage.setItem("jwt_token", res.token);
    localStorage.setItem("token_type", res.type);
    localStorage.setItem("username", res.username);
    setUser({ token: res.token, type: res.type, username: res.username });
  };

  const logout: AuthContextType["logout"] = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("username");
    setUser(null);
  };

  const token = user?.token ?? null;
  const isAuthenticated = !!token;

  const value: AuthContextType = useMemo(
    () => ({ user, token, isAuthenticated, login, logout }),
    [user, token, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
