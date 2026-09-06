import type { VercelRequest, VercelResponse } from "@vercel/node";
import prisma from "./_db";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { id } = req.query;

    if (req.method === "GET") {
      const announcements = await prisma.announcement.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(announcements);
    }

    if (req.method === "POST") {
      const { title, content, imageUrl } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          error: "Title and content are required",
        });
      }

      const announcement = await prisma.announcement.create({
        data: {
          title,
          content,
          imageUrl: imageUrl || null,
        },
      });

      return res.status(201).json(announcement);
    }

    if (req.method === "DELETE" && id) {
      await prisma.announcement.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json({
        message: "Deleted",
      });
    }

    return res.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Announcements API error:", error);

    return res.status(500).json({
      error: "Failed to process announcements request",
    });
  }
}