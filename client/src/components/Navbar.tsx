import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* Top bar */}
      <div style={{ background: "#0A0F28" }} className="text-white text-sm py-3 px-6 flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <a href="https://wa.me/2348115335063" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-green-400">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.105.546 4.083 1.5 5.808L0 24l6.335-1.48A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.51-5.17-1.4l-.37-.22-3.76.878.895-3.67-.242-.38A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            08115335063
          </a>
          <a href="tel:+2348161165693" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-yellow-400">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.5 2.18 2 2 0 012.5 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            08161165693
          </a>
          <a href="mailto:elizabethanacademyschools@gmail.com" className="flex items-center gap-2 hover:text-yellow-400 transition">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-yellow-400">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            elizabethanacademyschools@gmail.com
          </a>
        </div>

        {/* Portal buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            style={{ background: "#1E3A8A", border: "1px solid rgba(255,255,255,0.2)" }}
            className="flex items-center gap-2 px-4 py-1.5 rounded text-sm font-semibold hover:opacity-90 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Student Portal
          </Link>
          <Link
            to="/login"
            style={{ background: "#1E3A8A", border: "1px solid rgba(255,255,255,0.2)" }}
            className="flex items-center gap-2 px-4 py-1.5 rounded text-sm font-semibold hover:opacity-90 transition"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Parent Portal
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <nav
        style={{
          background: "#FFFFF0",
          borderBottom: "1px solid #CBD5E1",
          position: "relative",
          zIndex: 10,
        }}
        className="px-6 flex justify-between items-center"
        // give enough height for the overflowing logo
        // logo is 110px tall, half overlaps top bar (~44px tall), so nav needs ~66px
      >
        {/* Logo — absolutely positioned to straddle top bar and nav */}
        <div style={{ width: "130px", height: "80px", position: "relative" }}>
          <Link to="/">
            <img
              src="/logo.png"
              alt="Elizabethan Academy Logo"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                position: "absolute",
                top: "-10px",   // pulls up into the top bar
                left: "0",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))",
                zIndex: 50,
              }}
            />
          </Link>
        </div>

        {/* Brand name next to logo */}
        <Link to="/" className="flex items-center gap-2 mr-8" style={{ marginLeft: "-16px" }}>
            <p style={{ fontFamily: "Georgia, serif" }} className="font-bold text-xl leading-tight">
                <span style={{ color: "#1E3A8A" }}>Elizabethan Academy</span>
                {/* <span style={{ color: "#7B0D1E" }}>Academy</span> */}
            </p>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-semibold ml-auto py-5">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/admissions", label: "Admissions" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              style={({ isActive }) => ({
                color: isActive ? "#1E3A8A" : "#374151",
                borderBottomColor: isActive ? "#1E3A8A" : "transparent",
                borderBottomWidth: "2px",
                borderBottomStyle: "solid",
                paddingBottom: "4px",
              })}
              className="hover:text-blue-900 transition"
            >
              {label}
            </NavLink>
          ))}

          {/* Academics dropdown */}
        <div
            className="relative"
            onMouseEnter={() => setAcademicsOpen(true)}
            onMouseLeave={() => setAcademicsOpen(false)}
            >
            <Link
                to="/academics"
                style={{
                color: "#374151",
                borderBottomColor: "transparent",
                borderBottomWidth: "2px",
                borderBottomStyle: "solid",
                paddingBottom: "4px",
                }}
                className="hover:text-blue-900 flex items-center gap-1 font-semibold transition"
            >
                Academics
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Link>


            {/* Invisible bridge to prevent gap-triggered mouseLeave */}
            {academicsOpen && (
                <div style={{ position: "absolute", top: "100%", left: 0, width: "100%", height: "12px", zIndex: 49 }} />
            )}

            {academicsOpen && (
            <div
            style={{
                background: "#fff",
                borderColor: "#CBD5E1",
                position: "absolute",
                top: "calc(100% + 12px)",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 50,
            }}
            className="shadow-lg rounded-lg py-2 w-48 border"
            >
                <NavLink
                    to="/academics/nursery"
                    style={{ color: "#374151" }}
                    className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-900 text-sm transition"
                    onClick={() => setAcademicsOpen(false)}
                >
                    Nursery School
                </NavLink>
                <NavLink
                    to="/academics/primary"
                    style={{ color: "#374151" }}
                    className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-900 text-sm transition"
                    onClick={() => setAcademicsOpen(false)}
                >
                    Primary School
                </NavLink>
                <NavLink
                    to="/academics/secondary"
                    style={{ color: "#374151" }}
                    className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-900 text-sm transition"
                    onClick={() => setAcademicsOpen(false)}
                    >
                    Secondary School
                </NavLink>
            </div>
            )}
        </div>

          {[
            { to: "/gallery", label: "Gallery" },
            { to: "/news", label: "News" },
            { to: "/contact", label: "Contact Us" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                color: isActive ? "#1E3A8A" : "#374151",
                borderBottomColor: isActive ? "#1E3A8A" : "transparent",
                borderBottomWidth: "2px",
                borderBottomStyle: "solid",
                paddingBottom: "4px",
              })}
              className="hover:text-blue-900 transition"
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          style={{ color: "#1E3A8A" }}
          className="md:hidden text-2xl font-bold ml-auto"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "#F8FAFC", borderColor: "#CBD5E1" }} className="md:hidden border-t px-6 py-4 flex flex-col gap-4 text-sm font-semibold shadow-lg">
          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About Us" },
            { to: "/admissions", label: "Admissions" },
            { to: "/academics/nursery", label: "Nursery School" },
            { to: "/academics/primary", label: "Primary School" },
            { to: "/gallery", label: "Gallery" },
            { to: "/news", label: "News" },
            { to: "/contact", label: "Contact Us" },
            { to: "/login", label: "Student Portal" },
            { to: "/login", label: "Parent Portal" },
          ].map(({ to, label }) => (
            <NavLink
              key={label}
              to={to}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({ color: isActive ? "#1E3A8A" : "#374151" })}
              className="hover:text-blue-900 transition"
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}