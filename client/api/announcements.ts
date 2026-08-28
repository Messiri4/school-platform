import type { VercelRequest, VercelResponse } from '@vercel/node'
import prisma from './_db'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  const { id } = req.query

  if (req.method === 'GET') {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return res.json(announcements)
  }

  if (req.method === 'POST') {
    const { title, content, imageUrl } = req.body

    const announcement = await prisma.announcement.create({
      data: { title, content, imageUrl },
    })

    return res.json(announcement)
  }

  if (req.method === 'DELETE' && id) {
    await prisma.announcement.delete({
      where: { id: id as string },
    })

    return res.json({ message: 'Deleted' })
  }

  return res.status(405).json({
    error: 'Method not allowed',
  })
}