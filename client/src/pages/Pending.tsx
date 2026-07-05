import { useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function Pending() {
  const { signOut } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Save to pending list so admin can see them
    fetch(`${API}/pending-users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: user.id,
        name: user.fullName || "",
        email: user.emailAddresses[0]?.emailAddress || "",
      }),
    }).catch(console.error);
  }, [user]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Times New Roman, serif",
      background: "#F8FAFC",
    }}>
      <div style={{
        background: "white",
        borderRadius: "16px",
        padding: "48px",
        maxWidth: "480px",
        textAlign: "center",
        border: "1px solid #CBD5E1",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>⏳</div>
        <h1 style={{ color: "#1E3A8A", fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }}>
          Account Pending Approval
        </h1>
        <p style={{ color: "#6B7280", lineHeight: "1.7", marginBottom: "32px" }}>
          Your account has not been set up yet. Please contact the school admin — 
          your login credentials will be provided once your account has been created.
        </p>
        <div style={{
          background: "#FFFDE7",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "32px",
        }}>
          <p style={{ color: "#1E3A8A", fontSize: "14px", fontWeight: "bold", marginBottom: "8px" }}>
            Contact Admin
          </p>
          <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "4px" }}>
            📧 elizabethanacademyschools@gmail.com
          </p>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            📞 08115335063
          </p>
        </div>
        <button
          onClick={() => signOut(() => navigate("/login"))}
          style={{
            background: "#7B0D1E",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "12px 32px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            width: "100%",
          }}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}