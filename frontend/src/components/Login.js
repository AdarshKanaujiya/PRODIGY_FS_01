import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { loginUser } from "../api"; // ✅ Import API function
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });

      if (response.token) {
        console.log("✅ Login Successful, Token:", response.token);

        // ✅ Store token & user in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        alert("Login Successful!");

        // ✅ Trigger Navbar update instantly
        window.dispatchEvent(new Event("storage"));

        // ✅ Redirect based on role
        navigate(response.user.role === "admin" ? "/admin" : "/dashboard");
      } else {
        alert(response.message || "Login Failed");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      alert("Login Failed!");
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth 
          label="Email" 
          margin="normal" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <TextField 
          fullWidth 
          label="Password" 
          type="password" 
          margin="normal" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </Container>
  );
}

export default Login;
