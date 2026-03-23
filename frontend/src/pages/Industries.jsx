import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import IndustryCard from "../components/ui/IndustryCard.jsx";
import { INDUSTRIES } from "../assets/data/industries.js";
import { Link } from "react-router-dom";
import { useTheme } from "../lib/theme.js";
import { ArrowRight } from "lucide-react";

export default function Industries() {
  const { mode } = useTheme();
  const L = mode === "light";
  const bgHero = L ? "#eff6ff" : "var(--bg-1)";
  const bgMain = L ? "#fff7ed" : "var(--bg-0)";
  return (
    <>
      <Helmet><title>Industries — RIZOTIC Technologies</title></Helmet>
      <section className="page-hero" style={{ background:bgHero, borderBottom:"1px solid var(--border)", paddingTop:"80px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <p className="section-tag">Sectors We Serve</p>
            <h1 className="section-heading mb-2">Industries We <span className="gradient-text">Transform</span></h1>
            <p className="text-sm max-w-lg leading-relaxed" style={{ color:"var(--text-sec)" }}>Deep domain expertise across eight verticals — we understand your industry's unique challenges.</p>
          </motion.div>
        </div>
      </section>
      <section className="section-page-main" style={{ background:bgMain }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind, i) => <IndustryCard key={ind.slug} industry={ind} index={i} />)}
          </div>
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="mt-8 bracket-card card-base rounded-xl p-8 text-center">
            <h2 className="font-display font-bold text-xl mb-2" style={{ color:"var(--text-pri)" }}>Don't see your industry?</h2>
            <p className="text-sm mb-5" style={{ color:"var(--text-sec)" }}>Our technology is industry-agnostic. If you have a challenge, we likely have experience solving it.</p>
            <Link to="/contact" className="btn-primary">Talk to Our Team <ArrowRight size={14}/></Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
