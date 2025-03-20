import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
  }, [token]);

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
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) {
        // toast.error(data.error || "Login failed. Please try again.");
        return { success: false, message: data.error };
      }

      if (data.token) {
        setToken(data.token);
        toast.success("Login successful!");
        return { success: true };
      }

      toast.error(data.error || "Invalid credentials.");
      return { success: false, message: data.error };
    } catch (error) {
      toast.error("Network error. Please try again.");
      return { success: false, message: error.message || "Network error" };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    toast.info("You have been logged out.");
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
