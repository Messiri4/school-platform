import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// Called after Clerk signup — syncs user to our database
router.post("/sync", async (req, res) => {
  try {
    const { clerkId, name, email, role } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "clerkId and email are required" });
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (existing) {
      return res.json(existing);
    }

    // Create user in database
    const user = await prisma.user.create({
      data: {
        clerkId,
        name: name || "Unknown",
        email,
        role: role || "STUDENT",
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to sync user" });
  }
});

// GET user by clerkId
router.get("/:clerkId", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: req.params.clerkId },
      include: {
        student: true,
        parent: true,
        staff: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;