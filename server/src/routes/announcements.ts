import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// GET all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
});

// POST announcement (admin only)
router.post("/", async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const announcement = await prisma.announcement.create({
      data: { title, content, imageUrl },
    });
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: "Failed to create announcement" });
  }
});

// DELETE announcement
router.delete("/:id", async (req, res) => {
  try {
    await prisma.announcement.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete announcement" });
  }
});

export default router;