import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { TECH_CATEGORIES } from "../assets/data/industries.js";

const CAT_COLORS = ["#f97316","#3b82f6","#22c55e","#a855f7","#14b8a6","#ef4444"];

export default function Technology() {
  const { mode } = useTheme();
  const L = mode === "light";
  const bgHero = L ? "#eff6ff" : "var(--bg-1)";
  const bgMain = L ? "#f0fdf4" : "var(--bg-0)";
  return (
    <>
      <Helmet><title>Technology Stack — RIZOTIC Technologies</title></Helmet>
      <section className="page-hero" style={{ background:bgHero, borderBottom:"1px solid var(--border)", paddingTop:"80px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <p className="section-tag">Under the Hood</p>
            <h1 className="section-heading mb-2">Our <span className="gradient-text">Technology Stack</span></h1>
            <p className="text-sm max-w-lg leading-relaxed" style={{ color:"var(--text-sec)" }}>Cutting-edge tools carefully chosen for reliability, scalability, and performance.</p>
          </motion.div>
        </div>
      </section>
      <section className="section-tech" style={{ background:bgMain }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {TECH_CATEGORIES.map((cat, ci) => (
            <motion.div key={cat.label}
              initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true }} transition={{ delay: ci*0.07 }}
              className="flex items-start gap-6">
              <div className="flex items-center gap-2 flex-shrink-0 pt-1.5" style={{ width:"120px" }}>
                <span className="w-2 h-2 rounded-full" style={{ background:CAT_COLORS[ci] }}/>
                <span className="text-xs font-mono font-medium" style={{ color:"var(--text-sec)" }}>{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(tech => (
                  <span key={tech} className="tech-badge" style={{ borderLeftColor:CAT_COLORS[ci], borderLeftWidth:"2px" }}>{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
