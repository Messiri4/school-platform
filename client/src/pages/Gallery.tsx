import { useState } from "react";

const galleryItems = [
  {
    id: 1,
    title: "School Facade",
    category: "Campus",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
  },
  {
    id: 2,
    title: "Classroom Activities",
    category: "Academic",
    img: "",
  },
  {
    id: 3,
    title: "Science Laboratory",
    category: "Facilities",
    img: "",
  },
  {
    id: 4,
    title: "Inter-House Sports",
    category: "Sports",
    img: "",
  },
  {
    id: 5,
    title: "Cultural Day",
    category: "Events",
    img: "",
  },
  {
    id: 6,
    title: "Graduation Ceremony",
    category: "Events",
    img: "",
  },
  {
    id: 7,
    title: "Library",
    category: "Facilities",
    img: "",
  },
  {
    id: 8,
    title: "Sports Day",
    category: "Sports",
    img: "",
  },
];

const categories = ["All", "Campus", "Academic", "Facilities", "Sports", "Events"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

  const filtered = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

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
        <h1 className="text-5xl font-bold text-white mb-4">Photo Gallery</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          A glimpse into life at Elizabethan Academy.
        </p>
      </section>

      {/* FILTER TABS */}
      <section style={{ background: "#F8FAFC" }} className="py-10 px-6">
        <div className="max-w-6xl mx-auto">
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

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{ background: "#fff", borderColor: "#CBD5E1", cursor: item.img ? "pointer" : "default" }}
                className="rounded-xl border overflow-hidden hover:shadow-lg transition"
                onClick={() => item.img && setLightbox({ img: item.img, title: item.title })}
              >
                {/* Image or placeholder */}
                {item.img ? (
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full object-cover"
                    style={{ height: "200px" }}
                  />
                ) : (
                  <div
                    style={{ background: "#FFFDE7", height: "200px" }}
                    className="w-full flex items-center justify-center"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" className="w-12 h-12">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="8.5" cy="8.5" r="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                <div className="p-4">
                  <p style={{ color: "#1E3A8A" }} className="font-bold">{item.title}</p>
                  <span
                    style={{ background: "#EFF6FF", color: "#1E3A8A" }}
                    className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block"
                  >
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setLightbox(null)}
        >
          <div
            style={{ background: "#fff", borderRadius: "12px", maxWidth: "800px", width: "100%" }}
            className="overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={lightbox.img} alt={lightbox.title} className="w-full object-cover" style={{ maxHeight: "500px" }} />
            <div className="p-4 flex justify-between items-center">
              <p style={{ color: "#1E3A8A" }} className="font-bold text-lg">{lightbox.title}</p>
              <button
                onClick={() => setLightbox(null)}
                style={{ color: "#7B0D1E" }}
                className="font-bold text-xl hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}