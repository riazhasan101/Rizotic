import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
const LINKS=[{l:"About",t:"/about"},{l:"Services",t:"/services"},{l:"Industries",t:"/industries"},{l:"Process",t:"/process"},{l:"Contact",t:"/contact"}];
export default function Footer() {
  return (
    <footer style={{background:"var(--bg-1)",borderTop:"1px solid var(--border)"}}>
      <div className="page-wrap py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-6">
          <div>
            <img src="/logo.png" alt="Rizotic" className="h-10 w-auto mb-3"/>
            <p className="text-xs leading-relaxed max-w-xs" style={{color:"var(--text-muted)"}}>Bridging AI, IoT, and robotics to transform industries across South Asia.</p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm mb-3 tracking-widest" style={{color:"var(--text-pri)"}}>NAVIGATION</h3>
            <ul className="space-y-1.5">
              {LINKS.map(({l,t})=>(
                <li key={t}><Link to={t} className="text-xs flex items-center gap-1.5 hover:underline transition-colors" style={{color:"var(--text-muted)"}}><span style={{color:"var(--cyan)",fontSize:"8px"}}>▶</span>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm mb-3 tracking-widest" style={{color:"var(--text-pri)"}}>CONTACT</h3>
            <ul className="space-y-2.5">
              {[{I:Mail,v:"info@rizotic.com",h:"mailto:info@rizotic.com"},{I:Phone,v:"+880 1614644644",h:"tel:+8801614644644"},{I:MapPin,v:"Gazipur City, Bangladesh",h:null}].map(({I,v,h})=>(
                <li key={v} className="flex items-center gap-2.5">
                  <I size={11} style={{color:"var(--cyan)",flexShrink:0}}/>
                  {h?<a href={h} className="text-xs" style={{color:"var(--text-sec)"}}>{v}</a>:<span className="text-xs" style={{color:"var(--text-sec)"}}>{v}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-between pt-5" style={{borderTop:"1px solid var(--border)"}}>
          <p className="text-xs" style={{color:"var(--text-muted)"}}>&copy; {new Date().getFullYear()} Rizotic Technologies. All Rights Reserved.</p>
          <p className="text-xs font-mono" style={{color:"var(--cyan)"}}>www.rizotic.com</p>
        </div>
      </div>
    </footer>
  );
}
