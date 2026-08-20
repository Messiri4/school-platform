export async function getAnnouncements() {
  const res = await fetch(`/api/announcements`);
  return res.json();
}