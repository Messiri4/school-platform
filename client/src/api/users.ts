export async function syncUser(clerkId: string, name: string, email: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkId, name, email, role: "STUDENT" }),
  });
  return res.json();
}