require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const prisma = new PrismaClient();

// app.use(cors());               // Allow requests from frontend
app.use(cors({
  origin: "http://localhost:3000", // Frontend origin
  credentials: true               // Allow credentials like cookies
}));
app.use(express.json());       // Parse JSON bodies

// Base route
app.get("/", (req, res) => {
  res.send("Game Day Score Tracker API is running");
});

// Example route
app.get("/admins", async (req, res) => {
  const admins = await prisma.admin.findMany();
  res.json(admins);
});

// Auth routes (admin login, register, etc.)
app.use("/api/auth", authRoutes);

// User routes (add/verify secondary users)
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});

const session = require("express-session");

app.use(
  session({
    secret: "your_secret_key", // put this in .env for security
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set to true in production with HTTPS
  })
);