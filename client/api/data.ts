import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClerkClient } from '@clerk/backend'
import prisma from './_db'

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
})

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,DELETE,PATCH,OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const { resource, id } = req.query
  const r = resource as string

  try {
    // STUDENTS
    if (r === 'students') {
      if (req.method === 'GET') {
        const students = await prisma.student.findMany({
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        })

        return res.json(students)
      }

      if (req.method === 'POST') {
        const {
          name,
          email,
          admissionNo,
          class: className,
          section,
        } = req.body

        const clerkUser = await clerk.users.createUser({
          emailAddress: [email],
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || '',
          skipPasswordRequirement: true,
        })

        const user = await prisma.user.create({
          data: {
            clerkId: clerkUser.id,
            name,
            email,
            role: 'STUDENT',
          },
        })

        const student = await prisma.student.create({
          data: {
            userId: user.id,
            admissionNo,
            class: className,
            section,
          },
          include: { user: true },
        })

        return res.json(student)
      }

      if (req.method === 'DELETE' && id) {
        const student = await prisma.student.findUnique({
          where: { id: id as string },
          include: { user: true },
        })

        if (student?.user?.clerkId) {
          await clerk.users.deleteUser(student.user.clerkId)
        }

        await prisma.student.delete({
          where: { id: id as string },
        })

        return res.json({ message: 'Deleted' })
      }
    }

    // STAFF
    if (r === 'staff') {
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
          data: {
            clerkId: clerkUser.id,
            name,
            email,
            role: 'STAFF',
          },
        })

        const staff = await prisma.staff.create({
          data: {
            userId: user.id,
            subject,
            phone,
          },
          include: { user: true },
        })

        return res.json(staff)
      }

      if (req.method === 'DELETE' && id) {
        const staff = await prisma.staff.findUnique({
          where: { id: id as string },
          include: { user: true },
        })

        if (staff?.user?.clerkId) {
          await clerk.users.deleteUser(staff.user.clerkId)
        }

        await prisma.staff.delete({
          where: { id: id as string },
        })

        return res.json({ message: 'Deleted' })
      }
    }

    // CLASSES
    if (r === 'classes') {
      if (req.method === 'GET') {
        const classes = await prisma.class.findMany({
          include: {
            staff: {
              include: { user: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        })

        return res.json(classes)
      }

      if (req.method === 'POST') {
        const { name, section, staffId } = req.body

        const cls = await prisma.class.create({
          data: {
            name,
            section,
            staffId,
          },
          include: {
            staff: {
              include: { user: true },
            },
          },
        })

        return res.json(cls)
      }

      if (req.method === 'DELETE' && id) {
        await prisma.class.delete({
          where: { id: id as string },
        })

        return res.json({ message: 'Deleted' })
      }
    }

    // FEES
    if (r === 'fees') {
      if (req.method === 'GET') {
        const fees = await prisma.fee.findMany({
          include: {
            student: {
              include: { user: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        })

        return res.json(fees)
      }

      if (req.method === 'POST') {
        const { studentId, amount, term, year } = req.body

        const fee = await prisma.fee.create({
          data: {
            studentId,
            amount: parseFloat(amount),
            term,
            year,
          },
          include: {
            student: {
              include: { user: true },
            },
          },
        })

        return res.json(fee)
      }

      if (req.method === 'PATCH' && id) {
        const { status } = req.body

        const fee = await prisma.fee.update({
          where: { id: id as string },
          data: {
            status,
            paidAt: status === 'paid' ? new Date() : null,
          },
        })

        return res.json(fee)
      }
    }

    // ADMISSIONS
    if (r === 'admissions') {
      if (req.method === 'GET') {
        const admissions = await prisma.admission.findMany({
          orderBy: { createdAt: 'desc' },
        })

        return res.json(admissions)
      }

      if (req.method === 'POST') {
        const {
          parentName,
          studentName,
          email,
          phone,
          applyingFor,
          message,
        } = req.body

        const admission = await prisma.admission.create({
          data: {
            parentName,
            studentName,
            email,
            phone,
            applyingFor,
            message,
          },
        })

        return res.json(admission)
      }

      if (req.method === 'PATCH' && id) {
        const { status } = req.body

        const admission = await prisma.admission.update({
          where: { id: id as string },
          data: { status },
        })

        return res.json(admission)
      }
    }

    // PENDING USERS
    if (r === 'pending-users') {
      if (req.method === 'GET') {
        const pending = await prisma.pendingUser.findMany({
          orderBy: { createdAt: 'desc' },
        })

        return res.json(pending)
      }

      if (req.method === 'POST') {
        const { clerkId, name, email } = req.body

        const existing = await prisma.user.findUnique({
          where: { clerkId },
        })

        if (existing) {
          return res.json({ alreadyApproved: true })
        }

        const pending = await prisma.pendingUser.upsert({
          where: { clerkId },
          update: { name, email },
          create: { clerkId, name, email },
        })

        return res.json(pending)
      }

      if (req.method === 'DELETE' && id) {
        await prisma.pendingUser.delete({
          where: { id: id as string },
        })

        return res.json({ message: 'Removed' })
      }
    }

    return res.status(404).json({
      error: 'Resource not found',
    })
  } catch (error: any) {
    console.error(error)

    return res.status(500).json({
      error: error.message || 'Server error',
    })
  }
}