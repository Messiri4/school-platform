export default function About() {
  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* HERO BANNER */}
      <section
        style={{
          background: "linear-gradient(to bottom, rgba(10,15,40,0.75) 0%, rgba(10,15,40,0.75) 100%), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600') center/cover no-repeat",
          minHeight: "300px",
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <h1 className="text-5xl font-bold text-white mb-4">About Us</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          Discover our rich history, vision, and the core values that drive our commitment to excellence.
        </p>
      </section>

      {/* OUR HISTORY */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 style={{ color: "#1E3A8A" }} className="text-3xl font-bold mb-4">Our History</h2>
            <p style={{ color: "#4B5563" }} className="leading-relaxed mb-4">
              Founded with a vision to revolutionize primary education, Elizabethan Academy has grown from a humble beginning into a premier institution. Over the years, we have nurtured thousands of students who have gone on to achieve excellence in various fields globally.
            </p>
            <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-3 mt-8">Message from the Principal</h3>
            <p style={{ color: "#4B5563" }} className="leading-relaxed italic">
              "At Elizabethan Academy, we believe that every child is a genius waiting to be discovered. Our mandate is to provide the perfect environment — academic, moral, and social — for that genius to flourish."
            </p>
          </div>

          {/* Image placeholder — replace with real photo */}
          <div
            style={{ background: "#CBD5E1", borderRadius: "12px", minHeight: "380px" }}
            className="w-full overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800"
              alt="Elizabethan Academy students"
              className="w-full h-full object-cover"
              style={{ borderRadius: "12px" }}
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ background: "#FFFDE7" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ color: "#1E3A8A" }} className="text-4xl font-bold text-center mb-12">
            Mission & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div style={{ background: "#fff", borderColor: "#CBD5E1" }} className="rounded-2xl border p-8 hover:shadow-lg transition">
              <div style={{ background: "#EFF6FF" }} className="w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.8" className="w-7 h-7">
                  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-3">Our Mission</h3>
              <p style={{ color: "#4B5563" }} className="leading-relaxed">
                To provide qualitative education that equips students with the knowledge, skills, and moral fortitude required to navigate and lead in a rapidly changing world.
              </p>
            </div>

            {/* Vision */}
            <div style={{ background: "#fff", borderColor: "#CBD5E1" }} className="rounded-2xl border p-8 hover:shadow-lg transition">
              <div style={{ background: "#EFF6FF" }} className="w-14 h-14 rounded-xl flex items-center justify-center mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.8" className="w-7 h-7">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-3">Our Vision</h3>
              <p style={{ color: "#4B5563" }} className="leading-relaxed">
                To be the foremost educational institution in Africa, universally recognized for nurturing global leaders and innovators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 style={{ color: "#1E3A8A" }} className="text-4xl font-bold text-center mb-12">
            Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Excellence",
                desc: "We strive for the highest standards in all our endeavors.",
                icon: (
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
                ),
              },
              {
                title: "Integrity",
                desc: "We uphold honesty, transparency, and strong moral principles.",
                icon: (
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                ),
              },
              {
                title: "Innovation",
                desc: "We encourage creative thinking and problem-solving.",
                icon: (
                  <>
                    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
                  </>
                ),
              },
              {
                title: "Discipline",
                desc: "We foster self-control and a strong sense of responsibility.",
                icon: (
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round"/>
                ),
              },
            ].map((value) => (
              <div
                key={value.title}
                style={{ background: "#fff", borderColor: "#CBD5E1" }}
                className="rounded-2xl border p-8 text-center hover:shadow-lg transition"
              >
                <div style={{ background: "#EFF6FF" }} className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 mx-auto">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="1.8" className="w-7 h-7">
                    {value.icon}
                  </svg>
                </div>
                <h3 style={{ color: "#1E3A8A" }} className="text-lg font-bold mb-2">{value.title}</h3>
                <p style={{ color: "#4B5563" }} className="text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: "linear-gradient(to right, rgba(10,15,40,0.92) 50%, rgba(30,10,10,0.85) 100%), url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600') center/cover no-repeat",
        }}
        className="py-16 px-10"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Be Part of Our Story</h2>
            <p style={{ color: "#CBD5E1" }}>Join a community that is shaping the leaders of tomorrow.</p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <a
              href="/admissions"
              style={{ background: "#7B0D1E", color: "#fff" }}
              className="font-bold px-8 py-3 rounded hover:opacity-90 transition"
            >
              Apply Now
            </a>
            <a
              href="/contact"
              style={{ border: "2px solid white", color: "white" }}
              className="font-bold px-8 py-3 rounded hover:bg-white hover:text-blue-900 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}