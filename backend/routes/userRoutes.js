// index.js
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const router = express.Router();
const prisma = new PrismaClient();

// Create Secondary User
router.post("/", async (req, res) => {
  const { name, surname, email, grade, adminId } = req.body;

  const defaultPassword = "password123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  try {
    // ✅ Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists." });
    }

    // ✅ Ensure adminId is valid before connecting
    const admin = await prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin) {
      return res.status(400).json({ error: "No valid admin found." });
    }

    // ✅ Create new secondary user
    const newUser = await prisma.user.create({
      data: {
        name,
        surname,
        email,
        grade,
        role: "secondary user",
        password: hashedPassword,
        admin: {
          connect: { id: adminId },
        },
      },
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;