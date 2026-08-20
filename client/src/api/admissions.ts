import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const admissions = await prisma.admission.findMany({ orderBy: { createdAt: 'desc' } })
    return res.json(admissions)
  }

  if (req.method === 'POST') {
    const { parentName, studentName, email, phone, applyingFor, message } = req.body
    const admission = await prisma.admission.create({
      data: { parentName, studentName, email, phone, applyingFor, message },
    })
    return res.json(admission)
  }

  res.status(405).json({ error: 'Method not allowed' })
}