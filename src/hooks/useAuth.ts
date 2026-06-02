import { useState } from "react";

const AUTH_KEY = "quotation_generator_auth";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === "true";
  });

  function login(username: string, password: string) {
    if (username === "Developer" && password === "12345") {
      localStorage.setItem(AUTH_KEY, "true");
      setIsLoggedIn(true);
      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    setIsLoggedIn(false);
  }

  return {
    isLoggedIn,
    login,
    logout,
  };
}