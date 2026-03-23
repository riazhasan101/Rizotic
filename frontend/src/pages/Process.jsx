import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ProcessStep from "../components/ui/ProcessStep.jsx";
import { PROCESS_STEPS } from "../assets/data/industries.js";
import { Link } from "react-router-dom";
import { useTheme } from "../lib/theme.js";
import { ArrowRight } from "lucide-react";

export default function Process() {
  const { mode } = useTheme();
  const L = mode === "light";
  const bgHero = L ? "#eff6ff" : "var(--bg-1)";
  const bgMain = L ? "#ffffff" : "var(--bg-0)";
  return (
    <>
      <Helmet><title>Our Process — RIZOTIC Technologies</title></Helmet>
      <section className="page-hero" style={{ background:bgHero, borderBottom:"1px solid var(--border)", paddingTop:"80px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <p className="section-tag">How We Deliver</p>
            <h1 className="section-heading mb-2">Our <span className="gradient-text">5-Step Approach</span></h1>
            <p className="text-sm max-w-lg leading-relaxed" style={{ color:"var(--text-sec)" }}>A structured, client-centric framework that ensures successful delivery every time.</p>
          </motion.div>
        </div>
      </section>
      <section className="section-process-steps" style={{ background:bgMain }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              {PROCESS_STEPS.map((step, i) => (
                <ProcessStep key={step.number} step={step} index={i} isLast={i === PROCESS_STEPS.length - 1}/>
              ))}
            </div>
            <motion.div className="lg:sticky lg:top-24 space-y-4"
              initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              <div className="bracket-card card-base rounded-xl p-6">
                <h2 className="font-display font-bold text-xl mb-3" style={{ color:"var(--text-pri)" }}>Why it works</h2>
                <p className="text-sm leading-relaxed mb-4" style={{ color:"var(--text-sec)" }}>
                  By investing upfront in discovery and strategy, we prevent costly rework and deliver solutions that solve the right problems.
                </p>
                <ul className="space-y-2">
                  {["Fixed-price or T&M engagement","Weekly progress demos","Dedicated Slack channel","Full IP ownership","6-month post-launch support"].map(p => (
                    <li key={p} className="flex items-start gap-2 text-xs" style={{ color:"var(--text-sec)" }}>
                      <span style={{ color:"var(--cyan)" }} className="shrink-0 mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bracket-card card-base rounded-xl p-6" style={{ borderColor:"var(--border-h)" }}>
                <p className="font-display font-semibold text-base mb-2" style={{ color:"var(--text-pri)" }}>Ready to kick off?</p>
                <p className="text-xs mb-4" style={{ color:"var(--text-sec)" }}>The discovery phase is free. Tell us about your project.</p>
                <Link to="/contact" className="btn-primary w-full justify-center text-xs py-2.5">
                  Book Free Discovery Call <ArrowRight size={13}/>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
