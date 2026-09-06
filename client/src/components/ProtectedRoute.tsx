import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface Props {
  allowedRole: string;
  children: React.ReactNode;
}

export default function ProtectedRoute({ allowedRole, children }: Props) {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchRole = async () => {
      try {
        const res = await fetch(`${API}/users?clerkId=${user.id}`);

        if (!res.ok) {
          throw new Error("Failed to verify user role");
        }

        const data = await res.json();

        if (!data.role) {
          throw new Error("User role not found");
        }

        setRole(data.role.toLowerCase());
      } catch (err) {
        console.error("Role verification failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, [isLoaded, user]);

  // Error fetching role
  if (error) {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Times New Roman, serif",
    }}>
      <div style={{ textAlign: "center" }}>
        <h2>Unable to verify account access</h2>
        <p>Please try again or contact the administrator.</p>
      </div>
    </div>
  );
}

  // Not logged in — redirect to login
  if (isLoaded && !user) {
    return <Navigate to="/login" replace />;
  }

  // Still loading role
  if (loading) {
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
          <p style={{ color: "#1E3A8A", fontWeight: "bold" }}>Verifying access...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Wrong role — redirect to their correct portal
  if (role !== allowedRole) {
    return <Navigate to={`/dashboard/${role}`} replace />;
  }

  // Correct role — show the page
  return <>{children}</>;
}