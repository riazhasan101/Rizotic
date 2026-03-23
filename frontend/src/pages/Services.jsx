import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import ServiceCard from "../components/ui/ServiceCard.jsx";
import { SERVICES } from "../assets/data/services.js";
import { Link } from "react-router-dom";
import { useTheme } from "../lib/theme.js";
import { ArrowRight } from "lucide-react";

export default function Services() {
  const { mode } = useTheme();
  const L = mode === "light";
  const bgHero = L ? "#eff6ff" : "var(--bg-1)";
  const bgMain = L ? "#ffffff" : "var(--bg-0)";
  return (
    <>
      <Helmet><title>Services — RIZOTIC Technologies</title></Helmet>
      <section className="page-hero" style={{ background:bgHero, borderBottom:"1px solid var(--border)", paddingTop:"80px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <p className="section-tag">What We Build</p>
            <h1 className="section-heading mb-2">Our <span className="gradient-text">Core Services</span></h1>
            <p className="text-sm max-w-lg leading-relaxed" style={{ color:"var(--text-sec)" }}>Nine specialized practice areas — each staffed with dedicated engineers who live and breathe their domain.</p>
          </motion.div>
        </div>
      </section>
      <section className="section-page-main" style={{ background:bgMain, borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {SERVICES.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
          <div className="text-center mt-8 p-6 card-base rounded-xl">
            <p className="text-sm mb-3" style={{ color:"var(--text-sec)" }}>See how we deliver every project with a structured process.</p>
            <Link to="/process" className="btn-outline"><ArrowRight size={14}/> View Our Process</Link>
          </div>
        </div>
      </section>
    </>
  );
}
