import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// POST — save pending user when they land on /pending page
router.post("/", async (req, res) => {
  try {
    const { clerkId, name, email } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "clerkId and email required" });
    }

    // Check if already a real user
    const existingUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (existingUser) {
      return res.json({ alreadyApproved: true });
    }

    // Upsert pending user
    const pending = await prisma.pendingUser.upsert({
      where: { clerkId },
      update: { name, email },
      create: { clerkId, name, email },
    });

    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: "Failed to save pending user" });
  }
});

// GET — all pending users
router.get("/", async (req, res) => {
  try {
    const pending = await prisma.pendingUser.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(pending);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch pending users" });
  }
});

// DELETE — remove after approving
router.delete("/:id", async (req, res) => {
  try {
    await prisma.pendingUser.delete({ where: { id: req.params.id } });
    res.json({ message: "Removed from pending" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove pending user" });
  }
});

export default router;