import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const classes = await prisma.class.findMany({
      include: { staff: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return res.json(classes)
  }

  if (req.method === 'POST') {
    const { name, section, staffId } = req.body
    const cls = await prisma.class.create({
      data: { name, section, staffId },
      include: { staff: { include: { user: true } } },
    })
    return res.json(cls)
  }

  res.status(405).json({ error: 'Method not allowed' })
}