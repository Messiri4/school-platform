import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          We'd love to hear from you. Get in touch with us for inquiries, admissions, or feedback.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* LEFT — Contact Form */}
          <div>
            <h2 style={{ color: "#1E3A8A" }} className="text-2xl font-bold mb-2">Get In Touch</h2>
            <p style={{ color: "#4B5563" }} className="mb-6">
              Fill out the form below and our administrative team will get back to you as soon as possible.
            </p>

            {submitted ? (
              <div style={{ background: "#10B981", color: "white" }} className="rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <div style={{ background: "#fff", borderColor: "#CBD5E1" }} className="rounded-2xl border p-8 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={{ borderColor: "#CBD5E1" }}
                      className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  <div>
                    <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={{ borderColor: "#CBD5E1" }}
                      className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  <div>
                    <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{ borderColor: "#CBD5E1" }}
                      className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  <div>
                    <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ borderColor: "#CBD5E1" }}
                      className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ background: "#7B0D1E" }}
                    className="w-full text-white font-bold py-4 rounded-lg hover:opacity-90 transition text-base"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT — Contact Info + Map */}
          <div className="space-y-8">
            <div>
              <h2 style={{ color: "#1E3A8A" }} className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-5">
                {[
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    label: "School Address",
                    value: "Okotomi, Okpanam, Asaba, Delta State.",
                    href: null,
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      </svg>
                    ),
                    label: "WhatsApp Only",
                    value: "08115335063",
                    href: "https://wa.me/2348115335063",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.5 2.18 2 2 0 012.5 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    label: "Call & WhatsApp",
                    value: "08161165693",
                    href: "tel:+2348161165693",
                  },
                  {
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    label: "Email Address",
                    value: "elizabethanacademyschools@gmail.com",
                    href: "mailto:elizabethanacademyschools@gmail.com",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      style={{ background: "#7B0D1E", minWidth: "44px", height: "44px" }}
                      className="rounded-full flex items-center justify-center text-white flex-shrink-0"
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ color: "#1E3A8A" }} className="font-bold">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ color: "#4B5563" }} className="hover:text-blue-900 transition text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ color: "#4B5563" }} className="text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div>
              <h2 style={{ color: "#1E3A8A" }} className="text-2xl font-bold mb-4">Locate Us</h2>
              <div
                style={{ background: "#FFFDE7", borderColor: "#CBD5E1", height: "280px" }}
                className="rounded-xl border flex flex-col items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="1.5" className="w-14 h-14">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p style={{ color: "#9CA3AF" }} className="text-sm">Google Maps Integration</p>
                <a
                  href="https://maps.google.com/?q=Okotomi,Okpanam,Asaba,Delta+State"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "#1E3A8A", borderColor: "#1E3A8A" }}
                  className="border text-sm font-semibold px-4 py-2 rounded hover:bg-blue-900 hover:text-white transition"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}