// @ts-ignore
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is missing. Add it to the environment used by Vercel."
  );
}
// @ts-ignore
const adapter = new PrismaPg({
  connectionString: databaseUrl,
});

// @ts-ignore
const prisma = new PrismaClient({
  adapter,
});

export default prisma;