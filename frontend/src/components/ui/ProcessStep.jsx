import { motion } from "framer-motion";
export default function ProcessStep({ step, index = 0, isLast = false }) {
  return (
    <motion.div initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true }} transition={{ duration:0.42, delay: index*0.1 }}
      className="flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs flex-shrink-0"
          style={{ background:"linear-gradient(135deg,var(--cyan),var(--cyan-dim))", color:"#fff" }}>
          {step.number}
        </div>
        {!isLast && <div className="w-px flex-1 mt-2" style={{ background:"linear-gradient(to bottom,var(--border-h),transparent)" }}/>}
      </div>
      <div className="pb-8">
        <h3 className="font-display font-semibold text-lg mb-1" style={{ color:"var(--text-pri)" }}>{step.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color:"var(--text-sec)" }}>{step.description}</p>
      </div>
    </motion.div>
  );
}
