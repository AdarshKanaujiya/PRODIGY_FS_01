const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ✅ REGISTER USER (Fixed)
// 🔹 Register User with Password Hashing & Role Assignment
router.post("/register", async (req, res) => {
  try {
      console.log("✅ Raw Request Body:", req.body);

      const { username, email, password, role } = req.body;

      if (!username || !email || !password) {
          console.log("❌ Missing fields in request!");
          return res.status(400).json({ message: "All fields are required" });
      }

      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists!" });

      console.log("🔵 Received Plain Password:", password);

      // ✅ DO NOT HASH PASSWORD HERE! Mongoose will handle it in User.js
      user = new User({
          username,
          email,
          password,  // 🔴 Use plain password, let Mongoose handle hashing
          role: role || "user"
      });

      await user.save();
      console.log("✅ User registered successfully:", user);

      res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
      console.error("❌ Server Error:", err);
      res.status(500).json({ message: "Server Error" });
  }
});



// ✅ LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "Invalid Credentials" });

      // 🚀 Debug: Log password comparison
      console.log("🔵 Received Password for Login:", password);
      console.log("🔵 Stored Hashed Password in DB:", user.password);

      // **Compare the plain password with the stored hashed password**
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("🔵 Password Match Status:", isMatch);

      if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

      // Generate JWT token
      const token = jwt.sign(
          { id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
      );

      res.json({
          token,
          user: {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role
          }
      });
  } catch (err) {
      res.status(500).json({ message: "Server Error" });
  }
});






module.exports = router;
