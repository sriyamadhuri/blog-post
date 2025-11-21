import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load stored login
  useEffect(() => {
    const saved = localStorage.getItem("blogUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Save login
  useEffect(() => {
    if (user) localStorage.setItem("blogUser", JSON.stringify(user));
    else localStorage.removeItem("blogUser");
  }, [user]);

  const login = (username, password) => {
    if (!username.trim() || !password.trim()) {
      throw new Error("Both fields are required");
    }
    setUser({ username });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
