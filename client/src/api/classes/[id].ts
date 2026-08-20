import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'DELETE') {
    await prisma.class.delete({ where: { id: req.query.id as string } })
    return res.json({ message: 'Deleted' })
  }

  res.status(405).json({ error: 'Method not allowed' })
}