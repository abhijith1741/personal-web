"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Filter, Laptop, Smartphone, ShoppingBag, Globe } from "lucide-react";

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
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  category: "saas" | "ecommerce" | "mobile";
  type: "Production Platform" | "Open Source Project";
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  svgMockup?: React.ReactNode;
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");

  const projects: Project[] = [
    {
      id: "saas-core",
      title: "Fieldiva Unified SaaS Suite",
      category: "saas",
      type: "Production Platform",
      description: "Architected multiple frontend modules (Admin Panel, Business Suite) within a unified SaaS ecosystem. Built custom MapLibre spatial layers, shared-core submodule builds, and global RTL Arabic translation systems.",
      tech: ["Next.js", "React", "MapLibre GL", "Redux Toolkit", "Git Submodules", "RTL Localization"],
      svgMockup: (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 to-slate-900 flex items-center justify-center p-6 border-b border-zinc-900">
          <div className="w-full max-w-[220px] rounded bg-zinc-950 p-2.5 border border-indigo-500/10 shadow-lg font-mono text-[9px] text-zinc-500">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-2">
              <span className="text-cyan-400 font-semibold font-outfit">SaaS Admin Panel</span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-3/4 bg-zinc-900 rounded" />
              <div className="h-6 w-full bg-indigo-500/5 rounded border border-indigo-500/10 flex items-center justify-between px-1.5">
                <span className="text-[7px] text-indigo-400">Map Rendering Status</span>
                <span className="text-[7px] text-emerald-400 font-bold">60 FPS</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-7 bg-zinc-900/60 rounded p-1 border border-zinc-800">
                  <span className="block text-[6px] text-zinc-400">RTL Enabled</span>
                  <span className="text-[8px] text-white">العربية</span>
                </div>
                <div className="h-7 bg-zinc-900/60 rounded p-1 border border-zinc-800">
                  <span className="block text-[6px] text-zinc-400">Submodules</span>
                  <span className="text-[8px] text-white">100% Sync</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "dew-diamonds",
      title: "Dew Diamonds E-Commerce",
      category: "ecommerce",
      type: "Production Platform",
      description: "Developed a Next.js e-commerce application for the Dew Diamonds jewelry brand. Integrates Next.js Payload CMS for content management and Firebase for user authentication and real-time state database updates.",
      tech: ["Next.js", "Payload CMS", "Redux Toolkit", "Firebase Auth", "Tailwind CSS"],
      svgMockup: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 to-slate-900 flex items-center justify-center p-6 border-b border-zinc-900">
          <div className="w-full max-w-[220px] rounded bg-zinc-950 p-2.5 border border-purple-500/10 shadow-lg font-mono text-[9px] text-zinc-500">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-2">
              <span className="text-purple-400 font-semibold font-outfit">Dew Diamonds Store</span>
              <span className="text-[7px] text-zinc-400">E-Commerce</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-10 w-full bg-purple-500/5 rounded border border-purple-500/10 flex flex-col justify-center items-center gap-1">
                <span className="text-[12px]">💎</span>
                <span className="text-[6px] text-zinc-400">Payload CMS Dynamic Query</span>
              </div>
              <div className="h-2.5 w-1/2 bg-zinc-900 rounded" />
              <div className="h-2 w-full bg-zinc-900/40 rounded" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: "btrack",
      title: "BTrack Fitness Application",
      category: "mobile",
      type: "Open Source Project",
      description: "A cross-platform mobile application engineered with React Native, Expo, and TypeScript. Supports real-time workout tracking, exercise configuration, and heart rate progress indicators.",
      tech: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Framer Motion"],
      github: "https://github.com/abhijith1741/myfitness_app",
      image: "/images/btrack.png"
    },
    {
      id: "swiggy-clone",
      title: "Swiggy Food Ordering Portal",
      category: "saas",
      type: "Open Source Project",
      description: "A web application mirroring the Swiggy platform. Integrates the live Swiggy API, location-based food/restaurant listings, search filtration controls, and a fully reactive add-to-cart flow.",
      tech: ["React", "Redux", "Tailwind CSS", "Live REST API", "JavaScript ES6+"],
      github: "https://github.com/abhijith1741/myfitness_app",
      image: "/images/swiggy.png"
    },
    {
      id: "travel-portal",
      title: "Caxita Travel Logistics Portal",
      category: "saas",
      type: "Production Platform",
      description: "Developed Flight Results and Booking Package modules for a massive React-based travel logistics web app. Configured complex multi-filter search states, itineraries, and dynamic fare breakdowns.",
      tech: ["React.js", "Redux", "RESTful APIs", "Webpack", "Lazy Loading"],
      svgMockup: (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 to-slate-900 flex items-center justify-center p-6 border-b border-zinc-900">
          <div className="w-full max-w-[220px] rounded bg-zinc-950 p-2.5 border border-emerald-500/10 shadow-lg font-mono text-[9px] text-zinc-500">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-1.5 mb-2">
              <span className="text-emerald-400 font-semibold font-outfit">Travel Flight Filter</span>
              <span className="text-[7px] text-zinc-400">Caxita Portal</span>
            </div>
            <div className="space-y-1">
              <div className="h-2 w-full bg-zinc-900 rounded" />
              <div className="h-4 w-full bg-emerald-500/5 rounded border border-emerald-500/10 flex items-center justify-between px-1.5">
                <span className="text-[6px] text-emerald-400">Flight: COK ➔ DXB</span>
                <span className="text-[6px] text-white">Verified</span>
              </div>
              <div className="h-2 w-2/3 bg-zinc-900 rounded" />
              <div className="h-2 w-full bg-zinc-900/40 rounded" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section id="projects" className="py-24 px-6 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-indigo-500/10 mb-4">
            <FolderGit2 className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase font-mono">
              Portfolio
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Featured Projects
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            A combined view of production SaaS platforms architected in the industry and open-source applications built on the side.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All Works", icon: <Globe className="w-3.5 h-3.5" /> },
            { id: "saas", label: "SaaS & WebApps", icon: <Laptop className="w-3.5 h-3.5" /> },
            { id: "mobile", label: "Mobile Apps", icon: <Smartphone className="w-3.5 h-3.5" /> },
            { id: "ecommerce", label: "E-Commerce", icon: <ShoppingBag className="w-3.5 h-3.5" /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                filter === item.id
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/10"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden border border-zinc-900 flex flex-col justify-between group hover:border-zinc-800 transition-all shadow-md hover:shadow-xl"
              >
                {/* Visual Header */}
                <div className="h-48 w-full relative overflow-hidden bg-zinc-950">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                  ) : (
                    project.svgMockup
                  )}
                  <span className="absolute top-4 left-4 text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-800/80 text-cyan-400">
                    {project.type}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold font-outfit text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-900/60 text-zinc-500">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-900/50">
                      {project.github ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[11px] font-semibold font-mono text-zinc-400 hover:text-zinc-200 transition-colors"
                        >
                          <GithubIcon className="w-3.5 h-3.5" />
                          GitHub Repo
                        </a>
                      ) : (
                        <span className="text-[10px] font-semibold font-mono text-zinc-600">
                          Internal Core
                        </span>
                      )}

                      {project.live ? (
                        <a
                          href={project.live}
                          className="flex items-center gap-1 text-[11px] font-semibold font-mono text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      ) : (
                        <span className="text-[10px] font-mono text-zinc-500 italic">
                          Proprietary Code
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
