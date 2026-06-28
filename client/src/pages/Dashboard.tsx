import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { syncUser } from "../api/users";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const sync = async () => {
      try {
        const email = user.emailAddresses[0]?.emailAddress || "";
        const name = user.fullName || "";
        const dbUser = await syncUser(user.id, name, email);

        // Route based on role
        const role = dbUser.role?.toLowerCase() || "student";
        navigate(`/dashboard/${role}`);
      } catch (err) {
        console.error("Sync failed", err);
        navigate("/dashboard/student");
      } finally {
        setSyncing(false);
      }
    };

    sync();
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
      <div className="text-center">
        <div style={{
          width: "48px",
          height: "48px",
          border: "4px solid #1E3A8A",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 16px",
        }} />
        <p style={{ color: "#1E3A8A", fontWeight: "bold" }}>Setting up your workspace...</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}