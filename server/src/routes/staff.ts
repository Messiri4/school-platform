import express from "express";
import prisma from "../lib/prisma";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

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

    // 1. Create user in Clerk
    const clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" ") || "",
      skipPasswordRequirement: true, // sends invite email
    });

    // 2. Create user in your database with real Clerk ID
    const user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        name,
        email,
        role: "STAFF",
      },
    });

    // 3. Create staff profile
    const staff = await prisma.staff.create({
      data: {
        userId: user.id,
        subject,
        phone,
      },
      include: { user: true },
    });

    res.json(staff);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error?.message || "Failed to create staff" });
  }
});

// DELETE staff
router.delete("/:id", async (req, res) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: req.params.id },
      include: { user: true },
    });

    if (staff?.user?.clerkId) {
      // Delete from Clerk too
      await clerk.users.deleteUser(staff.user.clerkId);
    }

    await prisma.staff.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete staff" });
  }
});

export default router;