import { useState } from "react";
import { Link } from "react-router-dom";

export default function Admissions() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    applyingFor: "",
    parentName: "",
    phone: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>

      {/* HERO */}
      <section
        style={{
          background: "linear-gradient(to bottom, rgba(10,15,40,0.75) 0%, rgba(10,15,40,0.75) 100%), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600') center/cover no-repeat",
          minHeight: "300px",
        }}
        className="flex flex-col items-center justify-center text-center px-6 py-20"
      >
        <h1 className="text-5xl font-bold text-white mb-4">Admissions</h1>
        <p style={{ color: "#CBD5E1" }} className="text-lg max-w-2xl">
          Join the Elizabethan Academy family. Start your child's journey to excellence today.
        </p>
      </section>

      {/* PROCESS + REQUIREMENTS */}
      <section style={{ background: "#F8FAFC" }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Admission Process */}
          <div>
            <h2 style={{ color: "#1E3A8A" }} className="text-3xl font-bold mb-6">Admission Process</h2>
            <ol className="space-y-5">
              {[
                { title: "Purchase Application Form", desc: "Forms can be obtained from the school administrative office or filled out online below." },
                { title: "Submit Requirements", desc: "Provide birth certificate, previous academic records, and two passport photographs." },
                { title: "Entrance Examination", desc: "Candidates for primary sections will undergo a standardized entrance test." },
                { title: "Interview", desc: "Successful candidates and their parents will be invited for a brief interactive session." },
                { title: "Offer of Admission", desc: "An official admission letter will be issued upon successful completion of the process." },
              ].map((step, i) => (
                <li key={i} className="flex gap-4">
                  <div
                    style={{ background: "#1E3A8A", minWidth: "28px", height: "28px" }}
                    className="rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5"
                  >
                    {i + 1}
                  </div>
                  <p style={{ color: "#4B5563" }}>
                    <span style={{ color: "#1E3A8A" }} className="font-bold">{step.title}: </span>
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>
            <Link
              to="#apply"
              style={{ background: "#7B0D1E", color: "#fff" }}
              className="inline-block mt-8 text-white font-bold px-8 py-3 rounded hover:opacity-90 transition"
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" })}
            >
              Apply Online Now
            </Link>
          </div>

          {/* Entry Requirements + Fees */}
          <div className="space-y-6">
            <div>
              <h2 style={{ color: "#1E3A8A" }} className="text-3xl font-bold mb-6">Entry Requirements</h2>
              <ul className="space-y-3">
                {[
                  { level: "Nursery", desc: "Minimum age of 2 years by September of the admission year." },
                  { level: "Primary", desc: "Minimum age of 5 years. Entrance exam in Numeracy and Literacy." },
                ].map((req) => (
                  <li key={req.level} className="flex gap-2" style={{ color: "#4B5563" }}>
                    <span style={{ color: "#FFC107" }} className="font-bold text-lg leading-tight">•</span>
                    <p>
                      <span style={{ color: "#1E3A8A" }} className="font-bold">{req.level}: </span>
                      {req.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* School Fees Card */}
            <div style={{ background: "#FFFDE7", borderColor: "#FFC107" }} className="rounded-xl border p-6">
              <h3 style={{ color: "#1E3A8A" }} className="text-xl font-bold mb-3">School Fees Information</h3>
              <p style={{ color: "#4B5563" }} className="leading-relaxed mb-4">
                Our fee structure is competitive and offers excellent value for the quality of education provided. For a detailed breakdown, please contact the admissions office or download the fee schedule.
              </p>
              <Link
                to="/contact"
                style={{ borderColor: "#1E3A8A", color: "#1E3A8A" }}
                className="inline-block border font-semibold px-5 py-2 rounded hover:bg-blue-900 hover:text-white transition text-sm"
              >
                Contact Finance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ONLINE APPLICATION FORM */}
      <section id="apply" style={{ background: "#FFF9CC" }} className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ color: "#1E3A8A" }} className="text-4xl font-bold text-center mb-3">
            Online Application Form
          </h2>
          <p style={{ color: "#6B7280" }} className="text-center mb-10">
            Fill out the form below to begin the application process. Our admissions team will contact you shortly.
          </p>

          {submitted ? (
            <div style={{ background: "#10B981", color: "white" }} className="rounded-xl p-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-bold mb-2">Application Submitted!</h3>
              <p>Thank you! Our admissions team will contact you shortly.</p>
            </div>
          ) : (
            <div style={{ background: "#fff", borderColor: "#CBD5E1" }} className="rounded-2xl border p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Child Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                      Child's First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      style={{ borderColor: "#CBD5E1" }}
                      className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                  <div>
                    <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                      Child's Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      style={{ borderColor: "#CBD5E1" }}
                      className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                </div>

                {/* Applying For */}
                <div>
                  <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                    Applying For (Class)
                  </label>
                  <select
                    required
                    value={form.applyingFor}
                    onChange={(e) => setForm({ ...form, applyingFor: e.target.value })}
                    style={{ borderColor: "#CBD5E1" }}
                    className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 bg-white"
                  >
                    <option value="">Select a Class...</option>
                    <optgroup label="Nursery">
                      <option>Nursery 1</option>
                      <option>Nursery 2</option>
                    </optgroup>
                    <optgroup label="Primary">
                      <option>Primary 1</option>
                      <option>Primary 2</option>
                      <option>Primary 3</option>
                      <option>Primary 4</option>
                      <option>Primary 5</option>
                      <option>Primary 6</option>
                    </optgroup>
                  </select>
                </div>

                {/* Parent + Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ color: "#374151" }} className="block text-sm font-semibold mb-2">
                      Parent/Guardian Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.parentName}
                      onChange={(e) => setForm({ ...form, parentName: e.target.value })}
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
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={{ borderColor: "#CBD5E1" }}
                      className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>
                </div>

                {/* Email */}
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

                {/* Submit */}
                <button
                  type="submit"
                  style={{ background: "#7B0D1E", color: "#fff" }}
                  className="w-full text-white font-bold py-4 rounded-lg hover:opacity-90 transition text-base"
                >
                  Submit Application
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}