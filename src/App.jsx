// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginWrapper from "./components/LoginWrapper";
import RegisterWrapper from "./components/RegisterWrapper";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./contexts/AuthContext";

export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/register" element={<RegisterWrapper />} />

      {/* Protected dashboard route */}
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Redirect root to /dashboard */}
      <Route
        path="/"
        element={<Navigate to={token ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
