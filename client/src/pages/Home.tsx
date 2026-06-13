import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAnnouncements } from "../api/announcements";

export default function Home() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    getAnnouncements().then(setAnnouncements);
  }, []);

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* HERO - full width with overlay */}
      <section
        style={{
          background: "linear-gradient(to right, rgba(10,15,40,0.85) 45%, rgba(10,15,40,0.3) 100%), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600') center/cover no-repeat",
          minHeight: "520px",
        }}
        className="flex items-center px-10 py-20"
      >
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Building Leaders<br />of Excellence
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Nurturing excellence from Nursery to Primary with a grounded, modern
            education that builds character, leadership, and academic confidence.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/admissions"
              style={{ background: "#7B0D1E", color: "#fff" }}
              className="text-white font-bold px-8 py-3 rounded hover:opacity-90 transition"
            >
              Apply Now
            </Link>
            <Link
              to="/about"
              style={{ border: "2px solid white", color: "white" }}
              className="font-bold px-8 py-3 rounded hover:bg-white hover:text-blue-900 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 style={{ color: "#1E3A8A", fontFamily: "Georgia, serif" }} className="text-4xl font-bold mb-4">
            Why Choose Elizabethan Academy?
          </h2>
          <p style={{ color: "#6B7280" }} className="mb-14 text-lg">
            Discover what makes our educational community unique and highly sought after by parents and students.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <path d="M12 14l9-5-9-5-9 5 9 5z"/><path d="M12 14l6.16-3.422A12.083 12.083 0 0122 21H2a12.083 12.083 0 013.84-10.422L12 14z"/>
                  </svg>
                ),
                title: "Academic Excellence",
                desc: "Rigorous curriculum designed to challenge students and prepare them for global opportunities.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                ),
                title: "Modern Facilities",
                desc: "State-of-the-art laboratories, libraries, and smart classrooms to enhance learning.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><path d="M16 3.13a4 4 0 010 7.75"/><path d="M21 21v-2a4 4 0 00-3-3.87"/>
                  </svg>
                ),
                title: "Dedicated Staff",
                desc: "Experienced and passionate educators committed to the success of every child.",
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                  </svg>
                ),
                title: "Holistic Development",
                desc: "Robust extracurricular programs in sports, arts, and leadership to build character.",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{ background: "#fff", borderColor: "#CBD5E1" }}
                className="rounded-xl p-8 border text-left hover:shadow-lg transition"
              >
                <div
                  style={{ background: "#EFF6FF", color: "#1E3A8A" }}
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                >
                  {item.icon}
                </div>
                <h3 style={{ color: "#1E3A8A", fontFamily: "Georgia, serif" }} className="font-bold text-lg mb-2">
                  {item.title}
                </h3>
                <p style={{ color: "#6B7280" }} className="text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC PROGRAMS */}
      <section style={{ background: "#FFFDE7" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <h2 style={{ color: "#1E3A8A", fontFamily: "Georgia, serif" }} className="text-4xl font-bold">
              Our Academic Programs
            </h2>
            <Link to="/academics" style={{ color: "#1E3A8A" }} className="font-semibold hover:underline flex items-center gap-1 mt-2">
              View All Programs →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                level: "Nursery School",
                desc: "A solid foundation of learning through play, exploration, and discovery.",
                link: "/academics/nursery",
                cardBg: "#FFF9C4",
                imgBg: "#FFE082",
              },
              {
                level: "Primary School",
                desc: "Fostering critical thinking, moral development, and foundational academic skills.",
                link: "/academics/primary",
                cardBg: "#FFF9C4",
                imgBg: "#FFD54F",
              },
            ].map((program) => (
              <div
                key={program.level}
                style={{ background: program.cardBg, borderColor: "#FFC107" }}
                className="rounded-xl border overflow-hidden hover:shadow-lg transition"
              >
                <div style={{ background: program.imgBg, height: "180px" }} className="w-full" />
                <div className="p-6">
                  <h3 style={{ color: "#1E3A8A", fontFamily: "Georgia, serif" }} className="text-xl font-bold mb-2">
                    {program.level}
                  </h3>
                  <p style={{ color: "#6B7280" }} className="text-sm mb-5 leading-relaxed">
                    {program.desc}
                  </p>
                  <Link
                    to={program.link}
                    style={{ borderColor: "#1E3A8A", color: "#1E3A8A" }}
                    className="border font-semibold px-5 py-2 rounded hover:bg-blue-900 hover:text-white transition text-sm inline-block"
                  >
                    Explore {program.level.split(" ")[0]}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      {announcements.length > 0 && (
        <section style={{ background: "#F8FAFC" }} className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 style={{ color: "#1E3A8A", fontFamily: "Georgia, serif" }} className="text-3xl font-bold mb-8">
              Latest Announcements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {announcements.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  style={{ background: "#fff", borderColor: "#CBD5E1" }}
                  className="border rounded-xl p-6 hover:shadow-md transition"
                >
                  <span
                    style={{ background: "#FFC107", color: "#1E3A8A" }}
                    className="text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full inline-block mb-3"
                  >
                    Announcement
                  </span>
                  <h3 style={{ color: "#1E3A8A" }} className="font-bold mb-2">{item.title}</h3>
                  <p style={{ color: "#6B7280" }} className="text-sm">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section
        style={{
          background: "linear-gradient(to right, rgba(10,15,40,0.92) 50%, rgba(30,10,10,0.85) 100%), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600') center/cover no-repeat",
          minHeight: "220px",
        }}
        className="py-16 px-10 flex items-center"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>
              Join Our Vibrant Learning Community
            </h2>
            <p className="text-gray-300">
              Admission is currently ongoing for the upcoming academic session. Secure a place for your child today.
            </p>
          </div>
          <div className="flex gap-4 flex-shrink-0 flex-wrap">
            <Link
              to="/admissions"
              className="font-bold px-8 py-3 rounded hover:opacity-90 transition"
              style={{ background: "#fff", color: "#1E3A8A" }}
            >
              Admission Process
            </Link>
            <Link
              to="/contact"
              className="font-bold px-8 py-3 rounded hover:bg-white hover:text-blue-900 transition"
              style={{ border: "2px solid white", color: "white" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}