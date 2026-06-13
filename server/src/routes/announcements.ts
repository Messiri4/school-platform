import express from "express";
import prisma from "../lib/prisma";

const router = express.Router();


let announcements = [
  { id: 1, title: "School Resumption", content: "School starts Monday" },
];

router.get("/", (req, res) => {
  res.json(announcements);
});

// // GET all announcements
// router.get("/", async (req, res) => {
//   const announcements = await prisma.announcement.findMany({
//     orderBy: { createdAt: "desc" },
//   });

//   res.json(announcements);
// });

// // POST announcement (admin)
// router.post("/", async (req, res) => {
//   const { title, content, imageUrl } = req.body;

//   const announcement = await prisma.announcement.create({
//     data: {
//       title,
//       content,
//       imageUrl,
//     },
//   });

//   res.json(announcement);
// });

export default router;