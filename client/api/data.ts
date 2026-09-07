import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClerkClient } from "@clerk/backend";
import { randomUUID } from "crypto";
import pg from "pg";

const { Pool } = pg;

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,DELETE,PATCH,OPTIONS"
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

  const { resource, id } = req.query;
  const r = resource as string;

  try {
    // ============================================
    // STUDENTS
    // ============================================
    if (r === "students") {
      if (req.method === "GET") {
        const result = await pool.query(`
          SELECT
            s.*,
            row_to_json(u) AS "user"
          FROM "Student" s
          JOIN "User" u
            ON u."id" = s."userId"
          ORDER BY s."createdAt" DESC
        `);

        return res.status(200).json(result.rows);
      }

      if (req.method === "POST") {
        const {
          name,
          email,
          admissionNo,
          class: className,
          section,
        } = req.body;

        if (!name || !email || !admissionNo) {
          return res.status(400).json({
            error: "Name, email and admission number are required",
          });
        }

        let clerkUser;

        try {
          clerkUser = await clerk.users.createUser({
            emailAddress: [email],
            firstName: name.split(" ")[0],
            lastName: name.split(" ").slice(1).join(" ") || "",
            skipPasswordRequirement: true,
          });

          const userId = randomUUID();
          const studentId = randomUUID();

          const client = await pool.connect();

          try {
            await client.query("BEGIN");

            await client.query(
              `
              INSERT INTO "User"
                (
                  "id",
                  "clerkId",
                  "name",
                  "email",
                  "role",
                  "createdAt",
                  "updatedAt"
                )
              VALUES
                ($1, $2, $3, $4, 'STUDENT', NOW(), NOW())
              `,
              [userId, clerkUser.id, name, email]
            );

            await client.query(
              `
              INSERT INTO "Student"
                (
                  "id",
                  "userId",
                  "admissionNo",
                  "class",
                  "section",
                  "createdAt"
                )
              VALUES
                ($1, $2, $3, $4, $5, NOW())
              `,
              [
                studentId,
                userId,
                admissionNo,
                className,
                section,
              ]
            );

            const result = await client.query(
              `
              SELECT
                s.*,
                row_to_json(u) AS "user"
              FROM "Student" s
              JOIN "User" u
                ON u."id" = s."userId"
              WHERE s."id" = $1
              `,
              [studentId]
            );

            await client.query("COMMIT");

            return res.status(201).json(result.rows[0]);
          } catch (error) {
            await client.query("ROLLBACK");

            // Remove the Clerk account if database creation fails.
            if (clerkUser?.id) {
              try {
                await clerk.users.deleteUser(clerkUser.id);
              } catch {
                console.error("Failed to clean up Clerk user");
              }
            }

            throw error;
          } finally {
            client.release();
          }
        } catch (error) {
          throw error;
        }
      }

      if (req.method === "DELETE" && id) {
        const studentResult = await pool.query(
          `
          SELECT
            s."id",
            s."userId",
            u."clerkId"
          FROM "Student" s
          JOIN "User" u
            ON u."id" = s."userId"
          WHERE s."id" = $1
          `,
          [id]
        );

        if (studentResult.rows.length === 0) {
          return res.status(404).json({
            error: "Student not found",
          });
        }

        const student = studentResult.rows[0];

        if (student.clerkId) {
          await clerk.users.deleteUser(student.clerkId);
        }

        const client = await pool.connect();

        try {
          await client.query("BEGIN");

          await client.query(
            `
            DELETE FROM "Student"
            WHERE "id" = $1
            `,
            [id]
          );

          await client.query(
            `
            DELETE FROM "User"
            WHERE "id" = $1
            `,
            [student.userId]
          );

          await client.query("COMMIT");
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }

        return res.status(200).json({
          message: "Deleted",
        });
      }
    }

    // ============================================
    // STAFF
    // ============================================
    if (r === "staff") {
      if (req.method === "GET") {
        const result = await pool.query(`
          SELECT
            s.*,
            row_to_json(u) AS "user"
          FROM "Staff" s
          JOIN "User" u
            ON u."id" = s."userId"
          ORDER BY s."createdAt" DESC
        `);

        return res.status(200).json(result.rows);
      }

      if (req.method === "POST") {
        const { name, email, subject, phone } = req.body;

        if (!name || !email) {
          return res.status(400).json({
            error: "Name and email are required",
          });
        }

        let clerkUser;

        try {
          clerkUser = await clerk.users.createUser({
            emailAddress: [email],
            firstName: name.split(" ")[0],
            lastName: name.split(" ").slice(1).join(" ") || "",
            skipPasswordRequirement: true,
          });

          const userId = randomUUID();
          const staffId = randomUUID();

          const client = await pool.connect();

          try {
            await client.query("BEGIN");

            await client.query(
              `
              INSERT INTO "User"
                (
                  "id",
                  "clerkId",
                  "name",
                  "email",
                  "role",
                  "createdAt",
                  "updatedAt"
                )
              VALUES
                ($1, $2, $3, $4, 'STAFF', NOW(), NOW())
              `,
              [userId, clerkUser.id, name, email]
            );

            await client.query(
              `
              INSERT INTO "Staff"
                (
                  "id",
                  "userId",
                  "subject",
                  "phone",
                  "createdAt"
                )
              VALUES
                ($1, $2, $3, $4, NOW())
              `,
              [staffId, userId, subject, phone]
            );

            const result = await client.query(
              `
              SELECT
                s.*,
                row_to_json(u) AS "user"
              FROM "Staff" s
              JOIN "User" u
                ON u."id" = s."userId"
              WHERE s."id" = $1
              `,
              [staffId]
            );

            await client.query("COMMIT");

            return res.status(201).json(result.rows[0]);
          } catch (error) {
            await client.query("ROLLBACK");

            if (clerkUser?.id) {
              try {
                await clerk.users.deleteUser(clerkUser.id);
              } catch {
                console.error("Failed to clean up Clerk user");
              }
            }

            throw error;
          } finally {
            client.release();
          }
        } catch (error) {
          throw error;
        }
      }

      if (req.method === "DELETE" && id) {
        const staffResult = await pool.query(
          `
          SELECT
            s."id",
            s."userId",
            u."clerkId"
          FROM "Staff" s
          JOIN "User" u
            ON u."id" = s."userId"
          WHERE s."id" = $1
          `,
          [id]
        );

        if (staffResult.rows.length === 0) {
          return res.status(404).json({
            error: "Staff member not found",
          });
        }

        const staff = staffResult.rows[0];

        if (staff.clerkId) {
          await clerk.users.deleteUser(staff.clerkId);
        }

        const client = await pool.connect();

        try {
          await client.query("BEGIN");

          await client.query(
            `
            DELETE FROM "Staff"
            WHERE "id" = $1
            `,
            [id]
          );

          await client.query(
            `
            DELETE FROM "User"
            WHERE "id" = $1
            `,
            [staff.userId]
          );

          await client.query("COMMIT");
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }

        return res.status(200).json({
          message: "Deleted",
        });
      }
    }

    // ============================================
    // CLASSES
    // ============================================
    if (r === "classes") {
      if (req.method === "GET") {
        const result = await pool.query(`
          SELECT
            c.*,
            CASE
              WHEN s."id" IS NULL THEN NULL
              ELSE
                to_jsonb(s) ||
                jsonb_build_object(
                  'user',
                  to_jsonb(u)
                )
            END AS "staff"
          FROM "Class" c
          LEFT JOIN "Staff" s
            ON s."id" = c."staffId"
          LEFT JOIN "User" u
            ON u."id" = s."userId"
          ORDER BY c."createdAt" DESC
        `);

        return res.status(200).json(result.rows);
      }

      if (req.method === "POST") {
        const { name, section, staffId } = req.body;

        const classId = randomUUID();

        await pool.query(
          `
          INSERT INTO "Class"
            (
              "id",
              "name",
              "section",
              "staffId",
              "createdAt"
            )
          VALUES
            ($1, $2, $3, $4, NOW())
          `,
          [classId, name, section, staffId || null]
        );

        const result = await pool.query(
          `
          SELECT
            c.*,
            CASE
              WHEN s."id" IS NULL THEN NULL
              ELSE
                to_jsonb(s) ||
                jsonb_build_object(
                  'user',
                  to_jsonb(u)
                )
            END AS "staff"
          FROM "Class" c
          LEFT JOIN "Staff" s
            ON s."id" = c."staffId"
          LEFT JOIN "User" u
            ON u."id" = s."userId"
          WHERE c."id" = $1
          `,
          [classId]
        );

        return res.status(201).json(result.rows[0]);
      }

      if (req.method === "DELETE" && id) {
        const result = await pool.query(
          `
          DELETE FROM "Class"
          WHERE "id" = $1
          RETURNING "id"
          `,
          [id]
        );

        if (result.rowCount === 0) {
          return res.status(404).json({
            error: "Class not found",
          });
        }

        return res.status(200).json({
          message: "Deleted",
        });
      }
    }

    // ============================================
    // FEES
    // ============================================
    if (r === "fees") {
      if (req.method === "GET") {
        const result = await pool.query(`
          SELECT
            f.*,
            to_jsonb(s) ||
            jsonb_build_object(
              'user',
              to_jsonb(u)
            ) AS "student"
          FROM "Fee" f
          JOIN "Student" s
            ON s."id" = f."studentId"
          JOIN "User" u
            ON u."id" = s."userId"
          ORDER BY f."createdAt" DESC
        `);

        return res.status(200).json(result.rows);
      }

      if (req.method === "POST") {
        const { studentId, amount, term, year } = req.body;

        const feeId = randomUUID();
        const parsedAmount = parseFloat(amount);

        if (Number.isNaN(parsedAmount)) {
          return res.status(400).json({
            error: "Invalid fee amount",
          });
        }

        await pool.query(
          `
          INSERT INTO "Fee"
            (
              "id",
              "studentId",
              "amount",
              "term",
              "year",
              "createdAt"
            )
          VALUES
            ($1, $2, $3, $4, $5, NOW())
          `,
          [feeId, studentId, parsedAmount, term, year]
        );

        const result = await pool.query(
          `
          SELECT
            f.*,
            to_jsonb(s) ||
            jsonb_build_object(
              'user',
              to_jsonb(u)
            ) AS "student"
          FROM "Fee" f
          JOIN "Student" s
            ON s."id" = f."studentId"
          JOIN "User" u
            ON u."id" = s."userId"
          WHERE f."id" = $1
          `,
          [feeId]
        );

        return res.status(201).json(result.rows[0]);
      }

      if (req.method === "PATCH" && id) {
        const { status } = req.body;

        const result = await pool.query(
          `
          UPDATE "Fee"
          SET
            "status" = $1,
            "paidAt" = CASE
              WHEN $1 = 'paid' THEN NOW()
              ELSE NULL
            END
          WHERE "id" = $2
          RETURNING *
          `,
          [status, id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({
            error: "Fee not found",
          });
        }

        return res.status(200).json(result.rows[0]);
      }

      if (resource === "fees" && req.method === "DELETE") {
        const { id } = req.query;

        if (!id || typeof id !== "string") {
          return res.status(400).json({ error: "Fee id is required" });
        }

        const result = await pool.query(
          `DELETE FROM "Fee"
          WHERE "id" = $1
          RETURNING *`,
          [id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({ error: "Fee not found" });
        }

        return res.status(200).json(result.rows[0]);
      }
    }

    // ============================================
    // ADMISSIONS
    // ============================================
    if (r === "admissions") {
      if (req.method === "GET") {
        const result = await pool.query(`
          SELECT *
          FROM "Admission"
          ORDER BY "createdAt" DESC
        `);

        return res.status(200).json(result.rows);
      }

      if (req.method === "POST") {
        const {
          parentName,
          studentName,
          email,
          phone,
          applyingFor,
          message,
        } = req.body;

        const admissionId = randomUUID();

        const result = await pool.query(
          `
          INSERT INTO "Admission"
          (
            "id",
            "parentName",
            "studentName",
            "email",
            "phone",
            "applyingFor",
            "message",
            "createdAt"
          )
          VALUES
            ($1, $2, $3, $4, $5, $6, $7, NOW())
          RETURNING *
          `,
          [
            admissionId,
            parentName,
            studentName,
            email,
            phone,
            applyingFor,
            message,
          ]
        );

        return res.status(201).json(result.rows[0]);
      }

      if (req.method === "PATCH" && id) {
        const { status } = req.body;

        const result = await pool.query(
          `
          UPDATE "Admission"
          SET "status" = $1
          WHERE "id" = $2
          RETURNING *
          `,
          [status, id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({
            error: "Admission not found",
          });
        }

        return res.status(200).json(result.rows[0]);
      }

      if (req.method === "DELETE" && id) {
        const result = await pool.query(
          `
          DELETE FROM "Admission"
          WHERE "id" = $1
          RETURNING *
          `,
          [id]
        );

        if (result.rows.length === 0) {
          return res.status(404).json({
            error: "Admission not found",
          });
        }

        return res.status(200).json({
          message: "Deleted",
        });
      }

      return res.status(405).json({
        error: "Method not allowed",
      });
    }

    // ============================================
    // PENDING USERS
    // ============================================
    if (r === "pending-users") {
      if (req.method === "GET") {
        const result = await pool.query(`
          SELECT *
          FROM "PendingUser"
          ORDER BY "createdAt" DESC
        `);

        return res.status(200).json(result.rows);
      }

      if (req.method === "POST") {
        const { clerkId, name, email } = req.body;

        const existing = await pool.query(
          `
          SELECT "id"
          FROM "User"
          WHERE "clerkId" = $1
          LIMIT 1
          `,
          [clerkId]
        );

        if (existing.rows.length > 0) {
          return res.status(200).json({
            alreadyApproved: true,
          });
        }

        const pendingId = randomUUID();

        const result = await pool.query(
          `
          INSERT INTO "PendingUser"
            (
              "id",
              "clerkId",
              "name",
              "email",
              "createdAt"
            )
          VALUES
            ($1, $2, $3, $4, NOW())

          ON CONFLICT ("clerkId")
          DO UPDATE SET
            "name" = EXCLUDED."name",
            "email" = EXCLUDED."email"

          RETURNING *
          `,
          [pendingId, clerkId, name, email]
        );

        return res.status(200).json(result.rows[0]);
      }

      if (req.method === "DELETE" && id) {
        const result = await pool.query(
          `
          DELETE FROM "PendingUser"
          WHERE "id" = $1
          RETURNING "id"
          `,
          [id]
        );

        if (result.rowCount === 0) {
          return res.status(404).json({
            error: "Pending user not found",
          });
        }

        return res.status(200).json({
          message: "Removed",
        });
      }
    }

    return res.status(404).json({
      error: "Resource not found",
    });
  } catch (error) {
    console.error("Data API error:", error);

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