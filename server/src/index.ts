import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import announcementRoutes from "./routes/announcements";



dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/announcements", announcementRoutes);

app.get("/", (req, res) => {
  res.send("School Platform API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});