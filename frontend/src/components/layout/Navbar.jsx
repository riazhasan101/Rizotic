import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../../lib/theme.js";

const NAV = [
  {label:"Home",to:"/"},{label:"About",to:"/about"},{label:"Services",to:"/services"},
  {label:"Industries",to:"/industries"},{label:"Process",to:"/process"},
];

export default function Navbar() {
  const [scrolled,setScrolled] = useState(false);
  const [open,setOpen] = useState(false);
  const { mode,setMode } = useTheme();
  const loc = useLocation();
  const D = mode==="dark";
  useEffect(()=>{ const f=()=>setScrolled(window.scrollY>20); window.addEventListener("scroll",f,{passive:true}); return()=>window.removeEventListener("scroll",f); },[]);
  useEffect(()=>setOpen(false),[loc.pathname]);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{background:scrolled?"var(--nav-bg)":"transparent",borderBottom:scrolled?"1px solid var(--border)":"none",backdropFilter:scrolled?"blur(14px)":"none"}}>
      <nav className="page-wrap h-16 flex items-center justify-between gap-4">
        <Link to="/"><img src="/logo.png" alt="Rizotic" className="h-9 w-auto"/></Link>
        <ul className="hidden md:flex items-center">
          {NAV.map(({label,to})=>(
            <li key={to}>
              <NavLink to={to} end={to==="/"} className="px-3 py-1.5 text-sm font-body transition-colors block" style={({isActive})=>({color:isActive?"var(--cyan)":"var(--text-sec)",borderBottom:isActive?"2px solid var(--cyan)":"2px solid transparent"})}>{label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <div className="hidden sm:flex items-center gap-0.5 rounded-full p-1" style={{border:"1px solid var(--border)",background:"var(--surface)"}}>
            {[{m:"light",Icon:Sun},{m:"dark",Icon:Moon}].map(({m,Icon})=>(
              <button key={m} onClick={()=>setMode(m)} className="w-7 h-7 rounded-full flex items-center justify-center transition-all" style={{background:mode===m?"var(--cyan)":"transparent",color:mode===m?"#fff":"var(--text-muted)"}}>
                <Icon size={12}/>
              </button>
            ))}
          </div>
          <Link to="/contact" className="hidden md:inline-flex btn-primary text-xs px-4 py-2">Contact</Link>
          <button className="md:hidden p-2" style={{color:"var(--cyan)"}} onClick={()=>setOpen(v=>!v)}>
            {open?<X size={20}/>:<Menu size={20}/>}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}} exit={{opacity:0,height:0}} style={{background:"var(--nav-bg)",borderTop:"1px solid var(--border)"}} className="md:hidden overflow-hidden">
            <div className="page-wrap py-3 space-y-1">
              {NAV.map(({label,to})=>(
                <NavLink key={to} to={to} end={to==="/"} className="block px-3 py-2 rounded text-sm transition-colors" style={({isActive})=>({color:isActive?"var(--cyan)":"var(--text-sec)",background:isActive?"var(--tag-bg)":"transparent"})}>{label}</NavLink>
              ))}
              <div className="flex items-center gap-2 px-3 py-2">
                {[{m:"light",Icon:Sun,l:"Light"},{m:"dark",Icon:Moon,l:"Dark"}].map(({m,Icon,l})=>(
                  <button key={m} onClick={()=>setMode(m)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full" style={{border:"1px solid var(--border)",background:mode===m?"var(--cyan)":"var(--surface)",color:mode===m?"#fff":"var(--text-sec)"}}>
                    <Icon size={11}/>{l}
                  </button>
                ))}
              </div>
              <Link to="/contact" className="btn-primary w-full justify-center text-xs py-2 block text-center mt-1">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
