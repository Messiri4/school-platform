import express from "express";
import prisma from "../lib/prisma";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

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

    // 1. Create user in Clerk
    const clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" ") || "",
      skipPasswordRequirement: true,
    });

    // 2. Create user in your database
    const user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        name,
        email,
        role: "STUDENT",
      },
    });

    // 3. Create student profile
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
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error?.message || "Failed to create student" });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
      include: { user: true },
    });

    if (student?.user?.clerkId) {
      await clerk.users.deleteUser(student.user.clerkId);
    }

    await prisma.student.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
});

export default router;