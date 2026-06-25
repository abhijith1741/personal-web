"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Eye, Code, Layers, CheckCircle2 } from "lucide-react";

// Types for field definition
interface FormField {
  id: string;
  label: string;
  type: "select" | "checkbox" | "slider" | "text";
  options?: string[];
  placeholder?: string;
  min?: number;
  max?: number;
  unit?: string;
  defaultValue: any;
  // Skip logic rules: field is visible if this rule matches
  visibleIf?: {
    operator: "AND" | "OR";
    conditions: {
      field: string;
      operator: "eq" | "neq" | "in" | "lt";
      value: any;
    }[];
  };
}

const SCHEMA: FormField[] = [
  {
    id: "projectType",
    label: "Project Type",
    type: "select",
    options: ["SaaS Product", "E-Commerce Website", "Geospatial Mobile App", "Simple Portfolio"],
    defaultValue: "SaaS Product",
  },
  {
    id: "requireMaps",
    label: "Requires Map Integration?",
    type: "checkbox",
    defaultValue: false,
    visibleIf: {
      operator: "OR",
      conditions: [
        { field: "projectType", operator: "eq", value: "SaaS Product" },
        { field: "projectType", operator: "eq", value: "Geospatial Mobile App" },
      ],
    },
  },
  {
    id: "mapLibrary",
    label: "Geospatial Rendering Engine",
    type: "select",
    options: ["Leaflet", "MapLibre GL (GPU-Accelerated)"],
    defaultValue: "Leaflet",
    visibleIf: {
      operator: "AND",
      conditions: [
        { field: "requireMaps", operator: "eq", value: true },
      ],
    },
  },
  {
    id: "gpuBuffer",
    label: "Enable GPU Vector Tile Cache?",
    type: "checkbox",
    defaultValue: true,
    visibleIf: {
      operator: "AND",
      conditions: [
        { field: "requireMaps", operator: "eq", value: true },
        { field: "mapLibrary", operator: "eq", value: "MapLibre GL (GPU-Accelerated)" },
      ],
    },
  },
  {
    id: "cmsType",
    label: "E-Commerce Content CMS",
    type: "select",
    options: ["Payload CMS", "Firebase Integration", "Custom Admin Dashboard"],
    defaultValue: "Payload CMS",
    visibleIf: {
      operator: "AND",
      conditions: [
        { field: "projectType", operator: "eq", value: "E-Commerce Website" },
      ],
    },
  },
  {
    id: "mediaCapture",
    label: "Enable Advanced Camera Capture Controls?",
    type: "checkbox",
    defaultValue: false,
  },
  {
    id: "gpsAccuracy",
    label: "Required GPS Accuracy Threshold",
    type: "slider",
    min: 1,
    max: 30,
    unit: "m",
    defaultValue: 15,
    visibleIf: {
      operator: "AND",
      conditions: [
        { field: "mediaCapture", operator: "eq", value: true },
      ],
    },
  },
  {
    id: "watermarkText",
    label: "Strict GPS Overlay Stamp text",
    type: "text",
    placeholder: "e.g., SYNERGY-LOC-TAG",
    defaultValue: "",
    visibleIf: {
      operator: "AND",
      conditions: [
        { field: "mediaCapture", operator: "eq", value: true },
        { field: "gpsAccuracy", operator: "lt", value: 10 }, // Nested constraint
      ],
    },
  },
];

export default function FormBuilderDemo() {
  const [formState, setFormState] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    SCHEMA.forEach((f) => {
      initial[f.id] = f.defaultValue;
    });
    return initial;
  });

  const [activeTab, setActiveTab] = useState<"render" | "schema">("render");
  const [submitted, setSubmitted] = useState(false);

  // Evaluate single condition
  const evaluateCondition = (
    field: string,
    operator: "eq" | "neq" | "in" | "lt",
    targetValue: any,
    currentValues: Record<string, any>
  ): boolean => {
    const currentValue = currentValues[field];
    
    // If parent field itself is not visible, return false
    const parentField = SCHEMA.find((f) => f.id === field);
    if (parentField && parentField.visibleIf && !isFieldVisible(parentField, currentValues)) {
      return false;
    }

    switch (operator) {
      case "eq":
        return currentValue === targetValue;
      case "neq":
        return currentValue !== targetValue;
      case "in":
        return Array.isArray(targetValue) && targetValue.includes(currentValue);
      case "lt":
        return typeof currentValue === "number" && currentValue < targetValue;
      default:
        return false;
    }
  };

  // Determine if a field is visible based on active skip logic
  const isFieldVisible = (field: FormField, currentValues: Record<string, any>): boolean => {
    if (!field.visibleIf) return true;

    const { operator, conditions } = field.visibleIf;
    
    if (operator === "AND") {
      return conditions.every((cond) =>
        evaluateCondition(cond.field, cond.operator, cond.value, currentValues)
      );
    } else {
      return conditions.some((cond) =>
        evaluateCondition(cond.field, cond.operator, cond.value, currentValues)
      );
    }
  };

  // Active fields list
  const visibleFields = useMemo(() => {
    return SCHEMA.filter((field) => isFieldVisible(field, formState));
  }, [formState]);

  const handleFieldChange = (fieldId: string, val: any) => {
    setFormState((prev) => ({
      ...prev,
      [fieldId]: val,
    }));
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="formbuilder" className="py-24 px-6 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass border-indigo-500/10 mb-4">
            <Settings className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-400 tracking-wider uppercase font-mono">
              Skip-Logic Engine
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Dynamic Form Builder Playground
          </h2>
          
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
            Abhijith built nested logical conditional structures (AND, OR, NOR, IN) to render complex workflows. Interact with the form parameters to trigger live evaluations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Render & Playground Column */}
          <div className="lg:col-span-7 flex flex-col glass rounded-2xl border border-zinc-900 overflow-hidden min-h-[500px]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-900 bg-zinc-900/30">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">Live Form Simulator</span>
              </div>
              
              <div className="flex gap-1.5">
                <button
                  onClick={() => setActiveTab("render")}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "render"
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  Interactive Form
                </button>
                <button
                  onClick={() => setActiveTab("schema")}
                  className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
                    activeTab === "schema"
                      ? "bg-indigo-600 text-white"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
                  }`}
                >
                  Rule Schema JSON
                </button>
              </div>
            </div>

            <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
              {activeTab === "render" ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {SCHEMA.map((field) => {
                      const isVisible = visibleFields.some((vf) => vf.id === field.id);
                      if (!isVisible) return null;

                      return (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 350, damping: 25 }}
                          className="flex flex-col gap-2 p-4 rounded-xl bg-zinc-900/40 border border-zinc-900/80 hover:border-zinc-800 transition-colors"
                        >
                          <label className="text-xs font-semibold text-zinc-300 font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            {field.label}
                          </label>

                          {/* Select Render */}
                          {field.type === "select" && (
                            <select
                              value={formState[field.id]}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              className="w-full text-sm py-2 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-indigo-500 transition-colors"
                            >
                              {field.options?.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          )}

                          {/* Checkbox Render */}
                          {field.type === "checkbox" && (
                            <label className="relative flex items-center gap-3 py-1 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={formState[field.id]}
                                onChange={(e) => handleFieldChange(field.id, e.target.checked)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:bg-zinc-400 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 peer-checked:after:bg-white peer-checked:after:border-none"></div>
                              <span className="text-xs text-zinc-400 font-medium font-mono">
                                {formState[field.id] ? "ON (Enabled)" : "OFF (Disabled)"}
                              </span>
                            </label>
                          )}

                          {/* Slider Render */}
                          {field.type === "slider" && (
                            <div className="flex items-center gap-4 py-1">
                              <input
                                type="range"
                                min={field.min}
                                max={field.max}
                                value={formState[field.id]}
                                onChange={(e) => handleFieldChange(field.id, parseInt(e.target.value))}
                                className="flex-1 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                              />
                              <span className="text-xs font-semibold font-mono text-cyan-400 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800 min-w-[50px] text-center">
                                {formState[field.id]}
                                {field.unit}
                              </span>
                            </div>
                          )}

                          {/* Text input Render */}
                          {field.type === "text" && (
                            <input
                              type="text"
                              value={formState[field.id]}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              placeholder={field.placeholder}
                              className="w-full text-xs py-2 px-3 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-indigo-500 font-mono"
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-emerald-500/40 text-sm font-semibold hover:bg-zinc-900 transition-all hover:text-emerald-400"
                    >
                      {submitted ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-bounce" />
                          Evaluation Saved & Verified!
                        </>
                      ) : (
                        "Submit Dynamic Payload"
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex-1 rounded-xl bg-zinc-950 border border-zinc-900/60 p-4 overflow-auto max-h-[420px] font-mono text-[11px] text-indigo-300 leading-normal">
                  <pre>{JSON.stringify(SCHEMA, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Engine Debug Console Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Live State Inspector */}
            <div className="glass p-5 rounded-2xl border border-zinc-900 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-cyan-400 animate-pulse" />
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-widest">
                  Live State Inspector
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-normal">
                This real-time tracker aggregates the active values representing the form schema state tree.
              </p>
              <div className="flex-1 rounded-xl bg-zinc-950 p-4 font-mono text-[11px] text-cyan-400 border border-zinc-900 overflow-auto max-h-[220px]">
                <pre>{JSON.stringify(formState, null, 2)}</pre>
              </div>
            </div>

            {/* Skip Logic evaluation tracker */}
            <div className="glass p-5 rounded-2xl border border-zinc-900 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-widest">
                  Logical Engine Console
                </h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-normal">
                Skip-logic constraints matching status:
              </p>
              
              <div className="flex-1 flex flex-col gap-2 bg-zinc-950 p-3.5 rounded-xl border border-zinc-900 overflow-y-auto max-h-[220px]">
                {SCHEMA.filter((f) => f.visibleIf).map((field) => {
                  const isVisible = visibleFields.some((vf) => vf.id === field.id);
                  return (
                    <div
                      key={`rule-${field.id}`}
                      className="flex items-center justify-between text-[11px] font-mono p-2 rounded bg-zinc-900/40 border border-zinc-900"
                    >
                      <span className="text-zinc-400 truncate max-w-[150px]">{field.id}</span>
                      <span className={`px-2 py-0.5 rounded font-semibold text-[9px] ${
                        isVisible 
                          ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/10" 
                          : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                      }`}>
                        {isVisible ? "RENDER (MATCH)" : "SKIP (HIDDEN)"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
