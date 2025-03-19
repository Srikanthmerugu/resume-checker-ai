import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Save token in local storage
  useEffect(() => {
    token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
  }, [token]);

  // Sync token across tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "token") setToken(e.newValue || null);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch("https://demo.needrecruiter.com/need-recruiter/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const text = await response.text();
      let data;
      try { data = JSON.parse(text); } 
      catch { data = { message: text }; }

      if (!response.ok) {
        return { success: false, message: data.message || "Login failed" };
      }

      if (data.token) {
        setToken(data.token);
        return { success: true };
      }
      return { success: false, message: data.message || "Login failed" };
    } catch (error) {
      return { success: false, message: error.message || "Network error" };
    }
  }, []);

  const logout = useCallback(() => setToken(null), []);

  return (
    <AuthContext.Provider value={{ token, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);