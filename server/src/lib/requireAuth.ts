import { Request, Response, NextFunction } from "express";
import { createClerkClient, verifyToken } from "@clerk/backend";
import prisma from "./prisma";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY!,
    });
    (req as any).userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

export async function requireRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clerkId = (req as any).userId;
      const user = await prisma.user.findUnique({ where: { clerkId } });
      if (!user || user.role !== role) {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  };
}