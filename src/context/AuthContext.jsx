import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
   const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("mars_user")) || null; } catch { return null; }
  });
 
  const login = (email, senha) => {
    // Simulação — troque por Firebase Auth se quiser
    if (email && senha.length >= 4) {
      const u = { email, nome: email.split("@")[0] };
      localStorage.setItem("mars_user", JSON.stringify(u));
      setUser(u);
      return true;
    }
    return false;
  };
 
  const logout = () => {
    localStorage.removeItem("mars_user");
    setUser(null);
  };
 
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };