import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { registerUser } from "../api"; // Import API function

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { username, email, password, role };

    console.log("🔵 Sending registration request:", userData); // Debugging

    const response = await registerUser(userData);
    
    if (response.message === "User registered successfully!") {
      alert("✅ Registration Successful");
    } else {
      alert(`❌ Registration Failed: ${response.message}`);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField fullWidth label="Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <TextField fullWidth label="Role" margin="normal" value={role} onChange={(e) => setRole(e.target.value)} required />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Container>
  );
}

export default Register;
