import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// GET all fees
router.get("/", async (req, res) => {
  try {
    const fees = await prisma.fee.findMany({
      include: { student: { include: { user: true } } },
      orderBy: { createdAt: "desc" },
    });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch fees" });
  }
});

// POST create fee record
router.post("/", async (req, res) => {
  try {
    const { studentId, amount, term, year } = req.body;
    const fee = await prisma.fee.create({
      data: { studentId, amount, term, year },
      include: { student: { include: { user: true } } },
    });
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: "Failed to create fee" });
  }
});

// PATCH update fee status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const fee = await prisma.fee.update({
      where: { id: req.params.id },
      data: {
        status,
        paidAt: status === "paid" ? new Date() : null,
      },
    });
    res.json(fee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update fee" });
  }
});

export default router;