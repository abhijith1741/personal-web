"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, useScroll } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Experience", href: "#experience" },
  { name: "GeoMap Demo", href: "#geomap" },
  { name: "Form Builder Demo", href: "#formbuilder" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      let currentSection = "home";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section top is near the top of viewport
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 glass">
        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 origin-left"
          style={{ scaleX: scrollYProgress }}
        />

        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex flex-col">
            <span className="font-outfit font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
              Abhijith Lenin
            </span>
            <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
              Sr. Frontend Developer
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-cyan-400 ${
                    isActive ? "text-cyan-400" : "text-zinc-400"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions Stack */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/Abhijith_Lenin_Resume.pdf"
              download
              className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all text-zinc-300 hover:text-white"
            >
              Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1 text-xs font-semibold px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white"
            >
              Get in Touch
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-16 left-0 w-full glass border-t border-zinc-900 px-6 py-6 flex flex-col gap-4 shadow-xl"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-semibold py-2 border-b border-zinc-900/50 transition-colors ${
                    isActive ? "text-cyan-400" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="mt-2 flex flex-col gap-2">
              <a
                href="/Abhijith_Lenin_Resume.pdf"
                download
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 font-semibold text-sm transition-all"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </header>
    </>
  );
}
