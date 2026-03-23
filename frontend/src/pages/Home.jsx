import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Zap, Globe } from "lucide-react";
import HeroBanner    from "../components/sections/HeroBanner.jsx";
import ServicesStrip from "../components/sections/ServicesStrip.jsx";
import TechSection   from "../components/sections/TechSection.jsx";
import ServiceCard   from "../components/ui/ServiceCard.jsx";
import IndustryCard  from "../components/ui/IndustryCard.jsx";
import SectionHeader from "../components/ui/SectionHeader.jsx";
import { SERVICES }  from "../assets/data/services.js";
import { INDUSTRIES }from "../assets/data/industries.js";
import { useTheme }  from "../lib/theme.js";

const WHY = [
  {icon:<Cpu size={16}/>,   title:"End-to-End Ownership", desc:"From PCB design to cloud deployment — we own every layer."},
  {icon:<Zap size={16}/>,   title:"Rapid Delivery",       desc:"Working prototype in 4 weeks, production-ready in 3 months."},
  {icon:<Globe size={16}/>, title:"Global Standards",     desc:"ISO-aligned engineering from our Bangladesh-based team."},
];

export default function Home() {
  const { mode } = useTheme(); const L = mode==="light";
  const bg = {
    strip:      L?"#dbeafe":"var(--bg-1)",
    services:   L?"#ffffff":"var(--bg-0)",
    why:        L?"#eff6ff":"var(--bg-1)",
    tech:       L?"#f0fdf4":"var(--bg-0)",
    industries: L?"#fff7ed":"var(--bg-1)",
    cta:        L?"#1d4ed8":"var(--bg-0)",
  };
  return (
    <>
      <Helmet><title>RIZOTIC — Innovate. Automate. Elevate.</title></Helmet>
      <HeroBanner />

      {/* Strip */}
      <div style={{background:bg.strip,borderBottom:"1px solid var(--border)"}}>
        <ServicesStrip />
      </div>

      {/* Services */}
      <section style={{background:bg.services,borderBottom:"1px solid var(--border)"}}>
        <div className="page-wrap py-14">
          <SectionHeader tag="Core Services" title="Everything you need to scale" subtitle="Nine specialized practice areas — from AI to garments automation." center/>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-8">
            {SERVICES.map((s,i)=><ServiceCard key={s.slug} service={s} index={i}/>)}
          </div>
          <div className="text-center mt-6">
            <Link to="/services" className="btn-outline text-sm">All Services <ArrowRight size={13}/></Link>
          </div>
        </div>
      </section>

      {/* Why */}
      <section style={{background:bg.why,borderBottom:"1px solid var(--border)"}}>
        <div className="page-wrap py-14">
          <SectionHeader tag="Why Rizotic" title="Built to deliver results" center/>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {WHY.map((item,i)=>(
              <motion.div key={item.title} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.09}} className="card-base p-5 rounded-xl text-center">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 mx-auto" style={{background:"var(--tag-bg)",border:"1px solid var(--border)",color:"var(--cyan)"}}>{item.icon}</div>
                <h3 className="font-display font-semibold text-base mb-1.5" style={{color:"var(--text-pri)"}}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{color:"var(--text-sec)"}}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <div style={{background:bg.tech,borderBottom:"1px solid var(--border)"}}>
        <TechSection />
      </div>

      {/* Industries */}
      <section style={{background:bg.industries,borderBottom:"1px solid var(--border)"}}>
        <div className="page-wrap py-14">
          <SectionHeader tag="Industries" title="Sectors we transform" subtitle="Expertise across eight verticals." center/>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {INDUSTRIES.map((ind,i)=><IndustryCard key={ind.slug} industry={ind} index={i}/>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{background:bg.cta}}>
        <div className="page-wrap py-16 text-center">
          <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <p className="section-tag mb-2" style={{color:L?"rgba(255,255,255,0.7)":"var(--cyan)"}}>Ready to Start?</p>
            <h2 className="section-heading mb-3" style={{color:L?"#ffffff":"var(--text-pri)"}}>
              Transform your business with{" "}
              <span style={{color:L?"#93c5fd":"var(--cyan)"}}>Rizotic</span>
            </h2>
            <p className="text-sm mb-7 max-w-sm mx-auto" style={{color:L?"rgba(255,255,255,0.8)":"var(--text-sec)"}}>
              Tell us about your challenge. We respond within 24 hours.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 font-semibold px-7 py-3 rounded-lg transition-all text-sm" style={{background:L?"#ffffff":"var(--cyan)",color:L?"#1d4ed8":"#fff",fontFamily:"'Rajdhani',sans-serif",letterSpacing:"0.04em",boxShadow:L?"0 4px 20px rgba(0,0,0,0.15)":"0 4px 20px var(--cyan-glow)"}}>
              Start a Conversation <ArrowRight size={14}/>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
