import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "crypto";
import pg from "pg";

const { Pool } = pg;

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

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    return res.status(500).json({
      error: "DATABASE_URL is missing",
    });
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    // GET all announcements
    if (req.method === "GET") {
      const result = await pool.query(`
        SELECT *
        FROM "Announcement"
        ORDER BY "createdAt" DESC
      `);

      return res.status(200).json(result.rows);
    }

    // CREATE announcement
    if (req.method === "POST") {
      const { title, content, imageUrl } = req.body;

      if (!title || !content) {
        return res.status(400).json({
          error: "Title and content are required",
        });
      }

      const announcementId = randomUUID();

      const result = await pool.query(
        `
        INSERT INTO "Announcement"
          (
            "id",
            "title",
            "content",
            "imageUrl",
            "createdAt"
          )
        VALUES
          ($1, $2, $3, $4, NOW())
        RETURNING *
        `,
        [
          announcementId,
          title,
          content,
          imageUrl || null,
        ]
      );

      return res.status(201).json(result.rows[0]);
    }

    // DELETE announcement
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id || typeof id !== "string") {
        return res.status(400).json({
          error: "Announcement id is required",
        });
      }

      const result = await pool.query(
        `
        DELETE FROM "Announcement"
        WHERE "id" = $1
        RETURNING *
        `,
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Announcement not found",
        });
      }

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
      error:
        error instanceof Error
          ? error.message
          : "Server error",
    });
  } finally {
    await pool.end();
  }
}