import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClerkClient } from '@clerk/backend'
import prisma from './_db'

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (req.method === 'GET') {
    const staff = await prisma.staff.findMany({
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })
    return res.json(staff)
  }

  if (req.method === 'POST') {
    const { name, email, subject, phone } = req.body
    const clerkUser = await clerk.users.createUser({
      emailAddress: [email],
      firstName: name.split(' ')[0],
      lastName: name.split(' ').slice(1).join(' ') || '',
      skipPasswordRequirement: true,
    })
    const user = await prisma.user.create({
      data: { clerkId: clerkUser.id, name, email, role: 'STAFF' },
    })
    const staff = await prisma.staff.create({
      data: { userId: user.id, subject, phone },
      include: { user: true },
    })
    return res.json(staff)
  }

  res.status(405).json({ error: 'Method not allowed' })
}