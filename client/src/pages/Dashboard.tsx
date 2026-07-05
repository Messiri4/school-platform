import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-input";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const checkUser = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/${user.id}`
        );

        if (res.status === 404) {
          // User not in DB — check if they came from parent portal
          const portal = sessionStorage.getItem("portal");
          if (portal === "parent") {
            // Auto-create parent account
            await fetch(`${import.meta.env.VITE_API_URL}/users/sync`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                clerkId: user.id,
                name: user.fullName || "",
                email: user.emailAddresses[0]?.emailAddress || "",
                role: "PARENT",
              }),
            });
            navigate("/dashboard/parent");
          } else {
            navigate("/pending");
          }
          return;
        }

        const dbUser = await res.json();
        const role = dbUser.role?.toLowerCase() || "student";
        navigate(`/dashboard/${role}`);
      } catch (err) {
        console.error("Check failed", err);
        navigate("/pending");
      }
    };

    checkUser();
  }, [isLoaded, user]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Times New Roman, serif",
      background: "#F8FAFC",
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: "48px",
          height: "48px",
          border: "4px solid #1E3A8A",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px",
        }} />
        <p style={{ color: "#1E3A8A", fontWeight: "bold" }}>
          Setting up your workspace...
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}