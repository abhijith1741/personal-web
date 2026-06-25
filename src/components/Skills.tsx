"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Compass, Layers, Wrench, ShieldCheck, Star } from "lucide-react";

interface Skill {
  name: string;
  level: number; // 1-100 percentage
  years: number;
  category: "frontend" | "geospatial" | "styling" | "tools" | "languages";
}

const SKILL_CATEGORIES = [
  { id: "all", label: "All Skills", icon: null },
  { id: "frontend", label: "Frontend & State", icon: <Layers className="w-3.5 h-3.5" /> },
  { id: "geospatial", label: "Geospatial & WebGL", icon: <Compass className="w-3.5 h-3.5" /> },
  { id: "languages", label: "Languages", icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: "styling", label: "Styling & Motion", icon: <Star className="w-3.5 h-3.5" /> },
  { id: "tools", label: "Builds & PM Tools", icon: <Wrench className="w-3.5 h-3.5" /> },
];

const SKILLS: Skill[] = [
  // Frontend
  { name: "React", level: 95, years: 5, category: "frontend" },
  { name: "Next.js (App Router, Pages)", level: 90, years: 4, category: "frontend" },
  { name: "Redux Toolkit", level: 92, years: 5, category: "frontend" },
  { name: "React Redux", level: 92, years: 5, category: "frontend" },
  
  // Geospatial
  { name: "Leaflet (Core & Draw)", level: 95, years: 4, category: "geospatial" },
  { name: "MapLibre GL (WebGL)", level: 88, years: 3, category: "geospatial" },
  { name: "Leaflet Markercluster", level: 92, years: 4, category: "geospatial" },
  { name: "GeoJSON Spatial Specs", level: 90, years: 4, category: "geospatial" },
  
  // Languages
  { name: "JavaScript (ES6+)", level: 95, years: 5, category: "languages" },
  { name: "TypeScript", level: 90, years: 4, category: "languages" },
  
  // Styling
  { name: "Tailwind CSS", level: 95, years: 5, category: "styling" },
  { name: "Vanilla CSS & Variables", level: 92, years: 5, category: "styling" },
  { name: "Framer Motion", level: 85, years: 2, category: "styling" },
  { name: "Ant Design", level: 80, years: 3, category: "styling" },

  // Tools & PM
  { name: "Git & Git Submodules", level: 90, years: 5, category: "tools" },
  { name: "GitLab Workflows", level: 88, years: 4, category: "tools" },
  { name: "Webpack & Vite", level: 85, years: 4, category: "tools" },
  { name: "Jira, Trello, Redmine", level: 90, years: 4, category: "tools" },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredSkills = SKILLS.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-6 border-t border-zinc-900 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-indigo-500/10 mb-4">
            <Code2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase font-mono">
              Skills
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Technical Arsenal
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            A comprehensive mapping of technologies, languages, and spatial libraries refined through 5 years of production application delivery.
          </p>
        </div>

        {/* Categories Navbar Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                activeCategory === cat.id
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
              className="glass p-5 rounded-2xl border border-zinc-900 flex flex-col justify-between hover:border-zinc-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-sm font-semibold text-white tracking-wide">
                    {skill.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900">
                  <span>{skill.years} Yrs Exp</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5">
                  <span>Proficiency</span>
                  <span className="text-cyan-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-900/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
