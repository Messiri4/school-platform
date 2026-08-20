import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(users)
  }

  res.status(405).json({ error: 'Method not allowed' })
}