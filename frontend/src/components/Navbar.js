import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // ✅ Keep Navbar updated when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // ✅ Trigger Navbar update instantly
    window.dispatchEvent(new Event("storage"));

    setToken(null);
    setUser(null);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>

        {/* ✅ Show Dashboard only if logged in */}
        {token && <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>}

        {/* ✅ Show Admin Page only for admins */}
        {token && user?.role === "admin" && (
          <Button color="inherit" component={Link} to="/admin">Admin</Button>
        )}

        {!token ? (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        ) : (
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
