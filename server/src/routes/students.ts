import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// POST create student
router.post("/", async (req, res) => {
  try {
    const { name, email, admissionNo, class: className, section } = req.body;

    // Create Clerk user first then sync
    const user = await prisma.user.create({
      data: {
        clerkId: `manual_${Date.now()}`,
        name,
        email,
        role: "STUDENT",
      },
    });

    const student = await prisma.student.create({
      data: {
        userId: user.id,
        admissionNo,
        class: className,
        section,
      },
      include: { user: true },
    });

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to create student" });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const student = await prisma.student.delete({
      where: { id: req.params.id },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

export default router;