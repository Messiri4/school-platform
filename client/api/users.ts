import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const { clerkId, action } = req.query

  // GET /api/users?clerkId=xxx
  if (req.method === 'GET' && clerkId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkId as string },
      include: { student: true, parent: true, staff: true },
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.json(user)
  }

  // GET /api/users
  if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return res.json(users)
  }

  // POST /api/users?action=sync
  if (req.method === 'POST' && action === 'sync') {
    const { clerkId, name, email, role } = req.body

    if (!clerkId || !email) {
      return res.status(400).json({
        error: 'clerkId and email required',
      })
    }

    const existing = await prisma.user.findUnique({
      where: { clerkId },
    })

    if (existing) {
      return res.json(existing)
    }

    const user = await prisma.user.create({
      data: {
        clerkId,
        name: name || 'Unknown',
        email,
        role: role || 'STUDENT',
      },
    })

    return res.json(user)
  }

  return res.status(405).json({
    error: 'Method not allowed',
  })
}