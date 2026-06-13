import { Link } from "react-router-dom";

export default function NurserySchool() {
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
        <h1 className="text-5xl font-bold text-white mb-4">Nursery School</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          A safe, nurturing, and stimulating environment for early childhood development.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h2 style={{ color: "#1E3A8A" }} className="text-2xl font-bold mb-4">Early Years Overview</h2>
            <p style={{ color: "#4B5563" }} className="leading-relaxed mb-6">
              The first few years of a child's life are crucial for cognitive and emotional development. Our Nursery section is designed to provide a warm, home-like atmosphere where children feel safe to explore, learn, and grow.
            </p>

            <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-3">Our Approach</h3>
            <ul className="space-y-3 mb-6">
              {[
                { title: "Play-Based Learning", desc: "Structured and unstructured play to develop motor skills and creativity." },
                { title: "Phonics & Numeracy", desc: "Early introduction to reading, sounds, and numbers." },
                { title: "Social Skills", desc: "Teaching sharing, empathy, and effective communication." },
                { title: "Arts & Crafts", desc: "Creative expression through drawing, painting, and crafts." },
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

          {/* Right — Classes Card */}
          <div
            style={{ border: "2px solid #7B0D1E", borderRadius: "12px", background: "#fff" }}
            className="p-8 h-fit"
          >
            <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-5">Classes Offered</h3>
            <ul className="space-y-4 mb-8">
              {[
                "Creche (3 Months - 1.5 Years)",
                "Pre-Nursery (1.5 - 3 Years)",
                "Nursery 1 (3 - 4 Years)",
                "Nursery 2 (4 - 5 Years)",
              ].map((cls) => (
                <li key={cls} className="flex items-center gap-3">
                  <div style={{ background: "#7B0D1E" }} className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-3 h-3">
                      <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span style={{ color: "#374151" }}>{cls}</span>
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