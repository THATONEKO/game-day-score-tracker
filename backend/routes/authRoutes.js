const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Admin registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingAdmin = await prisma.admin.findUnique({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Admin registered", adminId: newAdmin.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration error" });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, adminId: admin.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
});

module.exports = router;
