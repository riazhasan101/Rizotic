import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useTheme } from "../../lib/theme.js";

const HIGHLIGHTS = ["AI & Machine Learning","IoT & Smart Devices","Industrial Automation","ERP Solutions","Cloud & DevOps","Garments Automation"];
const STATS = [{v:"50+",l:"Projects"},{v:"15+",l:"Engineers"},{v:"8",l:"Industries"},{v:"100%",l:"Satisfaction"}];

export default function HeroBanner() {
  const { mode } = useTheme();
  const L = mode === "light";
  return (
    <section className={L ? "hero-light" : "hero-dark"} style={{ position:"relative", overflow:"hidden", borderBottom:"1px solid var(--border)", minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", paddingTop:"64px" }}>
      <div className="grid-bg" />
      <div className="page-wrap relative z-10 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left */}
          <motion.div initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{duration:0.6}}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-mono" style={{border:"1px solid var(--border)",background:"var(--tag-bg)",color:"var(--cyan)"}}>
              <span className="w-1.5 h-1.5 rounded-full glow-dot" style={{background:"var(--cyan)"}}/>
              Bangladesh · Est. 2023 · Innovate. Automate. Elevate.
            </div>
            <h1 className="font-display font-bold leading-[1.06] mb-4" style={{fontSize:"clamp(1.9rem,4vw,3.2rem)",color:"var(--text-pri)"}}>
              <span className="gradient-text">Intelligent</span> Technology<br/>
              Solutions for <span style={{color:"var(--cyan)"}}>Modern</span> Businesses
            </h1>
            <p className="leading-relaxed mb-6 max-w-md" style={{fontSize:"clamp(0.85rem,1.3vw,0.95rem)",color:"var(--text-sec)"}}>
              Bridging AI, IoT, robotics, and enterprise software to transform businesses across Bangladesh and beyond.
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-7">
              {HIGHLIGHTS.map((h,i)=>(
                <motion.div key={h} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:0.3+i*0.06}} className="flex items-center gap-2">
                  <CheckCircle size={12} style={{color:"var(--cyan)",flexShrink:0}}/>
                  <span className="text-xs sm:text-sm" style={{color:"var(--text-sec)"}}>{h}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/services" className="btn-primary">Explore Services <ArrowRight size={14}/></Link>
              <Link to="/contact" className="btn-outline">Free Consultation</Link>
            </div>
          </motion.div>
          {/* Right — dashboard card */}
          <motion.div initial={{opacity:0,x:24}} animate={{opacity:1,x:0}} transition={{delay:0.2,duration:0.65}} className="relative w-full">
            <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{transform:"rotate(2deg) translate(8px,8px)",background:"var(--bg-1)",border:"1px solid var(--border)",borderRadius:"16px"}}/>
            <div className="relative rounded-2xl overflow-hidden" style={{background:"var(--card-bg)",border:"1px solid var(--border)",boxShadow:"var(--card-sh),0 0 30px var(--cyan-glow)"}}>
              <div className="flex items-center justify-between px-4 py-2.5" style={{borderBottom:"1px solid var(--border)",background:"var(--bg-1)"}}>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:"#ff5f57"}}/>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:"#febc2e"}}/>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:"#28c840"}}/>
                </div>
                <span className="font-mono text-xs" style={{color:"var(--text-muted)"}}>rizotic.com · analytics</span>
                <span className="font-mono text-xs flex items-center gap-1" style={{color:"#28c840"}}>
                  <span className="w-1.5 h-1.5 rounded-full glow-dot" style={{background:"#28c840"}}/>LIVE
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {STATS.map((s,i)=>(
                    <motion.div key={s.l} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:0.5+i*0.08}} className="rounded-lg p-3 flex items-center gap-2.5" style={{background:"var(--bg-1)",border:"1px solid var(--border)"}}>
                      <div className="font-display font-bold text-lg leading-none" style={{color:"var(--cyan)"}}>{s.v}</div>
                      <div className="text-xs" style={{color:"var(--text-muted)"}}>{s.l}</div>
                    </motion.div>
                  ))}
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-mono" style={{color:"var(--text-muted)"}}>DELIVERY RATE</span>
                    <span className="text-xs font-mono font-bold" style={{color:"var(--cyan)"}}>100%</span>
                  </div>
                  <div className="flex items-end gap-1" style={{height:"44px"}}>
                    {[38,52,44,68,60,78,72,88,82,100].map((h,i)=>(
                      <motion.div key={i} initial={{scaleY:0}} animate={{scaleY:1}} transition={{delay:0.7+i*0.04,duration:0.3,ease:"easeOut"}} className="flex-1 rounded-t origin-bottom" style={{height:`${h}%`,background:i===9?"var(--cyan)":"var(--cyan-glow)",border:"1px solid var(--border)"}}/>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["React","Node.js","Python","K8S","TF","ROS","Flutter"].map(t=>(
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between px-4 py-2" style={{borderTop:"1px solid var(--border)",background:"var(--bg-1)"}}>
                <span className="text-xs font-mono flex items-center gap-1.5" style={{color:"var(--text-muted)"}}><span className="w-1.5 h-1.5 rounded-full" style={{background:"#28c840"}}/>All systems operational</span>
                <span className="text-xs font-mono hidden sm:block" style={{color:"var(--text-muted)"}}>+880 1614644644</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Trust bar */}
      <div className="relative z-10 w-full" style={{borderTop:"1px solid var(--border)",background:"var(--bg-1)"}}>
        <div className="page-wrap py-2.5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-mono hidden sm:block" style={{color:"var(--text-muted)"}}>TRUSTED ACROSS BANGLADESH &amp; SOUTH ASIA</span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {["ISO Aligned","Industry 4.0","24/7 Support","IP Ownership"].map(t=>(
              <span key={t} className="text-xs flex items-center gap-1" style={{color:"var(--text-sec)"}}><span style={{color:"var(--cyan)"}}>✓</span>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
