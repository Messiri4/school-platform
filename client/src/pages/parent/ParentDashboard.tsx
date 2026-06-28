import { useUser, useClerk } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type Section = "overview" | "announcements" | "children" | "fees";

export default function ParentDashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("overview");
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const a = await fetch(`${API}/announcements`).then(r => r.json());
        setAnnouncements(Array.isArray(a) ? a : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "announcements", label: "Announcements", icon: "📢" },
    { key: "children", label: "My Children", icon: "👨‍👧" },
    { key: "fees", label: "Fees", icon: "💰" },
  ];

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    border: "1px solid #CBD5E1",
    padding: "24px",
    marginBottom: "24px",
  };

  return (
    <div style={{ fontFamily: "Times New Roman, serif", display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>

      {/* SIDEBAR */}
      <div style={{ width: "260px", background: "#0A0F28", color: "white", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
            <div>
              <p style={{ color: "#FFC107", fontWeight: "bold", fontSize: "16px" }}>Elizabethan</p>
              <p style={{ color: "#CBD5E1", fontSize: "11px", letterSpacing: "2px" }}>PARENT PORTAL</p>
            </div>
          </div>
        </div>

        <nav style={{ padding: "16px", flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                marginBottom: "4px",
                background: section === item.key ? "#1E3A8A" : "transparent",
                color: section === item.key ? "white" : "#CBD5E1",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "Times New Roman, serif",
                textAlign: "left",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <p style={{ color: "#CBD5E1", fontSize: "13px", marginBottom: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {user?.fullName || user?.emailAddresses[0]?.emailAddress}
          </p>
          <button
            onClick={() => signOut(() => navigate("/login"))}
            style={{ background: "#7B0D1E", color: "white", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer", fontSize: "13px", width: "100%" }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {loading ? (
          <p style={{ color: "#1E3A8A" }}>Loading...</p>
        ) : (
          <>
            {section === "overview" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
                  Welcome, {user?.firstName || "Parent"} 👋
                </h1>
                <p style={{ color: "#6B7280", marginBottom: "32px" }}>Monitor your child's progress at Elizabethan Academy.</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
                  {[
                    { label: "Announcements", value: announcements.length, icon: "📢", color: "#FFFDE7" },
                    { label: "Children Enrolled", value: "—", icon: "👨‍👧", color: "#EFF6FF" },
                    { label: "Pending Fees", value: "—", icon: "💰", color: "#FFF1F2" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background: stat.color, borderRadius: "12px", padding: "24px", border: "1px solid #CBD5E1" }}>
                      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
                      <p style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold" }}>{stat.value}</p>
                      <p style={{ color: "#6B7280", fontSize: "13px" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <h2 style={{ color: "#1E3A8A", fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Latest Announcements</h2>
                <div className="space-y-4">
                  {announcements.slice(0, 3).map((ann: any) => (
                    <div key={ann.id} style={cardStyle}>
                      <span style={{ background: "#FFC107", color: "#1E3A8A", fontSize: "11px", fontWeight: "bold", padding: "3px 10px", borderRadius: "20px", textTransform: "uppercase" }}>Announcement</span>
                      <h3 style={{ color: "#1E3A8A", fontWeight: "bold", margin: "10px 0 6px" }}>{ann.title}</h3>
                      <p style={{ color: "#6B7280", fontSize: "14px" }}>{ann.content}</p>
                      <p style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "8px" }}>{new Date(ann.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "announcements" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Announcements</h1>
                <div className="space-y-4">
                  {announcements.map((ann: any) => (
                    <div key={ann.id} style={cardStyle}>
                      <span style={{ background: "#FFC107", color: "#1E3A8A", fontSize: "11px", fontWeight: "bold", padding: "3px 10px", borderRadius: "20px", textTransform: "uppercase" }}>Announcement</span>
                      <h3 style={{ color: "#1E3A8A", fontWeight: "bold", margin: "10px 0 6px" }}>{ann.title}</h3>
                      <p style={{ color: "#6B7280", fontSize: "14px" }}>{ann.content}</p>
                      <p style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "8px" }}>{new Date(ann.createdAt).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === "children" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>My Children</h1>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", padding: "40px", textAlign: "center" }}>
                  <p style={{ fontSize: "48px", marginBottom: "16px" }}>👨‍👧</p>
                  <p style={{ color: "#1E3A8A", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>No children linked yet</p>
                  <p style={{ color: "#6B7280", fontSize: "14px" }}>Contact the admin to link your child's account to your portal.</p>
                </div>
              </div>
            )}

            {section === "fees" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Fees</h1>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", padding: "40px", textAlign: "center" }}>
                  <p style={{ fontSize: "48px", marginBottom: "16px" }}>💰</p>
                  <p style={{ color: "#1E3A8A", fontWeight: "bold", fontSize: "18px", marginBottom: "8px" }}>No fee records yet</p>
                  <p style={{ color: "#6B7280", fontSize: "14px" }}>Your child's fee records will appear here.</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}