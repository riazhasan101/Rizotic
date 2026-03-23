import { Link } from "react-router-dom";
import { SERVICES } from "../../assets/data/services.js";
const D = [...SERVICES,...SERVICES];
export default function ServicesStrip() {
  return (
    <div className="relative overflow-hidden py-3" style={{borderBottom:"1px solid var(--border)"}}>
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{background:"linear-gradient(90deg,var(--bg-1),transparent)"}}/>
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none" style={{background:"linear-gradient(270deg,var(--bg-1),transparent)"}}/>
      <div className="strip-track">
        {D.map((s,i)=>(
          <Link key={i} to={`/services/${s.slug}`} className="strip-pill">
            <span style={{fontSize:"13px"}}>{s.icon}</span>
            <span className="font-display font-semibold text-xs" style={{color:"var(--text-pri)"}}>{s.name}</span>
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:s.accentColor,opacity:0.7}}/>
          </Link>
        ))}
      </div>
    </div>
  );
}
