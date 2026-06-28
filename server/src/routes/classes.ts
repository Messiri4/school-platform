import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// GET all classes
router.get("/", async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: { staff: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// POST create class
router.post("/", async (req, res) => {
  try {
    const { name, section, staffId } = req.body;
    const cls = await prisma.class.create({
      data: { name, section, staffId },
      include: { staff: { include: { user: true } } },
    });
    res.json(cls);
  } catch (error) {
    res.status(500).json({ error: "Failed to create class" });
  }
});

// DELETE class
router.delete("/:id", async (req, res) => {
  try {
    await prisma.class.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete class" });
  }
});

export default router;