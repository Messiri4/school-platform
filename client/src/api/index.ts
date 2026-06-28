const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Announcements
export const getAnnouncements = async () => {
  const res = await fetch(`${API}/announcements`);
  return res.json();
};

export const createAnnouncement = async (data: { title: string; content: string; imageUrl?: string }) => {
  const res = await fetch(`${API}/announcements`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const deleteAnnouncement = async (id: string) => {
  const res = await fetch(`${API}/announcements/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

// Admissions
export const getAdmissions = async () => {
  const res = await fetch(`${API}/admissions`);
  return res.json();
};

export const createAdmission = async (data: any) => {
  const res = await fetch(`${API}/admissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const updateAdmissionStatus = async (id: string, status: string) => {
  const res = await fetch(`${API}/admissions/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return res.json();
};

// Users
export const getUsers = async () => {
  const res = await fetch(`${API}/users`);
  return res.json();
};

export const syncUser = async (clerkId: string, name: string, email: string) => {
  const res = await fetch(`${API}/users/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkId, name, email }),
  });
  return res.json();
};