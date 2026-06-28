import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getAnnouncements = async () => {
  const res = await axios.get(`${API}/announcements`);
  return res.data;
};