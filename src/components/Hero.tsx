"use client";

import { motion } from "framer-motion";
import { ArrowRight, Map, Settings, Compass, Users, FileDown } from "lucide-react";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  const statItems = [
    { icon: <Compass className="w-5 h-5 text-cyan-400" />, label: "Experience", value: "5 Years" },
    { icon: <Map className="w-5 h-5 text-indigo-400" />, label: "Map Rendering", value: "60 FPS" },
    { icon: <Settings className="w-5 h-5 text-purple-400" />, label: "Form Template Time", value: "-70%" },
    { icon: <Users className="w-5 h-5 text-emerald-400" />, label: "Team Leadership", value: "5 Devs" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/20 via-zinc-950 to-zinc-950"
    >
      {/* Decorative background glow circles */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle, #a1a1aa 1px, transparent 1px)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Intro text */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex self-center lg:self-start items-center gap-2 px-3.5 py-1.5 rounded-full glass border-indigo-500/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold text-zinc-300 tracking-wide uppercase">
              Senior Frontend Developer
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-outfit text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Architecting{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent glow-text-indigo">
              High-Performance
            </span>{" "}
            Web Ecosystems
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            I am <strong className="text-zinc-200">Abhijith Lenin</strong>. I design and build highly scalable, interactive multi-module SaaS platforms, advanced custom geospatial interfaces, and real-time skip-logic engines. Specializing in React, Next.js, Redux, Leaflet, and MapLibre GL.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
          >
            <a
              href="#geomap"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 font-semibold text-white transition-all shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/20"
            >
              Explore Interactive Map
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/Abhijith_Lenin_Resume.pdf"
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-zinc-900 transition-all font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <FileDown className="w-4 h-4" />
              Download Resume
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:bg-zinc-900 transition-all font-semibold"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Quick tech tags */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-2.5">
            {["React", "Next.js", "Redux Toolkit", "Leaflet", "MapLibre GL", "TypeScript", "Framer Motion"].map((tech) => (
              <span key={tech} className="text-xs font-mono px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800/80 text-zinc-400">
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Dynamic visual cards/stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" as const, stiffness: 80, damping: 15, delay: 0.4 }}
          className="lg:col-span-5 grid grid-cols-2 gap-4 relative"
        >
          {/* Card outline glow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 blur-2xl -z-10 pointer-events-none" />

          {statItems.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
              className="glass p-5 rounded-2xl flex flex-col justify-between min-h-[140px] border border-zinc-900 hover:border-zinc-800 transition-colors"
            >
              <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 self-start">
                {stat.icon}
              </div>
              <div className="mt-4">
                <span className="block text-2xl sm:text-3xl font-bold font-outfit text-white tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-zinc-400 font-medium">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
