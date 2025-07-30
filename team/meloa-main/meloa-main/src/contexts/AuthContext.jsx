import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: null,
  });

  // 앱 시작 시 localStorage에서 auth 정보를 불러옴
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  // 로그인
  const login = (role) => {
    const newAuth = {
      isLoggedIn: true,
      role,
    };
    setAuth(newAuth);
    localStorage.setItem("auth", JSON.stringify(newAuth));
  };

  // 로그아웃
  const logout = () => {
    setAuth({ isLoggedIn: false, role: null });
    localStorage.removeItem("auth");
  };

  // 유저 로그인 여부
  const isUserLoggedIn = () => auth.isLoggedIn && auth.role === "user";

  // 관리자 로그인 여부
  const isAdminLoggedIn = () => auth.isLoggedIn && auth.role === "admin";

  return (
    <AuthContext.Provider value={{ auth, login, logout, isUserLoggedIn, isAdminLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

// 커스텀 훅
export function useAuth() {
  return useContext(AuthContext);
}
