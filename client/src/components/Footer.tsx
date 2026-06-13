import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#0A0F28", fontFamily: "Georgia, 'Times New Roman', serif" }} className="text-white pt-16 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 items-start">

        {/* Brand + description + social */}
        <div className="self-start">
          <div className="flex items-center gap-1">
            <img
            src="/logo.png"
            alt="Elizabethan Academy Logo"
            style={{ width: "100px", height: "100px", objectFit: "contain", marginTop: "-20px" }}
            />
          </div>
          <p style={{ color: "#CBD5E1" }} className="text-sm leading-relaxed mb-6">
            Elizabethan Academy is dedicated to nurturing excellence in education, character, and leadership, empowering students to succeed in a dynamic world.
          </p>
          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              { label: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
              { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
              { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z" },
              { label: "YouTube", path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" },
            ].map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-white hover:text-blue-900 transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
                  <path d={social.path} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: "#fff" }} className="font-bold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-3 text-sm" style={{ color: "#CBD5E1" }}>
            {[
              ["About Us", "/about"],
              ["Admissions Process", "/admissions"],
              ["Latest News", "/news"],
              ["Downloads Center", "/downloads"],
              ["Photo Gallery", "/gallery"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="hover:text-white transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Portals & Access */}
        <div>
          <h4 style={{ color: "#FFF" }} className="font-bold mb-5 text-sm uppercase tracking-widest">Portals & Access</h4>
          <ul className="space-y-3 text-sm" style={{ color: "#CBD5E1" }}>
            {[
              ["Student Portal", "/login"],
              ["Parent Portal", "/login"],
              ["Staff Portal", "/login"],
              ["Admin Login", "/login"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link to={path} className="hover:text-white transition">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 style={{ color: "#FFF" }} className="font-bold mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
          <ul className="space-y-4 text-sm" style={{ color: "#CBD5E1" }}>
            <li className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7B0D1E" strokeWidth="2" className="w-4 h-4 mt-0.5 flex-shrink-0">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Okotomi, Okpanam, Asaba, Delta State</span>
            </li>
            <li className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7B0D1E" strokeWidth="2" className="w-4 h-4 mt-0.5 flex-shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.5 2.18 2 2 0 012.5 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <a href="tel:+2348115335063" className="hover:text-white transition block">08115335063</a>
                <span style={{ color: "#6B7280" }} className="text-xs">WhatsApp only</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7B0D1E" strokeWidth="2" className="w-4 h-4 mt-0.5 flex-shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.5 2.18 2 2 0 012.5 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <a href="tel:+2348161165693" className="hover:text-white transition block">08161165693</a>
                <span style={{ color: "#6B7280" }} className="text-xs">Call & WhatsApp</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="#7B0D1E" strokeWidth="2" className="w-4 h-4 mt-0.5 flex-shrink-0">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <a href="mailto:info@elizabethanacademy.edu" className="hover:text-white transition break-all">
                info@elizabethanacademy.edu
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div style={{ borderColor: "rgba(255,255,255,0.1)" }} className="border-t mt-12 pt-6 text-center text-sm" style={{ color: "#6B7280" }}>
        © {new Date().getFullYear()} Elizabethan Academy. All rights reserved.
      </div>
    </footer>
  );
}