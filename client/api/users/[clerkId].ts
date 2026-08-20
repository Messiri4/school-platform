import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { clerkId: req.query.clerkId as string },
      include: { student: true, parent: true, staff: true },
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    return res.json(user)
  }

  res.status(405).json({ error: 'Method not allowed' })
}