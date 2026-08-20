import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const pending = await prisma.pendingUser.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(pending)
  }

  if (req.method === 'POST') {
    const { clerkId, name, email } = req.body
    const existing = await prisma.user.findUnique({ where: { clerkId } })
    if (existing) return res.json({ alreadyApproved: true })

    const pending = await prisma.pendingUser.upsert({
      where: { clerkId },
      update: { name, email },
      create: { clerkId, name, email },
    })
    return res.json(pending)
  }

  res.status(405).json({ error: 'Method not allowed' })
}