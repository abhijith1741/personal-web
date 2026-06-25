"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Link as LinkIcon } from "lucide-react";

interface ExperienceItem {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "fieldiva",
    company: "Fieldiva Synergy Pvt Ltd",
    location: "Kochi, Kerala",
    role: "Senior Frontend Developer",
    period: "March 2025 - Pursuing",
    bullets: [
      "Architected and single-handedly developed multiple frontend modules within a unified SaaS ecosystem including admin panel, business suite, and mobile view application.",
      "Built Dynamic WebViews for Android/iOS integration with responsive, touch-optimized, offline-capable layouts delivering native-like performance.",
      "Engineered Next.js micro-sites using SSR and SSG strategies to optimize page load performance, SEO indexability, and caching efficiency.",
      "Managed a Shared-Core Git Submodule Architecture ensuring 100% dependency synchronization across recursive submodules and independent build configurations.",
      "Optimized map rendering via GPU-Accelerated Vector Tiles using MapLibre GL and Leaflet, reducing DOM nodes by 80% and maintaining 60fps with thousands of active markers.",
      "Built complex Leaflet spatial editing layers for real-time geofence validation, asset location tracking, and overlapping zone rule computation.",
      "Engineered a High-Performance Dynamic Form Builder supporting nested fields, drag-and-drop, and matrix inputs — reducing template build time by 70%.",
      "Designed an Advanced Skip-Logic Engine with nested logical operators (AND, OR, NOR, IN, NIN) for real-time dynamic field visibility and validation.",
      "Implemented Global LTR/RTL Localization enabling full Arabic right-to-left layout support across dynamic form configurations.",
      "Built Dynamic Data-Prefill mechanics using exceljs and SheetJS for spreadsheet parsing, dynamic form prefilling, and high-fidelity import/export.",
      "Integrated Advanced Media Capture Controls with customizable watermarks, dynamic timestamps, and strict GPS accuracy threshold validations."
    ],
    tech: ["React", "Next.js", "Leaflet", "MapLibre GL", "TypeScript", "Redux Toolkit", "Git Submodules", "SheetJS", "exceljs", "RTL Localization"]
  },
  {
    id: "jobin",
    company: "Jobin and Jismi",
    location: "Thrissur, Kerala",
    role: "Senior Frontend Developer",
    period: "Nov 2024 - Feb 2025",
    bullets: [
      "Developed and maintained a Next.js e-commerce platform for Dew Diamonds, a jewelry brand, integrating Redux Toolkit for global state management.",
      "Implemented Firebase as the backend solution for real-time data sync, user authentication, and cloud storage.",
      "Gained hands-on experience with Next.js Payload CMS for scalable content management and dynamic data rendering."
    ],
    tech: ["Next.js", "Payload CMS", "Redux Toolkit", "Firebase Auth", "Cloud Storage", "Tailwind CSS"]
  },
  {
    id: "caxita",
    company: "Caxita Tech Solutions Pvt Ltd",
    location: "Kochi, Kerala",
    role: "React JS Developer",
    period: "Jun 2024 - Oct 2024",
    bullets: [
      "Developed and maintained multiple concurrent modules — Hotel, Flight, and Package sections — within a large-scale Laravel and React-based travel platform.",
      "Engineered the Flight Result Module with complex search filters, real-time availability display, and dynamic fare breakdowns.",
      "Built the Packages Module featuring detailed itinerary pages, enquiry submission flows, and dynamic pricing displays.",
      "Implemented performance optimizations including lazy loading, code splitting, and API response caching — improving page load speed and user experience.",
      "Integrated RESTful APIs across modules and collaborated with cross-functional teams maintaining coding standards and best practices."
    ],
    tech: ["React.js", "Redux", "RESTful APIs", "Webpack", "Code Splitting", "Lazy Loading", "Laravel Backend"]
  },
  {
    id: "createnlrn",
    company: "Createnlrn Pvt Ltd",
    location: "Kochi, Kerala",
    role: "Software Engineer",
    period: "Oct 2021 - Mar 2023",
    bullets: [
      "Developed and managed a dynamic web application, implementing new features and client requirements end-to-end.",
      "Led a team of 5 developers in delivering a client Android application from planning through Google Play Store submission.",
      "Managed Git and GitLab workflows for collaborative development, code reviews, and version control.",
      "Contributed to both UI design and frontend development ensuring adherence to best practices and project timelines."
    ],
    tech: ["JavaScript", "HTML5/CSS3", "GitLab Workflows", "Android Integration", "Team Leadership", "UI Design"]
  }
];

export default function Timeline() {
  const [expandedId, setExpandedId] = useState<string | null>("fieldiva");

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="experience" className="py-24 px-6 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-indigo-500/10 mb-4">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase font-mono">
              Milestones
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Professional Experience
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Around 5 years of experience delivering highly responsive frontends, modular architectures, and scalable travel, mapping, and e-commerce platforms.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-zinc-900 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCES.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const isLatest = index === 0;

            return (
              <div key={exp.id} className="relative">
                {/* Timeline node marker */}
                <span className={`absolute -left-[31px] sm:-left-[47px] top-1.5 flex items-center justify-center w-5 h-5 rounded-full border ${
                  isLatest
                    ? "bg-cyan-500/10 border-cyan-500 text-cyan-400" 
                    : "bg-zinc-900 border-zinc-800 text-zinc-500"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isLatest ? "bg-cyan-400 animate-pulse" : "bg-zinc-600"}`} />
                </span>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`glass rounded-2xl p-6 border transition-all cursor-pointer ${
                    isExpanded 
                      ? "border-indigo-500/20 bg-zinc-900/30 shadow-lg" 
                      : "border-zinc-900 hover:border-zinc-800/80 bg-zinc-900/10"
                  }`}
                  onClick={() => toggleExpand(exp.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold font-outfit text-white">
                          {exp.role}
                        </h3>
                        {isLatest && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-cyan-400 font-outfit mt-0.5 block">
                        {exp.company}
                      </span>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5 text-zinc-400 font-mono text-xs">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Tech badging */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {exp.tech.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Bullet accomplishments */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-zinc-900/60 mt-6">
                          <ul className="space-y-3.5">
                            {exp.bullets.map((bullet, bIdx) => (
                              <li key={bIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-zinc-400 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand indicators */}
                  <div className="flex justify-center mt-4 pt-3 border-t border-zinc-900/30">
                    <button className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase font-mono">
                      {isExpanded ? (
                        <>
                          Collapse details
                          <ChevronUp className="w-3 h-3" />
                        </>
                      ) : (
                        <>
                          Expand details
                          <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
