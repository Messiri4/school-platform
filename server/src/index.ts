import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import announcementRoutes from "./routes/announcements";
import userRoutes from "./routes/users";
import admissionRoutes from "./routes/admissions";
import studentRoutes from "./routes/students";
import staffRoutes from "./routes/staff";
import classRoutes from "./routes/classes";
import feeRoutes from "./routes/fees";




dotenv.config();

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/fees", feeRoutes);

app.get("/", (req, res) => {
  res.send("School Platform API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});