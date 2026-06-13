import { SignIn } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";

const portalLabels: Record<string, { title: string; desc: string }> = {
  student: {
    title: "Student Portal",
    desc: "Access your results, timetable, assignments, and school updates.",
  },
  parent: {
    title: "Parent Portal",
    desc: "Monitor your child's academic progress, fees, and school communications.",
  },
  staff: {
    title: "Staff Portal",
    desc: "Manage classes, attendance, grades, and school administration.",
  },
  admin: {
    title: "Admin Portal",
    desc: "Full access to school operations, users, finance, and settings.",
  },
};

export default function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const portal = params.get("portal") || "student";
  const info = portalLabels[portal] || portalLabels["student"];

  return (
    <div style={{
      fontFamily: "Times New Roman, serif",
      display: "flex",
      height: "100vh",
      overflow: "hidden",
    }}>

      {/* LEFT — Image + Branding */}
      <div
        style={{
          width: "50%",
          background: "linear-gradient(to bottom, rgba(10,15,40,0.75), rgba(80,10,20,0.7)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200') center/cover no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "48px",
        }}
        className="hidden md:flex"
      >
        {/* Logo + name */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/logo.png"
            alt="Logo"
            style={{ width: "130px", height: "130px", objectFit: "contain" }}
            />
            <div>
            <p style={{ color: "#FFC107", fontWeight: "bold", fontSize: "36px", lineHeight: "1.2" }}>
                Elizabethan
            </p>
            <p style={{ color: "#CBD5E1", fontSize: "16px", letterSpacing: "4px", textTransform: "uppercase" }}>
                Academy
            </p>
            </div>
        </div>
        <h1 style={{ color: "white", fontSize: "36px", fontWeight: "bold", lineHeight: "1.2", marginBottom: "16px" }}>
          Elizabethan Academy Portal
        </h1>
        <p style={{ color: "#CBD5E1", fontSize: "15px", lineHeight: "1.7", maxWidth: "420px" }}>
          Focused school operations for academics, finance, attendance, communication, and every daily detail that keeps learning moving.
        </p>
      </div>

      {/* RIGHT — Sign In Form */}
      <div
        style={{ background: "#FFFFF0", overflowY: "auto" }}
        className="w-full md:w-1/2 flex flex-col items-center justify-center px-8 py-6"
      >
        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* Portal badge */}
          <div className="mb-4">
            <span
              style={{ background: "#EFF6FF", color: "#1E3A8A", border: "1px solid #CBD5E1" }}
              className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
            >
              {info.title}
            </span>
          </div>

          <h2 style={{ color: "#1E3A8A", fontSize: "26px", fontWeight: "bold", marginBottom: "6px" }}>
            Welcome back
          </h2>
          <p style={{ color: "#6B7280", marginBottom: "20px", fontSize: "14px" }}>
            Sign in to continue to the Elizabethan Academy workspace.
          </p>

          {/* Clerk SignIn component */}
          <SignIn
            routing="hash"
            forceRedirectUrl="/dashboard"
            appearance={{
            elements: {
                rootBox: "w-full",
                card: "shadow-none p-0 bg-transparent",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "border border-gray-200 rounded-lg",
                formButtonPrimary: "w-full py-3 rounded-lg font-bold text-white hover:opacity-90 transition",
                formFieldInput: "w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-800",
                formFieldLabel: "text-sm font-semibold text-gray-700",
                footerActionLink: "text-blue-900 font-semibold hover:underline",
                footerPages: "hidden",
                footerPagesLink: "hidden",
                internal__devModeNotice: "hidden",
                devModeNotice: "hidden",
            },
            layout: {
                privacyPageUrl: undefined,
                termsPageUrl: undefined,
                showOptionalFields: false,
            },
            }}
          />
          {/* Manual sign up link */}
        <p style={{ color: "#6B7280" }} className="text-sm text-center mt-4">
        Don't have an account?{" "}
        <a href="/sign-up" style={{ color: "#1E3A8A" }} className="font-bold hover:underline">
            Sign up
        </a>
        </p>

          {/* Portal switcher */}
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid #CBD5E1" }}>
            <p style={{ color: "#6B7280" }} className="text-xs text-center mb-2">Access a different portal</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {Object.entries(portalLabels).map(([key, val]) => (
                <a
                  key={key}
                  href={`/login?portal=${key}`}
                  style={{
                    background: portal === key ? "#1E3A8A" : "#fff",
                    color: portal === key ? "#fff" : "#374151",
                    borderColor: "#CBD5E1",
                  }}
                  className="border text-xs font-semibold px-3 py-1.5 rounded-full hover:opacity-90 transition"
                >
                  {val.title}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}