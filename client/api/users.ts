import type { VercelRequest, VercelResponse } from "@vercel/node";
import pg from "pg";
import { randomUUID } from "crypto";

const { Pool } = pg;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
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

    if (req.method === "GET") {
      const { clerkId } = req.query;

      if (clerkId && typeof clerkId === "string") {
        const result = await pool.query(
          `SELECT *
           FROM "User"
           WHERE "clerkId" = $1
           LIMIT 1`,
          [clerkId]
        );

        await pool.end();

        if (result.rows.length === 0) {
          return res.status(404).json({
            error: "User not found",
          });
        }

        return res.status(200).json(result.rows[0]);
      }

      const result = await pool.query(
        `SELECT *
         FROM "User"
         ORDER BY "createdAt" DESC`
      );

      await pool.end();

      return res.status(200).json(result.rows);
    }

    if (req.method === "POST") {
      const { action } = req.query;

      if (action !== "sync") {
        await pool.end();

        return res.status(400).json({
          error: "Invalid action",
        });
      }

      const { clerkId, name, email } = req.body;

      if (!clerkId || !email) {
        await pool.end();

        return res.status(400).json({
          error: "clerkId and email are required",
        });
      }

      const existing = await pool.query(
        `SELECT *
         FROM "User"
         WHERE "clerkId" = $1
         LIMIT 1`,
        [clerkId]
      );

      if (existing.rows.length > 0) {
        await pool.end();

        return res.status(200).json(existing.rows[0]);
      }

      const id = randomUUID();

      const result = await pool.query(
        `INSERT INTO "User"
          ("id", "clerkId", "name", "email", "role", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, 'STUDENT', NOW(), NOW())
         RETURNING *`,
        [id, clerkId, name ?? "", email]
      );

      await pool.end();

      return res.status(201).json(result.rows[0]);
    }

    await pool.end();

    return res.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    console.error("Users API error:", error);

    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Unknown server error",
    });
  }
}