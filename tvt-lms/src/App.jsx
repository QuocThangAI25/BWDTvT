import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import CourseDetail from './pages/CourseDetail';
import ForgotPassword from './pages/ForgotPassword';
function AppContent() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={user ? <Dashboard /> : <Login />} />
      <Route path="/register" element={user ? <Dashboard /> : <Register />} />
      <Route path="/contests" element={<Contests />} />
      <Route path="/contest/:slug" element={<ContestDetail />} />
      <Route path="/course/:id/learn" element={<CourseDetail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
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
