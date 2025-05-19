import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [masterKey, setMasterKey] = useState(null);

  const login = (jwt) => setToken(jwt);
  const setKey = (key) => setMasterKey(key);
  const logout = () => {
    setToken(null);
    setMasterKey(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, masterKey, setKey }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
