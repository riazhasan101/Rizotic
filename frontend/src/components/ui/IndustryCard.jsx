import { motion } from "framer-motion";
export default function IndustryCard({ industry, index=0 }) {
  return (
    <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-20px"}} transition={{duration:0.3,delay:index*0.05}} className="card-base p-4 rounded-xl text-center group hover:-translate-y-1 transition-transform">
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{industry.icon}</div>
      <h3 className="font-display font-semibold text-xs sm:text-sm mb-1 leading-tight" style={{color:"var(--text-pri)"}}>{industry.name}</h3>
      <p className="text-xs leading-relaxed hidden sm:block" style={{color:"var(--text-muted)"}}>{industry.description}</p>
    </motion.div>
  );
}
