import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
export default function ServiceCard({ service, index=0 }) {
  return (
    <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-20px"}} transition={{duration:0.3,delay:index*0.04}}>
      <Link to={`/services/${service.slug}`} className="svc-card group block p-4 rounded-xl h-full">
        <div className="flex items-start justify-between mb-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0" style={{background:`${service.accentColor}15`,border:`1px solid ${service.accentColor}28`}}>{service.icon}</div>
          <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" style={{color:service.accentColor}}/>
        </div>
        <h3 className="font-display font-semibold text-sm leading-tight mb-1" style={{color:service.accentColor}}>{service.name}</h3>
        <p className="text-xs leading-relaxed line-clamp-2" style={{color:"var(--text-sec)"}}>{service.description}</p>
      </Link>
    </motion.div>
  );
}
