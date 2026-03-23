import { motion } from "framer-motion";
export default function SectionHeader({ tag, title, subtitle, center=true }) {
  return (
    <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.42}} className={center?"text-center":""}>
      {tag && <p className="section-tag">{tag}</p>}
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className={`section-sub ${center?"":"!mx-0 text-left"}`}>{subtitle}</p>}
    </motion.div>
  );
}
