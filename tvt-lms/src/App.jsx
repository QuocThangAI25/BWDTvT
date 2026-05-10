import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={user ? <Dashboard /> : <Login />} />
      <Route path="/register" element={user ? <Dashboard /> : <Register />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
