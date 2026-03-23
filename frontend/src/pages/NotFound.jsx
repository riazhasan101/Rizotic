import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center" style={{ background:"var(--bg-0)" }}>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}>
        <p className="font-mono text-xs tracking-widest uppercase mb-3" style={{ color:"var(--cyan)" }}>404 — Not Found</p>
        <h1 className="font-display font-black text-7xl mb-3" style={{ color:"var(--text-pri)" }}>404</h1>
        <p className="text-sm mb-8 max-w-sm" style={{ color:"var(--text-sec)" }}>This page doesn't exist or may have moved.</p>
        <Link to="/" className="btn-primary"><ArrowLeft size={14}/> Back to Home</Link>
      </motion.div>
    </div>
  );
}
