import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from '../_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'PATCH,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'PATCH') {
    const { status } = req.body
    const fee = await prisma.fee.update({
      where: { id: req.query.id as string },
      data: { status, paidAt: status === 'paid' ? new Date() : null },
    })
    return res.json(fee)
  }

  res.status(405).json({ error: 'Method not allowed' })
}