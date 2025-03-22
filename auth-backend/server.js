const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ Allow requests from frontend (React running on 3000)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Protected Route
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the protected route!", user: req.user });
});

// Role-Based Protected Route (Only Admins)
app.get("/api/admin", authMiddleware, (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access Denied! Admins only." });
    }
    res.json({ message: "Welcome, Admin!", user: req.user });
});

// mongos.connect('mongodb://127.0.0.1:27017/authDB', { useNewUrlParser: true, useUnifiedTopology: true });


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
