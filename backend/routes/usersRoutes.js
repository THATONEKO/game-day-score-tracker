const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// Add a secondary user
router.post("/add", async (req, res) => {
  const { adminId, name, idNumber } = req.body;

  try {
    const user = await prisma.secondaryUser.create({
      data: {
        name,
        idNumber,
        verified: false,
        admin: { connect: { id: adminId } },
      },
    });

    res.status(201).json({ message: "Secondary user added", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding secondary user" });
  }
});

// Verify a secondary user
router.post("/verify", async (req, res) => {
  const { idNumber } = req.body;

  try {
    const user = await prisma.secondaryUser.findUnique({ where: { idNumber } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await prisma.secondaryUser.update({
      where: { idNumber },
      data: { verified: true },
    });

    res.json({ message: "User verified", updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying user" });
  }
});

module.exports = router;
