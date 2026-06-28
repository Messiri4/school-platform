import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// GET all admissions
router.get("/", async (req, res) => {
  try {
    const admissions = await prisma.admission.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(admissions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch admissions" });
  }
});

// POST new admission
router.post("/", async (req, res) => {
  try {
    const { parentName, studentName, email, phone, applyingFor, message } = req.body;
    const admission = await prisma.admission.create({
      data: { parentName, studentName, email, phone, applyingFor, message },
    });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ error: "Failed to create admission" });
  }
});

// PATCH update admission status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const admission = await prisma.admission.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(admission);
  } catch (error) {
    res.status(500).json({ error: "Failed to update admission" });
  }
});

export default router;