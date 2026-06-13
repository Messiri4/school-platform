import { useState } from "react";

const newsItems = [
  {
    id: 1,
    category: "Announcement",
    categoryColor: "#7B0D1E",
    date: "August 15, 2026",
    title: "Resumption for the 2026/2027 Academic Session",
    content: "Please be informed that the school will officially resume for the First Term of the 2026/2027 Academic Session on Monday, September 7, 2026. All boarding students are expected to return to the hostels on Sunday, September 6.",
  },
  {
    id: 2,
    category: "Event",
    categoryColor: "#FFC107",
    date: "October 10, 2026",
    title: "Annual Inter-House Sports Competition",
    content: "We are excited to announce our upcoming Annual Inter-House Sports Competition. Parents, guardians, and well-wishers are cordially invited to cheer our students as they compete in various track and field events.",
  },
  {
    id: 3,
    category: "Achievement",
    categoryColor: "#7B0D1E",
    date: "July 20, 2026",
    title: "Outstanding WAEC Results 2026",
    content: "Congratulations to the class of 2026! We are proud to announce a 98% distinction rate in Mathematics and English Language in the recently released WAEC examinations. Kudos to our dedicated teachers and hardworking students.",
  },
  {
    id: 4,
    category: "Event",
    categoryColor: "#FFC107",
    date: "November 5, 2026",
    title: "Annual Prize Giving Day & Graduation Ceremony",
    content: "Parents and guardians are invited to our Annual Prize Giving Day and Graduation Ceremony. The event will celebrate the achievements of our students across all academic and extracurricular areas.",
  },
  {
    id: 5,
    category: "Announcement",
    categoryColor: "#7B0D1E",
    date: "June 1, 2026",
    title: "Admission is Now Open for 2026/2027",
    content: "We are pleased to announce that admissions are now open for the 2026/2027 academic session. Interested parents should visit the school or fill out the online application form on our website.",
  },
  {
    id: 6,
    category: "Achievement",
    categoryColor: "#7B0D1E",
    date: "March 12, 2026",
    title: "Students Win Regional Science Competition",
    content: "Three of our Primary 6 students won first place at the Regional Science and Technology Competition held in Asaba. The students impressed judges with their solar-powered water purification project.",
  },
];

const categories = ["All", "Announcement", "Event", "Achievement"];

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? newsItems
    : newsItems.filter((item) => item.category === activeCategory);

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
        <h1 className="text-5xl font-bold text-white mb-4">News & Events</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          Stay updated with the latest announcements, events, and milestones at Elizabethan Academy.
        </p>
      </section>

      {/* NEWS LIST */}
      <section style={{ background: "#FFFDE7" }} className="py-16 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? "#1E3A8A" : "#fff",
                  color: activeCategory === cat ? "#fff" : "#374151",
                  borderColor: activeCategory === cat ? "#1E3A8A" : "#CBD5E1",
                }}
                className="px-5 py-2 rounded-full border text-sm font-semibold hover:opacity-90 transition"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News cards */}
          <div className="space-y-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{ background: "#fff", borderColor: "#CBD5E1" }}
                className="rounded-xl border p-8 hover:shadow-md transition"
              >
                {/* Tag + Date row */}
                <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                  <span
                    style={{ background: item.categoryColor, color: "#fff" }}
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded"
                  >
                    {item.category}
                  </span>
                  <div className="flex items-center gap-2" style={{ color: "#6B7280" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm">{item.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-3">
                  {item.title}
                </h2>

                {/* Content */}
                <p style={{ color: "#4B5563" }} className="leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p style={{ color: "#6B7280" }} className="text-lg">No items in this category yet.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}