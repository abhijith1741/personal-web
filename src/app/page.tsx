import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import InteractiveMap from "@/components/InteractiveMap";
import FormBuilderDemo from "@/components/FormBuilderDemo";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { ChevronUp } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Layout Stack */}
      <main className="flex-1 flex flex-col w-full">
        {/* Hero Section */}
        <Hero />

        {/* Work Experience Section */}
        <Timeline />

        {/* Dynamic Mapping Playground */}
        <InteractiveMap />

        {/* Form Builder Playground */}
        <FormBuilderDemo />

        {/* Skills Metrics Section */}
        <Skills />

        {/* Projects Showcase */}
        <Projects />

        {/* Contact and Social Integrations */}
        <Contact />
      </main>

      {/* Footer Section */}
      <footer className="w-full py-8 px-6 bg-zinc-950 border-t border-zinc-900 text-center text-xs text-zinc-500 font-mono flex flex-col sm:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
        <span>
          © {new Date().getFullYear()} Abhijith Lenin. All rights reserved.
        </span>
        <div className="flex items-center gap-1.5">
          <span>Engineered with Next.js & Tailwind CSS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <a
            href="#home"
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold"
          >
            Back to Top
            <ChevronUp className="w-3 h-3" />
          </a>
        </div>
      </footer>
    </>
  );
}
