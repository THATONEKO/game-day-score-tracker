const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Store in .env

// LOGIN route for admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // ✅ Generate JWT token
    const token = jwt.sign(
      { adminId: admin.id, role: "admin" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN route for secondary user
router.post("/login-secondary", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { userId: user.id, adminId: user.adminId, role: "secondary" },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Secondary user logged in",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// GET current logged-in user/admin
router.get("/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json(decoded);
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
});

// LOGOUT (JWT just expires on client)
router.post("/logout", (req, res) => {
  // For JWT, logout is handled client-side by deleting the token
  res.json({ message: "Logged out successfully (delete token on client)" });
});

module.exports = router;
