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

    // req.session.user = {
    //   id: user.id,
    //   email: user.email,
    //   adminId: user.adminId,
    //   name: user.name,
    //   role: "secondary",
    // };

    res.json({
      message: "Secondary user logged in",
      user: user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
