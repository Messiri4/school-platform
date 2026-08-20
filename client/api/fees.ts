import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const fees = await prisma.fee.findMany({
      include: { student: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return res.json(fees)
  }

  if (req.method === 'POST') {
    const { studentId, amount, term, year } = req.body
    const fee = await prisma.fee.create({
      data: { studentId, amount: parseFloat(amount), term, year },
      include: { student: { include: { user: true } } },
    })
    return res.json(fee)
  }

  res.status(405).json({ error: 'Method not allowed' })
}