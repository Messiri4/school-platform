import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type Section = "overview" | "announcements" | "admissions" | "students" | "staff" | "classes" | "fees" | "pending";

export default function AdminDashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("overview");

  // Data state
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [fees, setFees] = useState<any[]>([]);
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "" });
  const [newStudent, setNewStudent] = useState({ name: "", email: "", admissionNo: "", class: "", section: "" });
  const [newStaff, setNewStaff] = useState({ name: "", email: "", subject: "", phone: "" });
  const [newClass, setNewClass] = useState({ name: "", section: "", staffId: "" });
  const [newFee, setNewFee] = useState({ studentId: "", amount: "", term: "", year: "" });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [a, adm, st, sf, cl, fe, pu] = await Promise.all([
        fetch(`${API}/announcements`).then(r => r.json()),
        fetch(`${API}/admissions`).then(r => r.json()),
        fetch(`${API}/students`).then(r => r.json()),
        fetch(`${API}/staff`).then(r => r.json()),
        fetch(`${API}/classes`).then(r => r.json()),
        fetch(`${API}/fees`).then(r => r.json()),
        fetch(`${API}/pending-users`).then(r => r.json()),
      ]);

      setAnnouncements(Array.isArray(a) ? a : []);
      setAdmissions(Array.isArray(adm) ? adm : []);
      setStudents(Array.isArray(st) ? st : []);
      setStaff(Array.isArray(sf) ? sf : []);
      setClasses(Array.isArray(cl) ? cl : []);
      setFees(Array.isArray(fe) ? fe : []);
      setPendingUsers(Array.isArray(pu) ? pu : []);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/announcements`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAnnouncement),
    });
    const created = await res.json();
    setAnnouncements([created, ...announcements]);
    setNewAnnouncement({ title: "", content: "" });
  };

  const handleDeleteAnnouncement = async (id: string) => {
    await fetch(`${API}/announcements/${id}`, { method: "DELETE" });
    setAnnouncements(announcements.filter((a: any) => a.id !== id));
  };

  const handleAdmissionStatus = async (id: string, status: string) => {
    await fetch(`${API}/admissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setAdmissions(admissions.map((a: any) => a.id === id ? { ...a, status } : a));
  };

  const handleCreateStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    });
    const created = await res.json();
    setStudents([created, ...students]);
    setNewStudent({ name: "", email: "", admissionNo: "", class: "", section: "" });
  };

  const handleDeleteStudent = async (id: string) => {
    await fetch(`${API}/students/${id}`, { method: "DELETE" });
    setStudents(students.filter((s: any) => s.id !== id));
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/staff`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStaff),
    });
    const created = await res.json();
    setStaff([created, ...staff]);
    setNewStaff({ name: "", email: "", subject: "", phone: "" });
  };

  const handleDeleteStaff = async (id: string) => {
    await fetch(`${API}/staff/${id}`, { method: "DELETE" });
    setStaff(staff.filter((s: any) => s.id !== id));
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/classes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClass),
    });
    const created = await res.json();
    setClasses([created, ...classes]);
    setNewClass({ name: "", section: "", staffId: "" });
  };

  const handleDeleteClass = async (id: string) => {
    await fetch(`${API}/classes/${id}`, { method: "DELETE" });
    setClasses(classes.filter((c: any) => c.id !== id));
  };

  const handleCreateFee = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/fees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newFee, amount: parseFloat(newFee.amount) }),
    });
    const created = await res.json();
    setFees([created, ...fees]);
    setNewFee({ studentId: "", amount: "", term: "", year: "" });
  };

  const handleFeeStatus = async (id: string, status: string) => {
    await fetch(`${API}/fees/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setFees(fees.map((f: any) => f.id === id ? { ...f, status } : f));
  };

  const handleApprove = async (pendingUser: any, role: string) => {
    // Create user in database
    await fetch(`${API}/users/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clerkId: pendingUser.clerkId,
        name: pendingUser.name,
        email: pendingUser.email,
        role: role.toUpperCase(),
      }),
    });
    // Remove from pending
    await fetch(`${API}/pending-users/${pendingUser.id}`, { method: "DELETE" });

    // Update state
    setPendingUsers(pendingUsers.filter((p: any) => p.id !== pendingUser.id));
  };

  const navItems: { key: Section; label: string; icon: string }[] = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "announcements", label: "Announcements", icon: "📢" },
    { key: "admissions", label: "Admissions", icon: "📋" },
    { key: "students", label: "Students", icon: "🎓" },
    { key: "staff", label: "Staff", icon: "👩‍🏫" },
    { key: "classes", label: "Classes", icon: "🏫" },
    { key: "fees", label: "Fees", icon: "💰" },
    { key: "pending", label: "Pending Approvals", icon: "⏳" },
  ];

  const inputStyle = {
    width: "100%",
    border: "1px solid #CBD5E1",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "Times New Roman, serif",
  };

  const labelStyle = {
    color: "#374151",
    fontSize: "14px",
    fontWeight: "600" as const,
    display: "block" as const,
    marginBottom: "6px",
  };

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    border: "1px solid #CBD5E1",
    padding: "24px",
    marginBottom: "24px",
  };

  const tableHeaderStyle = {
    padding: "12px 16px",
    textAlign: "left" as const,
    color: "#1E3A8A",
    fontSize: "13px",
    fontWeight: "bold" as const,
    borderBottom: "1px solid #CBD5E1",
  };

  const tableCellStyle = {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#374151",
    borderBottom: "1px solid #F1F5F9",
  };

  const statusBadge = (status: string) => ({
    background: status === "approved" || status === "paid" ? "#D1FAE5" : status === "rejected" || status === "unpaid" ? "#FEE2E2" : "#FEF9C3",
    color: status === "approved" || status === "paid" ? "#065F46" : status === "rejected" || status === "unpaid" ? "#991B1B" : "#854D0E",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold" as const,
  });

  return (
    <div style={{ fontFamily: "Times New Roman, serif", display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>

      {/* SIDEBAR */}
      <div style={{ width: "260px", background: "#0A0F28", color: "white", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" style={{ width: "48px", height: "48px", objectFit: "contain" }} />
            <div>
              <p style={{ color: "#FFC107", fontWeight: "bold", fontSize: "16px" }}>Elizabethan</p>
              <p style={{ color: "#CBD5E1", fontSize: "11px", letterSpacing: "2px" }}>ADMIN PORTAL</p>
            </div>
          </div>
        </div>

        <nav style={{ padding: "16px", flex: 1, overflowY: "auto" }}>
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

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p style={{ color: "#1E3A8A" }}>Loading...</p>
          </div>
        ) : (
          <>
            {/* ── OVERVIEW ── */}
            {section === "overview" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "8px" }}>
                  Welcome back, {user?.firstName || "Admin"} 👋
                </h1>
                <p style={{ color: "#6B7280", marginBottom: "32px" }}>Here's what's happening at Elizabethan Academy.</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  {[
                    { label: "Total Students", value: students.length, icon: "🎓", color: "#EFF6FF" },
                    { label: "Total Staff", value: staff.length, icon: "👩‍🏫", color: "#F0FDF4" },
                    { label: "Announcements", value: announcements.length, icon: "📢", color: "#FFFDE7" },
                    { label: "Pending Admissions", value: admissions.filter((a: any) => a.status === "pending").length, icon: "📋", color: "#FFF1F2" },
                    { label: "Classes", value: classes.length, icon: "🏫", color: "#F5F3FF" },
                    { label: "Unpaid Fees", value: fees.filter((f: any) => f.status === "unpaid").length, icon: "💰", color: "#FFF7ED" },
                    { label: "Pending Approvals", value: pendingUsers.length, icon: "⏳", color: "#FFF1F2" },
                  ].map((stat) => (
                    <div key={stat.label} style={{ background: stat.color, borderRadius: "12px", padding: "24px", border: "1px solid #CBD5E1" }}>
                      <div style={{ fontSize: "28px", marginBottom: "8px" }}>{stat.icon}</div>
                      <p style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold" }}>{stat.value}</p>
                      <p style={{ color: "#6B7280", fontSize: "13px" }}>{stat.label}</p>
                    </div>
                  ))}
                </div>

                <h2 style={{ color: "#1E3A8A", fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Recent Admissions</h2>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#F8FAFC" }}>
                      <tr>
                        {["Student", "Parent", "Email", "Applying For", "Status"].map(h => (
                          <th key={h} style={tableHeaderStyle}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.slice(0, 5).map((adm: any) => (
                        <tr key={adm.id}>
                          <td style={tableCellStyle}>{adm.studentName}</td>
                          <td style={tableCellStyle}>{adm.parentName}</td>
                          <td style={tableCellStyle}>{adm.email}</td>
                          <td style={tableCellStyle}>{adm.applyingFor || "-"}</td>
                          <td style={tableCellStyle}><span style={statusBadge(adm.status)}>{adm.status}</span></td>
                        </tr>
                      ))}
                      {admissions.length === 0 && (
                        <tr><td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "#6B7280" }}>No admissions yet</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── ANNOUNCEMENTS ── */}
            {section === "announcements" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Announcements</h1>
                <div style={cardStyle}>
                  <h3 style={{ color: "#1E3A8A", fontWeight: "bold", marginBottom: "16px" }}>Create New Announcement</h3>
                  <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                    <div>
                      <label style={labelStyle}>Title</label>
                      <input type="text" required value={newAnnouncement.title} onChange={e => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Content</label>
                      <textarea required rows={4} value={newAnnouncement.content} onChange={e => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
                    </div>
                    <button type="submit" style={{ background: "#1E3A8A", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>
                      Post Announcement
                    </button>
                  </form>
                </div>
                <div className="space-y-4">
                  {announcements.map((ann: any) => (
                    <div key={ann.id} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <h3 style={{ color: "#1E3A8A", fontWeight: "bold", marginBottom: "6px" }}>{ann.title}</h3>
                        <p style={{ color: "#6B7280", fontSize: "14px" }}>{ann.content}</p>
                        <p style={{ color: "#9CA3AF", fontSize: "12px", marginTop: "8px" }}>{new Date(ann.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => handleDeleteAnnouncement(ann.id)} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", fontSize: "13px", flexShrink: 0, marginLeft: "16px" }}>
                        Delete
                      </button>
                    </div>
                  ))}
                  {announcements.length === 0 && <p style={{ color: "#6B7280", textAlign: "center", padding: "40px" }}>No announcements yet</p>}
                </div>
              </div>
            )}

            {/* ── ADMISSIONS ── */}
            {section === "admissions" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Admissions</h1>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
                    <thead style={{ background: "#F8FAFC" }}>
                      <tr>{["Student", "Parent", "Email", "Phone", "Applying For", "Date", "Status", "Actions"].map(h => <th key={h} style={tableHeaderStyle}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {admissions.map((adm: any) => (
                        <tr key={adm.id}>
                          <td style={tableCellStyle}>{adm.studentName}</td>
                          <td style={tableCellStyle}>{adm.parentName}</td>
                          <td style={tableCellStyle}>{adm.email}</td>
                          <td style={tableCellStyle}>{adm.phone || "-"}</td>
                          <td style={tableCellStyle}>{adm.applyingFor || "-"}</td>
                          <td style={tableCellStyle}>{new Date(adm.createdAt).toLocaleDateString()}</td>
                          <td style={tableCellStyle}><span style={statusBadge(adm.status)}>{adm.status}</span></td>
                          <td style={tableCellStyle}>
                            {adm.status === "pending" && (
                              <div className="flex gap-2">
                                <button onClick={() => handleAdmissionStatus(adm.id, "approved")} style={{ background: "#D1FAE5", color: "#065F46", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>Approve</button>
                                <button onClick={() => handleAdmissionStatus(adm.id, "rejected")} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>Reject</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                      {admissions.length === 0 && <tr><td colSpan={8} style={{ padding: "24px", textAlign: "center", color: "#6B7280" }}>No admissions yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── STUDENTS ── */}
            {section === "students" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Students</h1>
                <div style={cardStyle}>
                  <h3 style={{ color: "#1E3A8A", fontWeight: "bold", marginBottom: "16px" }}>Add New Student</h3>
                  <form onSubmit={handleCreateStudent}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div><label style={labelStyle}>Full Name</label><input required value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Email</label><input type="email" required value={newStudent.email} onChange={e => setNewStudent({ ...newStudent, email: e.target.value })} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Admission No.</label><input required value={newStudent.admissionNo} onChange={e => setNewStudent({ ...newStudent, admissionNo: e.target.value })} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Class</label><input required value={newStudent.class} onChange={e => setNewStudent({ ...newStudent, class: e.target.value })} style={inputStyle} placeholder="e.g. Primary 3" /></div>
                      <div><label style={labelStyle}>Section</label><input value={newStudent.section} onChange={e => setNewStudent({ ...newStudent, section: e.target.value })} style={inputStyle} placeholder="e.g. A" /></div>
                    </div>
                    <button type="submit" style={{ background: "#1E3A8A", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>Add Student</button>
                  </form>
                </div>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#F8FAFC" }}>
                      <tr>{["Name", "Email", "Admission No.", "Class", "Section", "Actions"].map(h => <th key={h} style={tableHeaderStyle}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {students.map((s: any) => (
                        <tr key={s.id}>
                          <td style={tableCellStyle}>{s.user?.name}</td>
                          <td style={tableCellStyle}>{s.user?.email}</td>
                          <td style={tableCellStyle}>{s.admissionNo}</td>
                          <td style={tableCellStyle}>{s.class}</td>
                          <td style={tableCellStyle}>{s.section || "-"}</td>
                          <td style={tableCellStyle}>
                            <button onClick={() => handleDeleteStudent(s.id)} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {students.length === 0 && <tr><td colSpan={6} style={{ padding: "24px", textAlign: "center", color: "#6B7280" }}>No students yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── STAFF ── */}
            {section === "staff" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Staff</h1>
                <div style={cardStyle}>
                  <h3 style={{ color: "#1E3A8A", fontWeight: "bold", marginBottom: "16px" }}>Add New Staff</h3>
                  <form onSubmit={handleCreateStaff}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div><label style={labelStyle}>Full Name</label><input required value={newStaff.name} onChange={e => setNewStaff({ ...newStaff, name: e.target.value })} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Email</label><input type="email" required value={newStaff.email} onChange={e => setNewStaff({ ...newStaff, email: e.target.value })} style={inputStyle} /></div>
                      <div><label style={labelStyle}>Subject</label><input value={newStaff.subject} onChange={e => setNewStaff({ ...newStaff, subject: e.target.value })} style={inputStyle} placeholder="e.g. Mathematics" /></div>
                      <div><label style={labelStyle}>Phone</label><input value={newStaff.phone} onChange={e => setNewStaff({ ...newStaff, phone: e.target.value })} style={inputStyle} /></div>
                    </div>
                    <button type="submit" style={{ background: "#1E3A8A", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>Add Staff</button>
                  </form>
                </div>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#F8FAFC" }}>
                      <tr>{["Name", "Email", "Subject", "Phone", "Actions"].map(h => <th key={h} style={tableHeaderStyle}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {staff.map((s: any) => (
                        <tr key={s.id}>
                          <td style={tableCellStyle}>{s.user?.name}</td>
                          <td style={tableCellStyle}>{s.user?.email}</td>
                          <td style={tableCellStyle}>{s.subject || "-"}</td>
                          <td style={tableCellStyle}>{s.phone || "-"}</td>
                          <td style={tableCellStyle}>
                            <button onClick={() => handleDeleteStaff(s.id)} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {staff.length === 0 && <tr><td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "#6B7280" }}>No staff yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── CLASSES ── */}
            {section === "classes" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Classes</h1>
                <div style={cardStyle}>
                  <h3 style={{ color: "#1E3A8A", fontWeight: "bold", marginBottom: "16px" }}>Create New Class</h3>
                  <form onSubmit={handleCreateClass}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div><label style={labelStyle}>Class Name</label><input required value={newClass.name} onChange={e => setNewClass({ ...newClass, name: e.target.value })} style={inputStyle} placeholder="e.g. Primary 3" /></div>
                      <div><label style={labelStyle}>Section</label><input value={newClass.section} onChange={e => setNewClass({ ...newClass, section: e.target.value })} style={inputStyle} placeholder="e.g. A" /></div>
                      <div>
                        <label style={labelStyle}>Assign Teacher</label>
                        <select value={newClass.staffId} onChange={e => setNewClass({ ...newClass, staffId: e.target.value })} style={{ ...inputStyle, background: "white" }}>
                          <option value="">Select teacher...</option>
                          {staff.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.user?.name} — {s.subject || "No subject"}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button type="submit" style={{ background: "#1E3A8A", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>Create Class</button>
                  </form>
                </div>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#F8FAFC" }}>
                      <tr>{["Class Name", "Section", "Teacher", "Subject", "Actions"].map(h => <th key={h} style={tableHeaderStyle}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {classes.map((c: any) => (
                        <tr key={c.id}>
                          <td style={tableCellStyle}>{c.name}</td>
                          <td style={tableCellStyle}>{c.section || "-"}</td>
                          <td style={tableCellStyle}>{c.staff?.user?.name || "Unassigned"}</td>
                          <td style={tableCellStyle}>{c.staff?.subject || "-"}</td>
                          <td style={tableCellStyle}>
                            <button onClick={() => handleDeleteClass(c.id)} style={{ background: "#FEE2E2", color: "#991B1B", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                      {classes.length === 0 && <tr><td colSpan={5} style={{ padding: "24px", textAlign: "center", color: "#6B7280" }}>No classes yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── FEES ── */}
            {section === "fees" && (
              <div>
                <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>Fee Management</h1>
                <div style={cardStyle}>
                  <h3 style={{ color: "#1E3A8A", fontWeight: "bold", marginBottom: "16px" }}>Add Fee Record</h3>
                  <form onSubmit={handleCreateFee}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label style={labelStyle}>Student</label>
                        <select required value={newFee.studentId} onChange={e => setNewFee({ ...newFee, studentId: e.target.value })} style={{ ...inputStyle, background: "white" }}>
                          <option value="">Select student...</option>
                          {students.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.user?.name} — {s.class}</option>
                          ))}
                        </select>
                      </div>
                      <div><label style={labelStyle}>Amount (₦)</label><input type="number" required value={newFee.amount} onChange={e => setNewFee({ ...newFee, amount: e.target.value })} style={inputStyle} placeholder="e.g. 50000" /></div>
                      <div>
                        <label style={labelStyle}>Term</label>
                        <select required value={newFee.term} onChange={e => setNewFee({ ...newFee, term: e.target.value })} style={{ ...inputStyle, background: "white" }}>
                          <option value="">Select term...</option>
                          <option>First Term</option>
                          <option>Second Term</option>
                          <option>Third Term</option>
                        </select>
                      </div>
                      <div><label style={labelStyle}>Year</label><input required value={newFee.year} onChange={e => setNewFee({ ...newFee, year: e.target.value })} style={inputStyle} placeholder="e.g. 2026/2027" /></div>
                    </div>
                    <button type="submit" style={{ background: "#1E3A8A", color: "white", border: "none", borderRadius: "8px", padding: "10px 24px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}>Add Fee Record</button>
                  </form>
                </div>
                <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead style={{ background: "#F8FAFC" }}>
                      <tr>{["Student", "Class", "Amount", "Term", "Year", "Status", "Actions"].map(h => <th key={h} style={tableHeaderStyle}>{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {fees.map((f: any) => (
                        <tr key={f.id}>
                          <td style={tableCellStyle}>{f.student?.user?.name}</td>
                          <td style={tableCellStyle}>{f.student?.class}</td>
                          <td style={tableCellStyle}>₦{f.amount?.toLocaleString()}</td>
                          <td style={tableCellStyle}>{f.term}</td>
                          <td style={tableCellStyle}>{f.year}</td>
                          <td style={tableCellStyle}><span style={statusBadge(f.status)}>{f.status}</span></td>
                          <td style={tableCellStyle}>
                            {f.status === "unpaid" && (
                              <button onClick={() => handleFeeStatus(f.id, "paid")} style={{ background: "#D1FAE5", color: "#065F46", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}>Mark Paid</button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {fees.length === 0 && <tr><td colSpan={7} style={{ padding: "24px", textAlign: "center", color: "#6B7280" }}>No fee records yet</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── PENDING ── */}
            {section === "pending" && (
            <div>
              <h1 style={{ color: "#1E3A8A", fontSize: "28px", fontWeight: "bold", marginBottom: "24px" }}>
                Pending Approvals
              </h1>
              <div style={{ background: "white", borderRadius: "12px", border: "1px solid #CBD5E1", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#F8FAFC" }}>
                    <tr>
                      {["Name", "Email", "Requested", "Approve As"].map(h => (
                        <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#1E3A8A", fontSize: "13px", fontWeight: "bold", borderBottom: "1px solid #CBD5E1" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((pu: any) => (
                      <tr key={pu.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "#374151" }}>{pu.name}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "#374151" }}>{pu.email}</td>
                        <td style={{ padding: "12px 16px", fontSize: "14px", color: "#374151" }}>{new Date(pu.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <div className="flex gap-2 flex-wrap">
                            {["student", "parent", "staff", "admin"].map((role) => (
                              <button
                                key={role}
                                onClick={() => handleApprove(pu, role)}
                                style={{
                                  background: role === "admin" ? "#1E3A8A" : role === "staff" ? "#10B981" : role === "parent" ? "#F97316" : "#FFC107",
                                  color: role === "admin" || role === "staff" ? "white" : "#1E3A8A",
                                  border: "none",
                                  borderRadius: "6px",
                                  padding: "4px 10px",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                  fontWeight: "bold",
                                  textTransform: "capitalize",
                                }}
                              >
                                {role}
                              </button>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {pendingUsers.length === 0 && (
                      <tr>
                        <td colSpan={4} style={{ padding: "40px", textAlign: "center", color: "#6B7280" }}>
                          No pending approvals
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          </>
        )}
      </div>
    </div>
  );
}