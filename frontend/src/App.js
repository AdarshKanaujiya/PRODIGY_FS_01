import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar"; 
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminPage from "./components/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ Define Private Route
function PrivateRoute({ element }) {
  return localStorage.getItem("token") ? element : <Navigate to="/login" />;
}

// ✅ Define Admin Route
function AdminRoute({ element }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "admin" ? element : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>Welcome Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/admin" element={<AdminRoute element={<AdminPage />} />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Role-Based Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={"admin"}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
