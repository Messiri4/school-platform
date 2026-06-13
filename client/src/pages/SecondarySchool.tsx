import { Link } from "react-router-dom";

export default function SecondarySchool() {
  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(to bottom, rgba(10,15,40,0.75), rgba(10,15,40,0.75)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600') center/cover no-repeat",
          minHeight: "300px",
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Secondary School</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          Empowering teenagers with the knowledge, skills, and character to excel globally.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h2 style={{ color: "#1E3A8A" }} className="text-2xl font-bold mb-4">Secondary Education Overview</h2>
            <p style={{ color: "#4B5563" }} className="leading-relaxed mb-6">
              The Secondary section is divided into Junior Secondary (JSS) and Senior Secondary (SSS). We offer a comprehensive curriculum that prepares students for national and international examinations including WAEC, NECO, and JAMB.
            </p>

            <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-3">Senior Secondary Tracks</h3>
            <p style={{ color: "#4B5563" }} className="mb-4">
              Students in the Senior Secondary section are guided into specialized tracks based on their aptitude and career aspirations:
            </p>
            <ul className="space-y-3 mb-6">
              {[
                { title: "Science Track", desc: "Physics, Chemistry, Biology, Further Mathematics." },
                { title: "Arts Track", desc: "Literature, Government, History, Languages." },
                { title: "Commercial/Social Sciences", desc: "Economics, Accounting, Commerce." },
              ].map((item) => (
                <li key={item.title} className="flex gap-3 items-start">
                  <span style={{ color: "#FFC107", fontSize: "20px" }}>•</span>
                  <p style={{ color: "#4B5563" }}>
                    <span style={{ color: "#1E3A8A" }} className="font-bold">{item.title}: </span>
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Leadership Card */}
          <div
            style={{ border: "2px solid #7B0D1E", borderRadius: "12px", background: "#fff" }}
            className="p-8 h-fit"
          >
            <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-2">Leadership & Development</h3>
            <p style={{ color: "#4B5563" }} className="text-sm mb-5">
              We focus heavily on producing leaders. Secondary students engage in:
            </p>
            <ul className="space-y-4 mb-8">
              {[
                { label: "Prefectship & Student Council", icon: "M12 2a5 5 0 015 5v1a5 5 0 01-10 0V7a5 5 0 015-5zM3 21a9 9 0 0118 0" },
                { label: "Model United Nations (MUN)", icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
                { label: "Robotics & STEM Clubs", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" },
                { label: "Community Service Projects", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#7B0D1E" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0">
                    <path d={item.icon} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#374151" }}>{item.label}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/admissions"
              style={{ borderColor: "#7B0D1E", color: "#7B0D1E" }}
              className="block w-full text-center border-2 font-bold py-3 rounded hover:bg-red-900 hover:text-white transition"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}