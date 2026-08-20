import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'POST') {
    const { clerkId, name, email, role } = req.body
    if (!clerkId || !email) return res.status(400).json({ error: 'clerkId and email required' })

    const existing = await prisma.user.findUnique({ where: { clerkId } })
    if (existing) return res.json(existing)

    const user = await prisma.user.create({
      data: { clerkId, name: name || 'Unknown', email, role: role || 'STUDENT' },
    })
    return res.json(user)
  }

  res.status(405).json({ error: 'Method not allowed' })
}