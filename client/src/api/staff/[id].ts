import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClerkClient } from '@clerk/backend'
import prisma from '../_db'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'DELETE') {
    const staff = await prisma.staff.findUnique({
      where: { id: req.query.id as string },
      include: { user: true },
    })
    if (staff?.user?.clerkId) {
      await clerk.users.deleteUser(staff.user.clerkId)
    }
    await prisma.staff.delete({ where: { id: req.query.id as string } })
    return res.json({ message: 'Deleted' })
  }

  res.status(405).json({ error: 'Method not allowed' })
}