import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// @ts-ignore
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
// @ts-ignore
const prisma = new PrismaClient({ adapter })

export default prisma