import { Link } from "react-router-dom";

export default function PrimarySchool() {
  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(to bottom, rgba(10,15,40,0.75), rgba(10,15,40,0.75)), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600') center/cover no-repeat",
          minHeight: "300px",
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Primary School</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          Building strong foundational knowledge and moral character for lifelong success.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h2 style={{ color: "#1E3A8A" }} className="text-2xl font-bold mb-4">Primary Section Overview</h2>
            <p style={{ color: "#4B5563" }} className="leading-relaxed mb-6">
              Our Primary School program bridges the gap between early childhood play and the rigorous academic demands of secondary school. We focus on developing independent learners with a strong grasp of core subjects.
            </p>

            <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-4">Core Subjects</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                "Mathematics", "English Language",
                "Basic Science", "Social Studies",
                "Quantitative Reasoning", "Verbal Reasoning",
                "ICT & Coding", "Creative Arts",
              ].map((subject) => (
                <div key={subject} className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" className="w-4 h-4 flex-shrink-0">
                    <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#374151" }} className="text-sm">{subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Extracurricular Card */}
          <div
            style={{ border: "2px solid #1E3A8A", borderRadius: "12px", background: "#fff" }}
            className="p-8 h-fit"
          >
            <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-2">Extracurricular Activities</h3>
            <p style={{ color: "#4B5563" }} className="text-sm mb-5">
              We believe in holistic education. Our primary students participate in:
            </p>
            <ul className="space-y-4 mb-8">
              {[
                { label: "Music & Choir", icon: "M9 18V5l12-2v13" },
                { label: "Sports & Athletics", icon: "M13 10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-2.7 0-5.8 1.3-6 4h12c-.2-2.7-3.3-4-6-4z" },
                { label: "Chess Club", icon: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2m-4 0v4m0 0H8m4 0h4" },
                { label: "Debate & Spelling Bee", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
              ].map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.8" className="w-5 h-5 flex-shrink-0">
                    <path d={item.icon} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ color: "#374151" }}>{item.label}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/admissions"
              style={{ borderColor: "#1E3A8A", color: "#1E3A8A" }}
              className="block w-full text-center border-2 font-bold py-3 rounded hover:bg-blue-900 hover:text-white transition"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}