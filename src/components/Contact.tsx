"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(result.error || "Failed to dispatch email message.");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected network error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-indigo-500/10 mb-4">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase font-mono">
              Get In Touch
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Let's Collaborate
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Interested in high-performance frontends, complex mapping modules, or building responsive client WebViews? Send a message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Contact info cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            <div className="space-y-6">
              {/* Email */}
              <div className="glass p-5 rounded-2xl border border-zinc-900 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                    Email Address
                  </span>
                  <a
                    href="mailto:abhijithlenin00@gmail.com"
                    className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors mt-1 block"
                  >
                    abhijithlenin00@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="glass p-5 rounded-2xl border border-zinc-900 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-indigo-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                    Phone Number
                  </span>
                  <a
                    href="tel:+919656425027"
                    className="text-sm font-semibold text-white hover:text-indigo-400 transition-colors mt-1 block font-mono"
                  >
                    +91 9656425027
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="glass p-5 rounded-2xl border border-zinc-900 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                    Location Address
                  </span>
                  <span className="text-sm font-semibold text-white mt-1 block leading-relaxed">
                    Fieldiva Synergy Pvt Ltd,<br />Kochi, Kerala, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social stack */}
            <div className="glass p-6 rounded-2xl border border-zinc-900 flex flex-col gap-4">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                External Profiles
              </span>
              <div className="flex gap-3">
                <a
                  href="https://github.com/abhijith1741"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-950 border border-zinc-900 hover:border-zinc-800 hover:text-white text-zinc-400 transition-colors text-xs font-semibold font-mono"
                >
                  <GithubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-2xl border border-zinc-900 relative">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center text-center p-6 rounded-2xl z-10"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4 animate-bounce" />
                <h3 className="font-outfit text-xl font-bold text-white mb-2">
                  Message Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xs leading-normal">
                  Thank you for reaching out. Abhijith will get back to you as soon as possible.
                </p>
              </motion.div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Abhijith Lenin"
                    className={`w-full text-sm py-2.5 px-4 rounded-xl bg-zinc-950 border text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors ${
                      errors.name ? "border-rose-500/50" : "border-zinc-900"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 font-mono mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@gmail.com"
                    className={`w-full text-sm py-2.5 px-4 rounded-xl bg-zinc-950 border text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors ${
                      errors.email ? "border-rose-500/50" : "border-zinc-900"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1 font-mono mt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                  Subject Title
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Inquiry regarding Next.js/Leaflet project"
                  className={`w-full text-sm py-2.5 px-4 rounded-xl bg-zinc-950 border text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors ${
                    errors.subject ? "border-rose-500/50" : "border-zinc-900"
                  }`}
                />
                {errors.subject && (
                  <span className="text-[10px] text-rose-400 flex items-center gap-1 font-mono mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.subject}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                  Message Body
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Hey Abhijith, I saw your geofencing mapping demo..."
                  className={`w-full text-sm py-3 px-4 rounded-xl bg-zinc-950 border text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition-colors resize-none ${
                    errors.message ? "border-rose-500/50" : "border-zinc-900"
                  }`}
                />
                {errors.message && (
                  <span className="text-[10px] text-rose-400 flex items-center gap-1 font-mono mt-0.5">
                    <AlertCircle className="w-3 h-3" />
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
