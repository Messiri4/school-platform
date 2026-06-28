import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// GET all staff
router.get("/", async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
});

// POST create staff
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, phone } = req.body;

    const user = await prisma.user.create({
      data: {
        clerkId: `manual_${Date.now()}`,
        name,
        email,
        role: "STAFF",
      },
    });

    const staff = await prisma.staff.create({
      data: {
        userId: user.id,
        subject,
        phone,
      },
      include: { user: true },
    });

    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to create staff" });
  }
});

// DELETE staff
router.delete("/:id", async (req, res) => {
  try {
    await prisma.staff.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete staff" });
  }
});

export default router;