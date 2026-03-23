import { motion } from "framer-motion";
import { useTheme } from "../../lib/theme.js";
import { TECH_CATEGORIES } from "../../assets/data/industries.js";
const CC = ["#f97316","#3b82f6","#22c55e","#a855f7","#14b8a6","#ef4444"];
const LB = ["#fff7ed","#eff6ff","#f0fdf4","#faf5ff","#f0fdfa","#fef2f2"];
export default function TechSection() {
  const { mode } = useTheme(); const L = mode==="light";
  return (
    <section>
      <div className="page-wrap py-14">
        <motion.div initial={{opacity:0,y:14}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-10">
          <p className="section-tag">Technology Stack</p>
          <h2 className="section-heading">Tools we master</h2>
          <p className="section-sub">40+ technologies across 6 domains</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH_CATEGORIES.map((cat,ci)=>(
            <motion.div key={cat.label} initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-20px"}} transition={{duration:0.35,delay:ci*0.07}} className="rounded-xl p-4" style={{background:L?LB[ci]:"var(--surface)",border:`1px solid ${L?CC[ci]+"28":"var(--border)"}`}}>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{background:CC[ci]}}/>
                <span className="text-xs font-mono font-semibold" style={{color:L?CC[ci]:"var(--text-sec)"}}>{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map(t=>(
                  <span key={t} className="tech-pill" style={{borderColor:`${CC[ci]}35`,color:L?"#1e293b":"var(--text-sec)",background:L?"#fff":"var(--surface-h)"}}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
