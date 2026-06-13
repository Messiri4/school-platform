import { Link } from "react-router-dom";

export default function Academics() {
  return (
    <div style={{ fontFamily: "Times New Roman, serif" }}>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(to bottom, rgba(10,15,40,0.75) 0%, rgba(10,15,40,0.75) 100%), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600') center/cover no-repeat",
          minHeight: "300px",
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Academics</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          A rigorous, comprehensive, and globally competitive curriculum designed to unlock every child's potential.
        </p>
      </section>

      {/* ACADEMIC PHILOSOPHY */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 style={{ color: "#1E3A8A" }} className="text-4xl font-bold mb-6">
            Our Academic Philosophy
          </h2>
          <p style={{ color: "#4B5563" }} className="text-lg max-w-3xl mx-auto mb-14">
            We blend the best of local and international curricula to provide a well-rounded education.
            Our focus is on critical thinking, practical application, and moral development.
          </p>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                level: "Nursery School",
                desc: "Early Years Foundation Stage focused on cognitive, social, and emotional development through guided play.",
                link: "/academics/nursery",
                bg: "#FFF9C4",
                iconBg: "#FFE082",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.5" className="w-12 h-12">
                    <polygon points="12,2 2,7 12,12 22,7" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="2,17 12,22 22,17" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="2,12 12,17 22,12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                level: "Primary School",
                desc: "A robust primary curriculum building strong foundations in literacy, numeracy, and basic sciences.",
                link: "/academics/primary",
                bg: "#FFF9C4",
                iconBg: "#FFE082",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.5" className="w-12 h-12">
                    <circle cx="12" cy="5" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8v4M9 21v-4a3 3 0 016 0v4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 21h12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
              {
                level: "Secondary School",
                desc: "Comprehensive JSS and SSS programs preparing students for WAEC, NECO, JAMB, and global opportunities.",
                link: "/academics/secondary",
                bg: "#0A0F28",
                iconBg: "#1E3A8A",
                icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.5" className="w-12 h-12">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                ),
            },
            ].map((program) => (
              <div
                key={program.level}
                style={{ background: program.bg, borderColor: "#FFC107" }}
                className="rounded-xl border overflow-hidden hover:shadow-lg transition"
              >
                {/* Icon area */}
                <div
                  style={{ background: program.iconBg, height: "160px" }}
                  className="w-full flex items-center justify-center"
                >
                  {program.icon}
                </div>
                <div className="p-8 text-center">
                  <h3 style={{ color: program.bg === "#0A0F28" ? "#FFC107" : "#1E3A8A" }} className="text-2xl font-bold mb-3">
                    {program.level}
                    </h3>
                    <p style={{ color: program.bg === "#0A0F28" ? "#CBD5E1" : "#4B5563" }} className="mb-6 leading-relaxed">
                    {program.desc}
                    </p>
                    <Link
                    to={program.link}
                    style={program.bg === "#0A0F28"
                        ? { borderColor: "#FFC107", color: "#FFC107" }
                        : { borderColor: "#1E3A8A", color: "#1E3A8A" }
                    }
                    className="inline-block border font-semibold px-6 py-2 rounded hover:opacity-80 transition"
                    >
                    Learn More
                    </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEACHING METHODOLOGY */}
      <section style={{ background: "#FFFDE7" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div style={{ borderRadius: "12px", overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
              alt="Students"
              className="w-full h-full object-cover"
              style={{ borderRadius: "12px" }}
            />
          </div>

          {/* Content */}
          <div>
            <h2 style={{ color: "#1E3A8A" }} className="text-3xl font-bold mb-3">
              Teaching Methodology
            </h2>
            <p style={{ color: "#4B5563" }} className="mb-6 leading-relaxed">
              Our educators employ modern, student-centered teaching methodologies that include:
            </p>
            <ul className="space-y-4 mb-8">
              {[
                { title: "Project-Based Learning", desc: "Encouraging students to solve real-world problems." },
                { title: "Technology Integration", desc: "Utilizing smart boards, coding classes, and digital libraries." },
                { title: "Continuous Assessment", desc: "Regular evaluations to track progress and provide targeted support." },
                { title: "Differentiated Instruction", desc: "Tailoring teaching to accommodate different learning styles." },
              ].map((item) => (
                <li key={item.title} className="flex gap-3 items-start">
                  <span style={{ color: "#FFC107", fontSize: "20px", lineHeight: "1.4" }}>•</span>
                  <p style={{ color: "#4B5563" }}>
                    <span style={{ color: "#1E3A8A" }} className="font-bold">{item.title}: </span>
                    {item.desc}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href="#"
              style={{ background: "#7B0D1E" }}
              className="inline-block text-white font-bold px-8 py-3 rounded hover:opacity-90 transition"
            >
              Download Academic Calendar
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}