import { SignIn } from "@clerk/clerk-react";

export default function AdminLogin() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Times New Roman, serif",
      background: "#0A0F28",
    }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "40px" }}>
        <div className="flex items-center gap-3 mb-8">
          <img src="/logo.png" alt="Logo" style={{ width: "60px", height: "60px", objectFit: "contain" }} />
          <div>
            <p style={{ color: "#FFC107", fontWeight: "bold", fontSize: "20px" }}>Elizabethan</p>
            <p style={{ color: "#CBD5E1", fontSize: "12px", letterSpacing: "3px" }}>ADMIN ACCESS</p>
          </div>
        </div>

        <SignIn
          routing="hash"
          forceRedirectUrl="/dashboard/admin"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none p-0 bg-transparent",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formButtonPrimary: "w-full py-3 rounded-lg font-bold text-white hover:opacity-90 transition",
              formFieldInput: "w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-900 text-white",
              formFieldLabel: "text-sm font-semibold text-gray-300",
              footerActionLink: "text-yellow-400 font-semibold hover:underline",
              footer: "hidden",
              badge: "hidden",
            },
          }}
        />
      </div>
    </div>
  );
}