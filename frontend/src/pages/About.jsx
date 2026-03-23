import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import { Link } from "react-router-dom";
import { useTheme } from "../lib/theme.js";
import { ArrowRight } from "lucide-react";

const HIGHLIGHTS = [
  { label:"Established",  value:"2023" },
  { label:"Headquarters", value:"Gazipur City, Bangladesh" },
  { label:"Core Focus",   value:"AI/ML, IoT, Robotics & Automation" },
  { label:"Team Size",    value:"15+ Experts" },
  { label:"Industries",   value:"8 Verticals" },
  { label:"Global Reach", value:"South Asia & beyond" },
];
const TEAM_ROLES = [
  { role:"AI/ML Engineers",      detail:"Data Scientists, ML Engineers, NLP Specialists" },
  { role:"IoT & Robotics",       detail:"Hardware Engineers, Embedded Systems, PCB Design" },
  { role:"Software Development", detail:"Full-stack Developers, Mobile App Developers" },
  { role:"DevOps & Cloud",       detail:"Cloud Architects, DevOps Engineers, SREs" },
  { role:"Project Management",   detail:"Technical PMs, Scrum Masters, Business Analysts" },
  { role:"Quality Assurance",    detail:"QA Engineers, Test Automation Specialists" },
];
const MV = [
  { emoji:"🎯", title:"Our Mission", body:"To empower businesses with intelligent automation solutions that enhance operational efficiency and drive innovation through AI, IoT, and robotics.", points:["Reliable and scalable automation","Bridge technology gaps in industry","Exceptional client partnership","Sustainable technological adoption"] },
  { emoji:"👁️", title:"Our Vision",  body:"To become the leading provider of integrated AI and robotics solutions in South Asia — recognized for innovation, reliability, and transformative impact.", points:["Pioneer AI-driven automation","Expand global footprint by 2025","Develop proprietary AI algorithms","Establish R&D center for robotics"] },
];

export default function About() {
  const { mode } = useTheme();
  const L = mode === "light";
  const bgHero = L ? "#eff6ff" : "var(--bg-1)";
  const bgA    = L ? "#ffffff" : "var(--bg-0)";
  const bgB    = L ? "#f5f9ff" : "var(--bg-1)";
  const bgCta  = L ? "#1d4ed8" : "var(--bg-1)";
  const ctaTxt = L ? "#ffffff" : "var(--text-pri)";
  const ctaSub = L ? "rgba(255,255,255,0.85)" : "var(--text-sec)";
  return (
    <>
      <Helmet><title>About — RIZOTIC Technologies</title></Helmet>

      {/* Hero */}
      <section className="page-hero" style={{ background:bgHero, borderBottom:"1px solid var(--border)", paddingTop:"80px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}>
            <p className="section-tag">About Us</p>
            <h1 className="section-heading mb-3">Where innovation meets <span className="gradient-text">execution</span></h1>
            <p className="text-sm max-w-xl leading-relaxed" style={{ color:"var(--text-sec)" }}>
              Rizotic specializes in solutions bridging AI, IoT automation, and robotics — transforming traditional industries through technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="section-about-overview" style={{ background:bgA, borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div className="lg:col-span-2 space-y-4 text-sm leading-relaxed" style={{ color:"var(--text-sec)" }}
              initial={{ opacity:0, x:-16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              <p>Founded with a vision to transform traditional industries through technological innovation, we deliver comprehensive solutions that drive efficiency, productivity, and competitive advantage for our clients.</p>
              <p>Our team combines deep technical expertise with industry knowledge to create customized solutions that address real-world challenges. We believe in the power of technology to create sustainable value.</p>
              <p>At Rizotic, we don't just implement technology — we innovate, integrate, and optimize to deliver measurable results that help our clients stay ahead.</p>
            </motion.div>
            <motion.div className="card-base bracket-card rounded-xl p-6" style={{ borderLeft:`3px solid var(--cyan)` }}
              initial={{ opacity:0, x:16 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              <h3 className="font-display font-semibold text-base mb-5" style={{ color:"var(--text-pri)" }}>Company Snapshot</h3>
              <div className="space-y-3">
                {HIGHLIGHTS.map(({ label, value }) => (
                  <div key={label} className="pb-3" style={{ borderBottom:"1px solid var(--border)" }}>
                    <div className="text-xs font-mono mb-0.5" style={{ color:"var(--text-muted)" }}>{label}</div>
                    <div className="text-sm font-semibold" style={{ color:"var(--text-pri)" }}>{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-about-mission" style={{ background:bgB, borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHeader tag="Our Purpose" title="Mission & Vision" center />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {MV.map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i*0.1 }} className="bracket-card card-base rounded-xl p-6">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color:"var(--text-pri)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color:"var(--text-sec)" }}>{item.body}</p>
                <ul className="space-y-2">
                  {item.points.map(p => (
                    <li key={p} className="flex items-start gap-2 text-xs" style={{ color:"var(--text-sec)" }}>
                      <span style={{ color:"var(--cyan)" }} className="shrink-0 mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-about-team" style={{ background:bgA, borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <SectionHeader tag="Our Team" title="Multidisciplinary expertise"
            subtitle="Our team combines deep expertise across various domains to deliver comprehensive solutions." />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
            {TEAM_ROLES.map((r, i) => (
              <motion.div key={r.role}
                initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i*0.06 }} className="card-base rounded-xl p-5 text-center">
                <div className="font-display font-semibold text-sm mb-1" style={{ color:"var(--text-pri)" }}>{r.role}</div>
                <div className="text-xs" style={{ color:"var(--text-muted)" }}>{r.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-about-cta" style={{ background:"var(--bg-1)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <h2 className="section-heading mb-3">Ready to work together?</h2>
          <p className="text-sm mb-6" style={{ color:"var(--text-sec)" }}>Let's discuss how Rizotic can accelerate your digital transformation.</p>
          <Link to="/contact" className="btn-primary">Contact Us <ArrowRight size={14}/></Link>
        </div>
      </section>
    </>
  );
}
