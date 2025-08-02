const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// LOGIN route: stores admin ID in session
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
   console.log('hello');
   
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // ✅ Store admin ID in session
    // req.session.adminId = admin.id;

    return res.json({ message: "Login successful", adminId : admin.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET current logged-in admin
router.get("/me", (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  res.json({ adminId: req.session.adminId });
});

// LOGOUT route: destroys session
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Logout failed" });
    }

    res.clearCookie("connect.sid"); // default session cookie name
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
