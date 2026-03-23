// src/components/sections/HeroSlider.jsx
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// ── SVG Illustrations ────────────────────────────────────────────────

const IoTIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iotBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#001830" /><stop offset="100%" stopColor="#000c18" />
      </linearGradient>
      <linearGradient id="armGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" />
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#iotBg)" />
    {[0,1,2,3,4].map(i=><line key={`h${i}`} x1="0" y1={190+i*10} x2="400" y2={190+i*10} stroke={accent} strokeWidth="0.3" opacity="0.2"/>)}
    {[0,1,2,3,4,5,6,7].map(i=><line key={`v${i}`} x1={i*55} y1="175" x2={i*55+25} y2="245" stroke={accent} strokeWidth="0.3" opacity="0.15"/>)}
    <rect x="110" y="218" width="50" height="14" rx="4" fill="#1a3a5c" stroke={accent} strokeWidth="1"/>
    <rect x="128" y="200" width="14" height="20" rx="3" fill="#1e4a70" stroke={accent} strokeWidth="0.8"/>
    <rect x="125" y="148" width="12" height="58" rx="6" fill="url(#armGrad)" transform="rotate(-15 131 177)"/>
    <rect x="140" y="104" width="12" height="56" rx="6" fill="url(#armGrad)" transform="rotate(20 146 132)"/>
    <rect x="160" y="76" width="10" height="38" rx="5" fill="url(#armGrad)" transform="rotate(-10 165 95)"/>
    <circle cx="131" cy="148" r="9" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5"/>
    <circle cx="152" cy="106" r="8" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5"/>
    <circle cx="164" cy="78" r="7" fill="#f59e0b" stroke="#fbbf24" strokeWidth="1.5"/>
    <rect x="164" y="58" width="5" height="17" rx="2" fill="#d97706" transform="rotate(-20 166 67)"/>
    <rect x="174" y="58" width="5" height="17" rx="2" fill="#d97706" transform="rotate(20 176 67)"/>
    <rect x="215" y="55" width="165" height="118" rx="8" fill="rgba(0,20,40,0.85)" stroke={accent} strokeWidth="1.5"/>
    {[85,112,140].map(y=><line key={y} x1="215" y1={y} x2="380" y2={y} stroke={accent} strokeWidth="0.5" opacity="0.4"/>)}
    {[268,318].map(x=><line key={x} x1={x} y1="55" x2={x} y2="173" stroke={accent} strokeWidth="0.5" opacity="0.4"/>)}
    <rect x="222" y="92" width="40" height="14" rx="2" fill={accent} opacity="0.15"/>
    <rect x="222" y="92" width="28" height="14" rx="2" fill={accent} opacity="0.5"/>
    <rect x="222" y="118" width="40" height="14" rx="2" fill={accent} opacity="0.15"/>
    <rect x="222" y="118" width="35" height="14" rx="2" fill="#00ffaa" opacity="0.4"/>
    <rect x="222" y="144" width="40" height="14" rx="2" fill={accent} opacity="0.15"/>
    <rect x="222" y="144" width="20" height="14" rx="2" fill="#f59e0b" opacity="0.4"/>
    <circle cx="348" cy="110" r="26" fill="none" stroke={accent} strokeWidth="1" opacity="0.3"/>
    <circle cx="348" cy="110" r="26" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="115 49" strokeLinecap="round" opacity="0.9" transform="rotate(-90 348 110)"/>
    <text x="348" y="107" textAnchor="middle" fill={accent} fontSize="10" fontFamily="monospace" fontWeight="bold">82%</text>
    <text x="348" y="118" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" opacity="0.6">OEE</text>
    <polyline points="274,162 282,152 290,157 298,146 306,149 314,139" fill="none" stroke="#00ffaa" strokeWidth="1.5" opacity="0.8"/>
    <line x1="175" y1="86" x2="215" y2="96" stroke={accent} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4"/>
    {[[45,75],[25,132],[62,162],[335,212],[375,184]].map(([x,y],i)=>(
      <g key={i}>
        <circle cx={x} cy={y} r="6" fill="rgba(0,20,40,0.9)" stroke={accent} strokeWidth="1"/>
        <circle cx={x} cy={y} r="3" fill={accent} opacity="0.8"/>
        <circle cx={x} cy={y} r="10" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3"/>
      </g>
    ))}
    <polyline points="45,75 75,95 115,205" fill="none" stroke={accent} strokeWidth="0.6" strokeDasharray="3 4" opacity="0.3"/>
    <rect x="8" y="8" width="132" height="20" rx="4" fill="rgba(0,0,0,0.5)"/>
    <text x="15" y="21" fill={accent} fontSize="8" fontFamily="monospace">INDUSTRIAL ROBOT ARM v3.2</text>
  </svg>
);

const AIIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="aiBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a0800"/><stop offset="100%" stopColor="#0d0400"/>
      </linearGradient>
      <radialGradient id="cityGlow2" cx="70%" cy="70%" r="50%">
        <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.15"/><stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>
    <rect width="400" height="280" fill="url(#aiBg)"/>
    <rect width="400" height="280" fill="url(#cityGlow2)"/>
    {[[220,130],[252,102],[282,122],[308,92],[345,112],[375,142]].map(([x,h],i)=>(
      <rect key={i} x={x} y={h} width={[30,25,20,35,28,18][i]} height={280-h} fill="#1a0e05"/>
    ))}
    {[[228,150],[228,168],[228,188],[260,122],[260,142],[316,110],[316,128],[356,132],[356,150]].map(([x,y],i)=>(
      <rect key={i} x={x} y={y} width="6" height="4" rx="1" fill={accent} opacity="0.5"/>
    ))}
    <rect x="8" y="24" width="200" height="135" rx="6" fill="rgba(0,10,20,0.9)" stroke={accent} strokeWidth="1.5"/>
    <rect x="8" y="24" width="200" height="18" rx="6" fill="rgba(0,30,50,0.8)"/>
    <text x="18" y="37" fill={accent} fontSize="8" fontFamily="monospace">AI REAL-TIME ANALYTICS</text>
    <text x="172" y="37" fill="#00ffaa" fontSize="7" fontFamily="monospace">LIVE</text>
    <polyline points="18,112 38,94 58,103 78,74 98,84 118,60 138,70 158,50 178,54 198,44" fill="none" stroke={accent} strokeWidth="2" opacity="0.9"/>
    <polyline points="18,122 38,113 58,117 78,102 98,108 118,90 138,94 158,80 178,83 198,75" fill="none" stroke="#ff6b35" strokeWidth="1.5" opacity="0.7"/>
    <text x="14" y="74" fill="white" fontSize="14" fontFamily="monospace" fontWeight="bold">108,105</text>
    <text x="14" y="86" fill={accent} fontSize="7" fontFamily="monospace">+1.55% REAL-TIME</text>
    {[["1.306,584","#00ffaa",14],["100.00","#ff6b35",80],["1.55%",accent,148]].map(([v,c,x])=>(
      <g key={v}>
        <rect x={x} y="147" width="63" height="10" rx="2" fill="rgba(0,30,50,0.6)"/>
        <text x={x+3} y="155" fill={c} fontSize="7" fontFamily="monospace">{v}</text>
      </g>
    ))}
    <g transform="translate(178,68)">
      <rect x="28" y="75" width="45" height="52" rx="8" fill="#e8e8e8" stroke="#ccc" strokeWidth="1"/>
      <rect x="35" y="83" width="30" height="18" rx="3" fill="rgba(0,0,0,0.2)"/>
      <circle cx="45" cy="92" r="5" fill="#ff6b35" opacity="0.8"/>
      <circle cx="55" cy="92" r="5" fill={accent} opacity="0.8"/>
      <rect x="30" y="48" width="40" height="30" rx="10" fill="#f0f0f0" stroke="#ddd" strokeWidth="1"/>
      <circle cx="50" cy="63" r="12" fill="#222"/>
      <circle cx="50" cy="63" r="8" fill="#ff6b35" opacity="0.9"/>
      <circle cx="50" cy="63" r="4" fill="white" opacity="0.8"/>
      <rect x="8" y="78" width="22" height="9" rx="5" fill="#ddd"/>
      <rect x="70" y="78" width="22" height="9" rx="5" fill="#ddd"/>
      <circle cx="50" cy="63" r="18" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
    </g>
    {[[28,210],[66,192],[106,206],[146,196]].map(([x,y],i)=>(
      <g key={i}><circle cx={x} cy={y} r="4" fill={accent} opacity="0.6"/>
      {i<3&&<line x1={x} y1={y} x2={x+38} y2={y-8+i*4} stroke={accent} strokeWidth="0.5" opacity="0.3"/>}</g>
    ))}
    <text x="8" y="272" fill={accent} fontSize="7" fontFamily="monospace" opacity="0.5">NEURAL NETWORK · PROCESSING · 847ms</text>
  </svg>
);

const IndustrialIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="indBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#000f08"/><stop offset="100%" stopColor="#000a05"/>
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#indBg)"/>
    <rect x="8" y="18" width="384" height="9" rx="2" fill="#0d2010" stroke={accent} strokeWidth="0.5"/>
    {[0,1,2,3,4,5].map(i=>(
      <g key={i}>
        <rect x={8+i*65} y="32" width="58" height="40" rx="3" fill="rgba(0,20,15,0.95)" stroke={accent} strokeWidth="1"/>
        {i===0&&<><circle cx="37" cy="52" r="13" fill="none" stroke={accent} strokeWidth="2" opacity="0.4"/>
          <circle cx="37" cy="52" r="13" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="57 25" opacity="0.9" transform="rotate(-90 37 52)"/>
          <text x="37" y="56" textAnchor="middle" fill={accent} fontSize="8" fontFamily="monospace">76%</text></>}
        {i===1&&<polyline points={`${15+i*65},68 ${23+i*65},58 ${31+i*65},63 ${39+i*65},50 ${47+i*65},55 ${55+i*65},45 ${63+i*65},48`} fill="none" stroke={accent} strokeWidth="1.5"/>}
        {i===2&&<>
          <rect x={13+i*65} y="38" width="10" height="26" rx="1" fill={accent} opacity="0.6"/>
          <rect x={28+i*65} y="46" width="10" height="18" rx="1" fill={accent} opacity="0.4"/>
          <rect x={43+i*65} y="40" width="10" height="24" rx="1" fill="#00ffaa" opacity="0.4"/>
        </>}
        {i===3&&<polyline points={`${15+i*65},68 ${25+i*65},58 ${35+i*65},62 ${45+i*65},50 ${55+i*65},54 ${63+i*65},44`} fill="none" stroke="#00ffaa" strokeWidth="1.5"/>}
        {i===4&&<>
          <text x={13+i*65} y="50" fill={accent} fontSize="10" fontFamily="monospace" fontWeight="bold">24.7°</text>
          <text x={13+i*65} y="62" fill="white" fontSize="6" fontFamily="monospace">TEMP OK</text>
        </>}
        {i===5&&<>
          <circle cx={38+i*65} cy="52" r="12" fill="none" stroke={accent} strokeWidth="1" opacity="0.3"/>
          <line x1={38+i*65} y1="52" x2={47+i*65} y2="44" stroke={accent} strokeWidth="2"/>
          <line x1={38+i*65} y1="52" x2={33+i*65} y2="43" stroke="#00ffaa" strokeWidth="1.5"/>
          <circle cx={38+i*65} cy="52" r="3" fill={accent}/>
        </>}
      </g>
    ))}
    <rect x="75" y="142" width="250" height="11" rx="3" fill="#0d2010" stroke={accent} strokeWidth="0.8"/>
    <rect x="150" y="94" width="100" height="50" rx="4" fill="rgba(0,20,15,0.95)" stroke={accent} strokeWidth="1.5"/>
    <polyline points="162,110 175,100 188,104 201,95 214,98 227,90" fill="none" stroke={accent} strokeWidth="1.5"/>
    <polyline points="162,120 175,116 188,118 201,112 214,115 227,108" fill="none" stroke="#00ffaa" strokeWidth="1" opacity="0.7"/>
    <rect x="150" y="142" width="100" height="3" rx="1" fill="#0d2010" stroke={accent} strokeWidth="0.5"/>
    <rect x="172" y="152" width="56" height="7" rx="3" fill="#0a1a0f"/>
    <rect x="178" y="159" width="44" height="55" rx="5" fill="#0a1a0f" stroke={accent} strokeWidth="0.5" opacity="0.5"/>
    <ellipse cx="200" cy="152" rx="16" ry="9" fill="#1a3a20"/>
    <rect x="188" y="134" width="24" height="20" rx="7" fill="#1a3a20"/>
    <circle cx="200" cy="127" r="9" fill="#1a3a20"/>
    <rect x="22" y="108" width="72" height="44" rx="3" fill="rgba(0,20,15,0.9)" stroke={accent} strokeWidth="1"/>
    <rect x="306" y="108" width="72" height="44" rx="3" fill="rgba(0,20,15,0.9)" stroke={accent} strokeWidth="1"/>
    {[0,1,2,3].map(i=><rect key={i} x="25" y={113+i*9} width={38+i*7} height="5" rx="1" fill={accent} opacity={0.2+i*0.1}/>)}
    <polyline points="309,146 319,134 329,139 339,126 349,130 361,122 369,124" fill="none" stroke={accent} strokeWidth="1.5"/>
    {[["ONLINE",accent,18,244],["NOMINAL","#00ffaa",96,244],["WARNING","#f59e0b",184,244],["ACTIVE",accent,272,244]].map(([t,c,x,y])=>(
      <g key={t}><circle cx={x+5} cy={y} r="4" fill={c} opacity="0.8"/>
      <text x={x+13} y={y+4} fill={c} fontSize="7" fontFamily="monospace">{t}</text></g>
    ))}
    <rect x="8" y="262" width="184" height="14" rx="3" fill="rgba(0,0,0,0.5)"/>
    <text x="15" y="272" fill={accent} fontSize="8" fontFamily="monospace">SCADA CONTROL ROOM · LIVE</text>
  </svg>
);

const ERPIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="erpBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#08001a"/><stop offset="100%" stopColor="#040010"/>
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#erpBg)"/>
    <circle cx="200" cy="140" r="34" fill="rgba(100,50,180,0.15)" stroke={accent} strokeWidth="1.5"/>
    <circle cx="200" cy="140" r="21" fill="rgba(100,50,180,0.2)" stroke={accent} strokeWidth="1"/>
    <text x="200" y="136" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace" fontWeight="bold">ERP</text>
    <text x="200" y="148" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace">CORE</text>
    {[["Finance",58,52,"#00ffaa"],["HR",342,52,"#f472b6"],["Supply",58,228,"#f59e0b"],["CRM",342,228,accent],["BI",200,24,"#22d3ee"],["Ops",200,256,accent]].map(([label,x,y,color])=>(
      <g key={label}>
        <line x1="200" y1="140" x2={x} y2={y} stroke={color} strokeWidth="1" strokeDasharray="5 4" opacity="0.4"/>
        <rect x={x-28} y={y-17} width="56" height="34" rx="8" fill="rgba(0,0,20,0.9)" stroke={color} strokeWidth="1.5"/>
        <text x={x} y={y-2} textAnchor="middle" fill={color} fontSize="8" fontFamily="monospace" fontWeight="bold">{label}</text>
        <text x={x} y={y+10} textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" opacity="0.6">MODULE</text>
        <circle cx={x+(200-x)*0.35} cy={y+(140-y)*0.35} r="2.5" fill={color} opacity="0.7"/>
        <circle cx={x+(200-x)*0.65} cy={y+(140-y)*0.65} r="2" fill={color} opacity="0.5"/>
      </g>
    ))}
    <rect x="8" y="8" width="100" height="68" rx="5" fill="rgba(0,0,20,0.9)" stroke={accent} strokeWidth="1"/>
    <text x="15" y="22" fill={accent} fontSize="7" fontFamily="monospace">REVENUE</text>
    <text x="15" y="38" fill="white" fontSize="13" fontFamily="monospace" fontWeight="bold">৳2.4M</text>
    <text x="15" y="50" fill="#00ffaa" fontSize="7" fontFamily="monospace">▲ 18.5%</text>
    <polyline points="12,72 22,65 32,67 42,59 52,61 62,53 72,55 82,47 92,50 102,46" fill="none" stroke="#00ffaa" strokeWidth="1.5" opacity="0.8"/>
    <rect x="292" y="8" width="105" height="68" rx="5" fill="rgba(0,0,20,0.9)" stroke={accent} strokeWidth="1"/>
    <text x="298" y="22" fill={accent} fontSize="7" fontFamily="monospace">EMPLOYEES</text>
    <text x="298" y="38" fill="white" fontSize="13" fontFamily="monospace" fontWeight="bold">1,284</text>
    {[0,1,2].map(i=>(
      <g key={i}>
        <rect x="298" y={48+i*8} width="90" height="5" rx="2" fill="rgba(255,255,255,0.1)"/>
        <rect x="298" y={48+i*8} width={[70,55,80][i]} height="5" rx="2" fill={["#f472b6","#f59e0b",accent][i]} opacity="0.6"/>
      </g>
    ))}
  </svg>
);

const CloudIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cloudBg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#000c14"/><stop offset="100%" stopColor="#000810"/>
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#cloudBg2)"/>
    <circle cx="168" cy="74" r="38" fill="rgba(0,30,50,0.8)" stroke={accent} strokeWidth="1.5"/>
    <circle cx="208" cy="62" r="30" fill="rgba(0,30,50,0.8)" stroke={accent} strokeWidth="1.5"/>
    <circle cx="242" cy="74" r="26" fill="rgba(0,30,50,0.8)" stroke={accent} strokeWidth="1.5"/>
    <rect x="133" y="74" width="140" height="38" rx="0" fill="rgba(0,30,50,0.8)"/>
    <line x1="133" y1="112" x2="273" y2="112" stroke={accent} strokeWidth="1.5"/>
    <text x="203" y="80" textAnchor="middle" fill={accent} fontSize="10" fontFamily="monospace" fontWeight="bold">CLOUD</text>
    <text x="203" y="95" textAnchor="middle" fill="white" fontSize="7" fontFamily="monospace" opacity="0.7">INFRASTRUCTURE</text>
    {[[75,162],[175,162],[275,162],[355,174]].map(([x,y],i)=>(
      <g key={i}>
        <line x1={x} y1={y-10} x2={[166,202,238,258][i]} y2="112" stroke={accent} strokeWidth="1" strokeDasharray="4 3" opacity="0.4"/>
        <rect x={x-28} y={y} width="58" height="38" rx="5" fill="rgba(0,15,30,0.9)" stroke={accent} strokeWidth="1.2"/>
        {[0,1,2].map(j=><rect key={j} x={x-20} y={y+5+j*10} width="42" height="5" rx="2" fill={accent} opacity={0.1+j*0.1}/>)}
        <circle cx={x+18} cy={y+6} r="3" fill={["#00ffaa","#00ffaa","#f59e0b",accent][i]} opacity="0.9"/>
        <text x={x} y={y+48} textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace">{["K8S","CI/CD","DB","CDN"][i]}</text>
      </g>
    ))}
    <g transform="translate(0,224)">
      {["BUILD","TEST","DEPLOY","LIVE"].map((step,i)=>(
        <g key={step}>
          <rect x={10+i*95} y="4" width="75" height="26" rx="5" fill="rgba(0,15,30,0.9)" stroke={["#f59e0b",accent,"#00ffaa","#00ffaa"][i]} strokeWidth="1.2"/>
          <text x={47+i*95} y="15" textAnchor="middle" fill={["#f59e0b",accent,"#00ffaa","#00ffaa"][i]} fontSize="8" fontFamily="monospace" fontWeight="bold">{step}</text>
          <text x={47+i*95} y="25" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" opacity="0.5">{["src push","passing","k8s","99.9%"][i]}</text>
          {i<3&&<polygon points={`${86+i*95},17 ${92+i*95},13 ${92+i*95},21`} fill={accent} opacity="0.6"/>}
        </g>
      ))}
    </g>
  </svg>
);

const MobileIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mobBg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#130010"/><stop offset="100%" stopColor="#0a0008"/>
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#mobBg2)"/>
    <rect x="148" y="16" width="104" height="188" rx="16" fill="rgba(0,0,10,0.95)" stroke={accent} strokeWidth="2"/>
    <rect x="154" y="30" width="92" height="160" rx="6" fill="rgba(10,0,15,0.9)"/>
    <rect x="183" y="20" width="34" height="7" rx="4" fill="#111"/>
    <rect x="158" y="36" width="84" height="15" rx="3" fill="rgba(244,114,182,0.2)" stroke={accent} strokeWidth="0.5"/>
    <text x="200" y="47" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace">RIZOTIC APP</text>
    <rect x="158" y="57" width="38" height="26" rx="4" fill="rgba(244,114,182,0.1)" stroke={accent} strokeWidth="0.8"/>
    <text x="177" y="68" textAnchor="middle" fill={accent} fontSize="8" fontFamily="monospace" fontWeight="bold">84%</text>
    <text x="177" y="78" textAnchor="middle" fill="white" fontSize="5" fontFamily="monospace">UPTIME</text>
    <rect x="202" y="57" width="38" height="26" rx="4" fill="rgba(0,212,255,0.1)" stroke={accent} strokeWidth="0.8"/>
    <text x="221" y="68" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="monospace" fontWeight="bold">247</text>
    <text x="221" y="78" textAnchor="middle" fill="white" fontSize="5" fontFamily="monospace">ALERTS</text>
    <polyline points="160,108 170,98 180,101 190,91 200,94 210,85 220,87 230,81" fill="none" stroke={accent} strokeWidth="1.5" opacity="0.9"/>
    <polyline points="160,114 170,110 180,112 190,106 200,109 210,103 220,105 230,100" fill="none" stroke="#f472b6" strokeWidth="1" opacity="0.6"/>
    {[0,1,2].map(i=>(
      <g key={i}>
        <rect x="158" y={124+i*14} width="84" height="10" rx="2" fill="rgba(255,255,255,0.04)"/>
        <circle cx="165" cy={129+i*14} r="3" fill={[accent,"#00ffaa","#f472b6"][i]} opacity="0.8"/>
        <rect x="172" y={127+i*14} width={[42,55,36][i]} height="3" rx="1" fill="white" opacity="0.2"/>
      </g>
    ))}
    <rect x="183" y="196" width="34" height="3" rx="2" fill={accent} opacity="0.5"/>
    <g transform="rotate(-15 318 148)">
      <rect x="278" y="68" width="80" height="140" rx="12" fill="rgba(0,0,10,0.9)" stroke="#f472b6" strokeWidth="1.5"/>
      <rect x="284" y="80" width="68" height="116" rx="5" fill="rgba(10,0,15,0.8)"/>
      <circle cx="318" cy="118" r="21" fill="none" stroke="#f472b6" strokeWidth="1" opacity="0.3"/>
      <circle cx="318" cy="118" r="21" fill="none" stroke="#f472b6" strokeWidth="3" strokeDasharray="78 54" strokeLinecap="round" opacity="0.8" transform="rotate(-90 318 118)"/>
      <text x="318" y="115" textAnchor="middle" fill="#f472b6" fontSize="11" fontFamily="monospace" fontWeight="bold">72%</text>
      <text x="318" y="126" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace">SCORE</text>
      {[0,1,2].map(i=><rect key={i} x="286" y={148+i*12} width={[52,36,46][i]} height="7" rx="2" fill="#f472b6" opacity={0.1+i*0.05}/>)}
    </g>
    {[[36,52,accent],[36,116,accent],[44,188,"#f472b6"]].map(([x,y,c],i)=>(
      <g key={i}>
        <rect x={x} y={y} width="82" height="34" rx="8" fill="rgba(0,0,15,0.85)" stroke={c} strokeWidth="1"/>
        <text x={x+7} y={y+13} fill={c} fontSize="7" fontFamily="monospace">{["iOS Native","Android","Flutter"][i]}</text>
        <rect x={x+7} y={y+17} width="55" height="4" rx="2" fill={c} opacity="0.3"/>
        <rect x={x+7} y={y+23} width="36" height="3" rx="1.5" fill={c} opacity="0.2"/>
      </g>
    ))}
  </svg>
);


const GarmentsIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grmBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0a0a00"/><stop offset="100%" stopColor="#050500"/>
      </linearGradient>
      <linearGradient id="fabricGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a017"/><stop offset="100%" stopColor="#b8860b"/>
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#grmBg)"/>
    {/* Conveyor belt */}
    <rect x="0" y="210" width="400" height="18" rx="4" fill="#1a1a00" stroke={accent} strokeWidth="1"/>
    {[0,1,2,3,4,5,6,7,8,9].map(i=>(
      <rect key={i} x={i*44} y="210" width="2" height="18" fill={accent} opacity="0.2"/>
    ))}
    {/* Sewing machines */}
    {[[30,130],[130,130],[230,130]].map(([x,y],i)=>(
      <g key={i}>
        {/* Machine body */}
        <rect x={x} y={y} width="72" height="50" rx="6" fill="#1a1500" stroke={accent} strokeWidth="1.2"/>
        <rect x={x+6} y={y+8} width="60" height="20" rx="3" fill="#252000" stroke={accent} strokeWidth="0.5"/>
        {/* Needle arm */}
        <rect x={x+28} y={y-22} width="6" height="30" rx="3" fill="#333" stroke={accent} strokeWidth="0.8"/>
        <rect x={x+20} y={y-22} width="22" height="6" rx="3" fill="#333" stroke={accent} strokeWidth="0.8"/>
        {/* Needle */}
        <rect x={x+30} y={y+8} width="2" height="14" rx="1" fill={accent} opacity="0.9"/>
        {/* Stitch line on fabric */}
        <rect x={x-5} y={y+48} width="82" height="8" rx="2" fill="#c8a000" opacity="0.25"/>
        {[0,1,2,3,4,5,6,7,8].map(j=>(
          <rect key={j} x={x-3+j*9} y={y+50} width="4" height="4" rx="1" fill={accent} opacity="0.5"/>
        ))}
        {/* Control panel lights */}
        <circle cx={x+55} cy={y+14} r="3" fill={["#00ffaa","#f59e0b",accent][i]} opacity="0.9"/>
        <circle cx={x+55} cy={y+26} r="3" fill={accent} opacity="0.4"/>
        {/* Speed dial */}
        <circle cx={x+20} cy={y+32} r="8" fill="#1a1500" stroke={accent} strokeWidth="0.8"/>
        <line x1={x+20} y1={y+32} x2={x+26} y2={y+27} stroke={accent} strokeWidth="1.5"/>
      </g>
    ))}
    {/* Robotic arm above last machine */}
    <rect x="290" y="60" width="10" height="80" rx="5" fill="#333" stroke={accent} strokeWidth="1"/>
    <rect x="280" y="60" width="30" height="8" rx="4" fill="#444" stroke={accent} strokeWidth="0.8"/>
    <rect x="295" y="108" width="50" height="8" rx="4" fill="#333" stroke={accent} strokeWidth="0.8"/>
    <circle cx="340" cy="112" r="8" fill="#222" stroke={accent} strokeWidth="1"/>
    <circle cx="340" cy="112" r="4" fill={accent} opacity="0.7"/>
    {/* Fabric roll */}
    <ellipse cx="360" cy="155" rx="22" ry="35" fill="url(#fabricGrad)" stroke={accent} strokeWidth="1"/>
    <ellipse cx="360" cy="155" rx="14" ry="25" fill="#c8900d" opacity="0.6"/>
    <ellipse cx="360" cy="155" rx="6" ry="12" fill="#b07a00" opacity="0.8"/>
    {/* Camera / vision sensor */}
    <rect x="58" y="60" width="50" height="36" rx="6" fill="#111" stroke={accent} strokeWidth="1.2"/>
    <circle cx="83" cy="78" r="12" fill="#0a0a0a" stroke={accent} strokeWidth="1"/>
    <circle cx="83" cy="78" r="7" fill="#1a1a1a"/>
    <circle cx="83" cy="78" r="3" fill={accent} opacity="0.7"/>
    {/* Scan lines from camera */}
    <line x1="83" y1="96" x2="33" y2="130" stroke={accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4"/>
    <line x1="83" y1="96" x2="83" y2="130" stroke={accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4"/>
    <line x1="83" y1="96" x2="133" y2="130" stroke={accent} strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4"/>
    {/* HUD overlay */}
    <rect x="8" y="8" width="145" height="48" rx="5" fill="rgba(0,0,0,0.7)" stroke={accent} strokeWidth="1"/>
    <text x="15" y="22" fill={accent} fontSize="8" fontFamily="monospace" fontWeight="bold">GARMENTS AI VISION</text>
    <text x="15" y="34" fill="white" fontSize="7" fontFamily="monospace">Quality: <tspan fill="#00ffaa">PASS</tspan></text>
    <text x="15" y="45" fill="white" fontSize="7" fontFamily="monospace">Defects: <tspan fill="#00ffaa">0</tspan>  Speed: <tspan fill={accent}>420/hr</tspan></text>
    {/* Garment hanging */}
    <line x1="190" y1="10" x2="190" y2="45" stroke={accent} strokeWidth="1" opacity="0.4"/>
    <path d="M175,45 L190,35 L205,45 L210,75 L170,75 Z" fill="#c8a000" opacity="0.3" stroke={accent} strokeWidth="0.8"/>
    <line x1="170" y1="75" x2="165" y2="105" stroke={accent} strokeWidth="0.8" opacity="0.5"/>
    <line x1="210" y1="75" x2="215" y2="105" stroke={accent} strokeWidth="0.8" opacity="0.5"/>
  </svg>
);

const WebsiteIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="webBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#000818"/><stop offset="100%" stopColor="#000510"/>
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#webBg)"/>
    {/* Browser window */}
    <rect x="20" y="15" width="260" height="200" rx="8" fill="rgba(5,15,30,0.95)" stroke={accent} strokeWidth="1.5"/>
    {/* Browser top bar */}
    <rect x="20" y="15" width="260" height="28" rx="8" fill="rgba(0,20,40,0.9)"/>
    <rect x="20" y="29" width="260" height="14" fill="rgba(0,20,40,0.9)"/>
    {/* Traffic lights */}
    <circle cx="36" cy="29" r="4" fill="#ff5f57"/>
    <circle cx="50" cy="29" r="4" fill="#febc2e"/>
    <circle cx="64" cy="29" r="4" fill="#28c840"/>
    {/* URL bar */}
    <rect x="78" y="22" width="155" height="14" rx="7" fill="rgba(0,0,0,0.4)" stroke={accent} strokeWidth="0.5"/>
    <text x="86" y="33" fill={accent} fontSize="7" fontFamily="monospace" opacity="0.8">rizotic.com</text>
    {/* Reload icon */}
    <text x="244" y="33" fill={accent} fontSize="9" fontFamily="monospace" opacity="0.5">⟳</text>
    {/* Website content */}
    {/* Hero section */}
    <rect x="28" y="50" width="244" height="55" rx="3" fill="rgba(0,212,255,0.06)" stroke={accent} strokeWidth="0.5"/>
    <rect x="36" y="58" width="100" height="10" rx="2" fill={accent} opacity="0.5"/>
    <rect x="36" y="72" width="140" height="6" rx="2" fill="white" opacity="0.15"/>
    <rect x="36" y="81" width="110" height="6" rx="2" fill="white" opacity="0.1"/>
    <rect x="36" y="94" width="50" height="8" rx="4" fill={accent} opacity="0.7"/>
    <rect x="94" y="94" width="50" height="8" rx="4" fill="transparent" stroke={accent} strokeWidth="0.8"/>
    {/* Nav bar inside browser */}
    <rect x="28" y="43" width="244" height="8" fill="rgba(0,10,20,0.8)"/>
    {["Home","About","Services","Contact"].map((item,i)=>(
      <text key={item} x={36+i*58} y="50" fill={i===0?accent:"rgba(255,255,255,0.4)"} fontSize="5.5" fontFamily="monospace">{item}</text>
    ))}
    {/* Services grid */}
    <text x="36" y="122" fill={accent} fontSize="6" fontFamily="monospace" opacity="0.7">OUR SERVICES</text>
    {[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]].map(([col,row],i)=>(
      <g key={i}>
        <rect x={28+col*82} y={128+row*30} width="76" height="24" rx="3" fill="rgba(0,212,255,0.05)" stroke={accent} strokeWidth="0.5" opacity="0.8"/>
        <rect x={34+col*82} y={132+row*30} width="20" height="5" rx="1" fill={accent} opacity="0.4"/>
        <rect x={34+col*82} y={140+row*30} width="50" height="3" rx="1" fill="white" opacity="0.12"/>
        <rect x={34+col*82} y={145+row*30} width="36" height="3" rx="1" fill="white" opacity="0.08"/>
      </g>
    ))}
    {/* Footer strip */}
    <rect x="28" y="194" width="244" height="14" rx="3" fill="rgba(0,0,0,0.5)"/>
    <text x="36" y="203" fill={accent} fontSize="6" fontFamily="monospace" opacity="0.5">© 2025 RIZOTIC TECHNOLOGIES</text>
    {/* Code editor panel on right */}
    <rect x="295" y="15" width="97" height="200" rx="8" fill="rgba(5,10,20,0.95)" stroke={accent} strokeWidth="1"/>
    <rect x="295" y="15" width="97" height="20" rx="8" fill="rgba(0,15,30,0.9)"/>
    <rect x="295" y="25" width="97" height="10" fill="rgba(0,15,30,0.9)"/>
    <text x="302" y="28" fill={accent} fontSize="7" fontFamily="monospace">index.jsx</text>
    {/* Code lines */}
    {[
      {x:302,y:48,w:60,c:"#ff6b35",t:"import"},
      {x:302,y:60,w:80,c:accent,t:"function App()"},
      {x:302,y:72,w:20,c:"white",t:"  return ("},
      {x:302,y:84,w:70,c:"#00ffaa",t:"    <Hero />"},
      {x:302,y:96,w:70,c:"#00ffaa",t:"    <Services />"},
      {x:302,y:108,w:65,c:"#00ffaa",t:"    <Contact />"},
      {x:302,y:120,w:20,c:"white",t:"  )"},
      {x:302,y:132,w:15,c:"white",t:"}"},
      {x:302,y:152,w:55,c:"#a855f7",t:"// Tailwind CSS"},
      {x:302,y:164,w:70,c:accent,t:".hero { display:"},
      {x:302,y:176,w:50,c:accent,t:"  grid; gap:"},
      {x:302,y:188,w:40,c:"white",t:"}"},
    ].map(({x,y,w,c,t},i)=>(
      <text key={i} x={x} y={y} fill={c} fontSize="6" fontFamily="monospace" opacity="0.85">{t}</text>
    ))}
    {/* Cursor blink */}
    <rect x="302" y="193" width="5" height="8" rx="1" fill={accent} opacity="0.8"/>
    {/* Mobile preview */}
    <rect x="165" y="230" width="46" height="40" rx="6" fill="rgba(5,15,30,0.9)" stroke={accent} strokeWidth="1"/>
    <rect x="168" y="237" width="40" height="28" rx="2" fill="rgba(0,212,255,0.05)"/>
    <rect x="170" y="240" width="36" height="5" rx="1" fill={accent} opacity="0.3"/>
    <rect x="170" y="248" width="26" height="3" rx="1" fill="white" opacity="0.15"/>
    <rect x="170" y="253" width="20" height="3" rx="1" fill="white" opacity="0.1"/>
    <rect x="186" y="267" width="10" height="2" rx="1" fill={accent} opacity="0.4"/>
    {/* Tablet preview */}
    <rect x="220" y="228" width="65" height="44" rx="5" fill="rgba(5,15,30,0.9)" stroke={accent} strokeWidth="1"/>
    <rect x="224" y="234" width="57" height="34" rx="2" fill="rgba(0,212,255,0.04)"/>
    <rect x="227" y="237" width="50" height="6" rx="1" fill={accent} opacity="0.25"/>
    {[0,1].map(i=><rect key={i} x={227+i*27} y={247} width="24" height="16" rx="2" fill={accent} opacity="0.08" stroke={accent} strokeWidth="0.4"/>)}
    <circle cx="252" cy="269" r="2" fill={accent} opacity="0.4"/>
    {/* Responsive label */}
    <rect x="8" y="238" width="148" height="30" rx="5" fill="rgba(0,0,0,0.6)" stroke={accent} strokeWidth="0.8"/>
    <text x="15" y="251" fill={accent} fontSize="7" fontFamily="monospace" fontWeight="bold">RESPONSIVE DESIGN</text>
    <text x="15" y="262" fill="white" fontSize="6" fontFamily="monospace" opacity="0.5">Mobile · Tablet · Desktop</text>
  </svg>
);


const IndustrialAutoIllustration = ({ accent }) => (
  <svg viewBox="0 0 400 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="iaBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#001510"/><stop offset="100%" stopColor="#000a08"/>
      </linearGradient>
      <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2a4a3a"/><stop offset="100%" stopColor="#1a3028"/>
      </linearGradient>
    </defs>
    <rect width="400" height="280" fill="url(#iaBg)"/>
    {/* Factory structure */}
    <rect x="0" y="230" width="400" height="50" fill="#0a1a10"/>
    <rect x="0" y="228" width="400" height="4" fill={accent} opacity="0.15"/>
    {/* Large industrial pipes */}
    <rect x="30" y="80" width="20" height="152" rx="4" fill="url(#pipeGrad)" stroke={accent} strokeWidth="0.8"/>
    <rect x="20" y="76" width="40" height="12" rx="3" fill="#2a4a3a" stroke={accent} strokeWidth="0.8"/>
    <rect x="20" y="220" width="40" height="12" rx="3" fill="#2a4a3a" stroke={accent} strokeWidth="0.8"/>
    {/* Pipe flow indicators */}
    {[100,130,160,190].map(y=>(
      <g key={y}>
        <rect x="34" y={y} width="12" height="6" rx="1" fill={accent} opacity="0.3"/>
        <rect x="34" y={y} width="8" height="6" rx="1" fill={accent} opacity="0.6"/>
      </g>
    ))}
    {/* Horizontal connecting pipe */}
    <rect x="50" y="148" width="120" height="16" rx="4" fill="url(#pipeGrad)" stroke={accent} strokeWidth="0.8"/>
    <rect x="80" y="148" width="16" height="16" fill="#1a3028" stroke={accent} strokeWidth="0.5"/>
    <rect x="120" y="148" width="16" height="16" fill="#1a3028" stroke={accent} strokeWidth="0.5"/>
    {/* Pressure gauge */}
    <circle cx="100" cy="126" r="18" fill="#0d1f18" stroke={accent} strokeWidth="1.5"/>
    <circle cx="100" cy="126" r="12" fill="#0a1810" stroke={accent} strokeWidth="0.8" opacity="0.6"/>
    <circle cx="100" cy="126" r="18" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="72 41" opacity="0.8" transform="rotate(-90 100 126)"/>
    <line x1="100" y1="126" x2="108" y2="118" stroke={accent} strokeWidth="2"/>
    <circle cx="100" cy="126" r="3" fill={accent}/>
    <text x="100" y="148" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace">PSI</text>
    {/* PLC controller box */}
    <rect x="185" y="60" width="90" height="130" rx="6" fill="#0d1a10" stroke={accent} strokeWidth="1.5"/>
    <rect x="185" y="60" width="90" height="22" rx="6" fill="rgba(0,212,255,0.08)"/>
    <rect x="185" y="72" width="90" height="10" fill="rgba(0,212,255,0.08)"/>
    <text x="230" y="75" textAnchor="middle" fill={accent} fontSize="7" fontFamily="monospace" fontWeight="bold">PLC CTRL</text>
    {/* PLC LEDs */}
    {[0,1,2,3,4,5].map(i=>(
      <g key={i}>
        <circle cx={196+i*14} cy="92" r="4" fill={["#00ffaa","#00ffaa",accent,"#f59e0b","#00ffaa",accent][i]} opacity="0.9"/>
        <text x={196+i*14} y="104" textAnchor="middle" fill="white" fontSize="4.5" fontFamily="monospace" opacity="0.5">{["RUN","OUT","IN","ERR","COM","PWR"][i]}</text>
      </g>
    ))}
    {/* PLC terminal rows */}
    {[0,1,2,3].map(row=>(
      <g key={row}>
        {[0,1,2,3,4].map(col=>(
          <rect key={col} x={192+col*15} y={112+row*18} width="12" height="10" rx="2"
            fill="rgba(0,212,255,0.08)" stroke={accent} strokeWidth="0.5"/>
        ))}
      </g>
    ))}
    {/* Wiring from PLC */}
    {[115,130,145,160,175].map((y,i)=>(
      <line key={i} x1="185" y1={y} x2="170" y2={y} stroke={["#00ffaa",accent,"#f59e0b","#00ffaa",accent][i]} strokeWidth="1.2" opacity="0.6"/>
    ))}
    {/* Motor / actuator */}
    <ellipse cx="330" cy="155" rx="32" ry="32" fill="#0d1a10" stroke={accent} strokeWidth="1.5"/>
    <ellipse cx="330" cy="155" rx="22" ry="22" fill="#0a1410" stroke={accent} strokeWidth="1"/>
    <ellipse cx="330" cy="155" rx="32" ry="32" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="95 106" opacity="0.7" transform="rotate(30 330 155)"/>
    <ellipse cx="330" cy="155" rx="10" ry="10" fill={accent} opacity="0.15"/>
    <circle cx="330" cy="155" r="5" fill={accent} opacity="0.8"/>
    {/* Motor shaft */}
    <rect x="360" y="151" width="28" height="8" rx="3" fill="#2a4a3a" stroke={accent} strokeWidth="0.8"/>
    {/* RPM readout */}
    <rect x="296" y="200" width="70" height="30" rx="4" fill="rgba(0,0,0,0.6)" stroke={accent} strokeWidth="0.8"/>
    <text x="331" y="212" textAnchor="middle" fill={accent} fontSize="8" fontFamily="monospace" fontWeight="bold">1450</text>
    <text x="331" y="223" textAnchor="middle" fill="white" fontSize="6" fontFamily="monospace" opacity="0.5">RPM</text>
    {/* Temperature sensor */}
    <rect x="295" y="80" width="20" height="60" rx="4" fill="#0d1a10" stroke={accent} strokeWidth="1"/>
    <rect x="299" y="100" width="12" height="36" rx="2" fill="rgba(255,100,0,0.15)"/>
    <rect x="299" y={100+36-Math.round(36*0.72)} width="12" height={Math.round(36*0.72)} rx="2" fill="#f59e0b" opacity="0.6"/>
    <circle cx="305" cy="140" r="6" fill="#f59e0b" opacity="0.5"/>
    <text x="305" y="158" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">72°C</text>
    {/* HMI touchscreen */}
    <rect x="8" y="55" width="130" height="82" rx="6" fill="#0a1410" stroke={accent} strokeWidth="1.5"/>
    <rect x="8" y="55" width="130" height="18" rx="6" fill="rgba(0,212,255,0.07)"/>
    <rect x="8" y="63" width="130" height="10" fill="rgba(0,212,255,0.07)"/>
    <text x="15" y="68" fill={accent} fontSize="7" fontFamily="monospace" fontWeight="bold">HMI PANEL</text>
    {/* HMI content */}
    <text x="15" y="90" fill="white" fontSize="8" fontFamily="monospace">Line Speed</text>
    <rect x="15" y="94" width="90" height="8" rx="2" fill="rgba(255,255,255,0.08)"/>
    <rect x="15" y="94" width="68" height="8" rx="2" fill={accent} opacity="0.5"/>
    <text x="110" y="101" fill={accent} fontSize="7" fontFamily="monospace">75%</text>
    <text x="15" y="114" fill="white" fontSize="8" fontFamily="monospace">Output/hr</text>
    <text x="15" y="125" fill="#00ffaa" fontSize="11" fontFamily="monospace" fontWeight="bold">1,240</text>
    {/* Alarm indicator */}
    <rect x="90" y="110" width="42" height="20" rx="3" fill="rgba(0,255,170,0.1)" stroke="#00ffaa" strokeWidth="0.8"/>
    <text x="111" y="124" textAnchor="middle" fill="#00ffaa" fontSize="7" fontFamily="monospace">NORMAL</text>
    {/* Bottom label */}
    <rect x="8" y="252" width="200" height="16" rx="3" fill="rgba(0,0,0,0.5)"/>
    <text x="15" y="263" fill={accent} fontSize="8" fontFamily="monospace">PLC + HMI AUTOMATION SYSTEM</text>
  </svg>
);

// ── Slide data ───────────────────────────────────────────────────────
const SLIDES = [
  { slug:"iot-robotics",      title:"IoT & Smart Devices",         subtitle:"Custom hardware — PCB, firmware, cloud, every sector",     desc:"Custom PCB design, firmware & embedded systems — smart IoT products for agriculture, healthcare, smart buildings, energy and every other sector.", tag:"IoT & Smart Devices", accent:"#00d4ff", stats:[{v:"PCB→Cloud",l:"Full Stack"},{v:"10+",l:"Protocols"},{v:"All",l:"Sectors"}], Illustration:IoTIllustration },
  { slug:"ai-ml-solutions",   title:"AI / Machine Learning",       subtitle:"Intelligence at the core of everything",         desc:"Custom neural networks, computer vision pipelines, and NLP systems trained on your data — deployed at production scale.",     tag:"Artificial Intelligence", accent:"#ff6b35", stats:[{v:"95%",l:"Accuracy"},{v:"10x",l:"Faster"},{v:"Custom",l:"Models"}],   Illustration:AIIllustration  },
    { slug:"industrial-automation", title:"Industrial Automation",  subtitle:"Smart factories that run themselves",            desc:"PLC programming, HMI panels, SCADA systems — full Industry 4.0 automation that maximizes OEE and eliminates downtime.",        tag:"Smart Manufacturing", accent:"#00ffaa", stats:[{v:"40%",l:"Cost Down"},{v:"Zero",l:"Downtime"},{v:"OEE+",l:"Optimized"}], Illustration:IndustrialAutoIllustration },
  { slug:"erp-solutions",     title:"ERP Solutions",               subtitle:"One system for your entire business",           desc:"Unified enterprise platforms integrating finance, HR, supply chain, and CRM — real-time visibility across all operations.",    tag:"Enterprise Software", accent:"#a855f7", stats:[{v:"360°",l:"View"},{v:"Live",l:"Reports"},{v:"Custom",l:"Flows"}],    Illustration:ERPIllustration },
  { slug:"devops",            title:"Cloud & DevOps",              subtitle:"Infrastructure that scales with you",           desc:"CI/CD pipelines, Kubernetes orchestration, multi-cloud architecture — built for zero-downtime deployments at infinite scale.", tag:"Cloud Infrastructure",accent:"#22d3ee", stats:[{v:"99.9%",l:"Uptime"},{v:"<1min",l:"Deploy"},{v:"Auto",l:"Scale"}],   Illustration:CloudIllustration },
  { slug:"mobile-development",title:"Mobile Development",         subtitle:"Apps that users love to open",                  desc:"Native iOS & Android, React Native, Flutter — enterprise-grade mobile apps designed for performance and beautiful UX.",        tag:"Mobile Apps",         accent:"#f472b6", stats:[{v:"iOS+",l:"Android"},{v:"5★",l:"UX"},{v:"Fast",l:"Delivery"}],     Illustration:MobileIllustration },
  { slug:"garments-automation", title:"Garments Automation",        subtitle:"Smart textile factories, zero defects",         desc:"AI vision for quality inspection, automated cutting, robotic sewing lines, and real-time production tracking for garments factories.", tag:"Textile Industry",    accent:"#facc15", stats:[{v:"420/hr",l:"Output"},{v:"Zero",l:"Defects"},{v:"AI",l:"Vision"}],     Illustration:GarmentsIllustration },
  { slug:"website-development", title:"Website Development",        subtitle:"Modern, fast & responsive websites",           desc:"Full-stack web development — React, Next.js, custom CMS — designed to convert visitors into customers with stunning UI/UX.",       tag:"Web Development",     accent:"#34d399", stats:[{v:"100%",l:"Responsive"},{v:"Fast",l:"Load"},{v:"Custom",l:"Design"}],  Illustration:WebsiteIllustration },
];

// ── Component ────────────────────────────────────────────────────────
export default function HeroSlider({ framed = false }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = SLIDES.length;

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const goPrev = () => go((current - 1 + total) % total);
  const goNext = useCallback(() => go((current + 1) % total), [current, go, total]);

  useEffect(() => {
    const t = setTimeout(goNext, 5500);
    return () => clearTimeout(t);
  }, [current, goNext]);

  const slide = SLIDES[current];
  const { Illustration } = slide;

  const variants = {
    enter:  (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    // When framed=true the outer div is just a relative container, no border/bg of its own
    <div className="relative overflow-hidden" style={{ height: framed ? "420px" : "92vh", minHeight: framed ? "360px" : "500px" }}>

      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${slide.accent}09, transparent 60%),
                         radial-gradient(ellipse 50% 50% at 80% 80%, ${slide.accent}05, transparent 60%),
                         #000408`,
          }}
        >
          {/* Subtle grid inside slider */}
          <div className="absolute inset-0 cyber-grid opacity-30" />

          {/* Circuit lines bottom decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none overflow-hidden" style={{ opacity: 0.12 }}>
            <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
              <path d="M0,40 L180,40 L200,20 L420,20 L440,40 L640,40 L660,55 L860,55 L880,40 L1080,40 L1100,20 L1200,20"
                fill="none" stroke={slide.accent} strokeWidth="1.5"/>
              <path d="M0,50 L120,50 L140,35 L340,35 L360,50 L560,50 L580,18 L780,18 L800,50 L1200,50"
                fill="none" stroke={slide.accent} strokeWidth="0.8"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center px-5 sm:px-8 lg:px-10">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">

              {/* LEFT — Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="order-2 lg:order-1"
              >
                {/* Tag pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-mono mb-4"
                  style={{ border:`1px solid ${slide.accent}40`, color:slide.accent, background:`${slide.accent}10` }}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:slide.accent }}/>
                  {slide.tag}
                </div>

                <h2 className="font-display font-bold text-white leading-tight mb-1.5"
                  style={{ fontSize:"clamp(1.4rem, 3vw, 2.2rem)" }}>
                  {slide.title}
                </h2>

                <p className="font-medium text-sm mb-2" style={{ color:slide.accent }}>
                  {slide.subtitle}
                </p>

                <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-md">
                  {slide.desc}
                </p>

                {/* Stats row */}
                <div className="flex gap-6 mb-5 pb-5" style={{ borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
                  {slide.stats.map(s => (
                    <div key={s.l}>
                      <div className="font-display font-bold text-lg sm:text-xl" style={{ color:slide.accent }}>{s.v}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <Link to={`/services/${slide.slug}`}
                    className="inline-flex items-center gap-2 font-display font-semibold px-5 py-2 rounded-lg text-sm transition-all"
                    style={{ background:`linear-gradient(135deg,${slide.accent},${slide.accent}bb)`, color:"#000", boxShadow:`0 0 20px ${slide.accent}30` }}>
                    Explore <ChevronRight size={14}/>
                  </Link>
                  <Link to="/contact"
                    className="inline-flex items-center gap-2 font-display font-semibold px-5 py-2 rounded-lg text-sm"
                    style={{ border:`1px solid ${slide.accent}40`, color:slide.accent }}>
                    Get a Quote
                  </Link>
                </div>
              </motion.div>

              {/* RIGHT — Illustration */}
              <motion.div
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease:"easeOut" }}
                className="order-1 lg:order-2 flex items-center justify-center"
              >
                <div className="relative w-full" style={{ maxWidth:"420px" }}>
                  {/* Glow behind card */}
                  <div className="absolute -inset-3 rounded-2xl blur-2xl pointer-events-none"
                    style={{ background:`radial-gradient(ellipse, ${slide.accent}12, transparent 70%)` }}/>

                  {/* Illustration card frame */}
                  <div className="relative rounded-xl overflow-hidden"
                    style={{
                      border:`1px solid ${slide.accent}30`,
                      boxShadow:`0 0 0 1px ${slide.accent}08, 0 8px 28px rgba(0,0,0,0.5), 0 0 40px ${slide.accent}08`,
                    }}>

                    {/* Mini title bar */}
                    <div className="flex items-center justify-between px-3 py-1.5"
                      style={{ background:`linear-gradient(90deg,${slide.accent}10,rgba(0,0,0,0.4))`, borderBottom:`1px solid ${slide.accent}18` }}>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ background:"#ff5f57" }}/>
                        <div className="w-2 h-2 rounded-full" style={{ background:"#febc2e" }}/>
                        <div className="w-2 h-2 rounded-full" style={{ background:"#28c840" }}/>
                      </div>
                      <div className="font-mono text-xs" style={{ color:`${slide.accent}88` }}>{slide.tag}</div>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:"#00ffaa" }}/>
                        <span className="font-mono text-xs" style={{ color:"rgba(0,255,170,0.6)" }}>LIVE</span>
                      </div>
                    </div>

                    {/* SVG screen */}
                    <div className="relative" style={{ aspectRatio:"16/10" }}>
                      {/* Scanline */}
                      <div className="absolute inset-0 z-10 pointer-events-none"
                        style={{ background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)" }}/>
                      {/* Corner brackets inside screen */}
                      {[
                        { top:"6px", left:"6px",   borderTop:`1.5px solid ${slide.accent}`, borderLeft:`1.5px solid ${slide.accent}` },
                        { top:"6px", right:"6px",  borderTop:`1.5px solid ${slide.accent}`, borderRight:`1.5px solid ${slide.accent}` },
                        { bottom:"6px", left:"6px",  borderBottom:`1.5px solid ${slide.accent}`, borderLeft:`1.5px solid ${slide.accent}` },
                        { bottom:"6px", right:"6px", borderBottom:`1.5px solid ${slide.accent}`, borderRight:`1.5px solid ${slide.accent}` },
                      ].map((st,i)=>(
                        <div key={i} className="absolute z-20 pointer-events-none"
                          style={{ ...st, width:"12px", height:"12px", borderRadius:"2px", opacity:0.6 }}/>
                      ))}
                      <Illustration accent={slide.accent}/>
                    </div>

                    {/* Status bar */}
                    <div className="flex items-center justify-between px-3 py-1"
                      style={{ background:"rgba(0,0,0,0.5)", borderTop:`1px solid ${slide.accent}10` }}>
                      <div className="flex items-center gap-3">
                        {slide.stats.slice(0,2).map(s=>(
                          <div key={s.l} className="flex items-center gap-1">
                            <span className="font-mono text-xs font-bold" style={{ color:slide.accent }}>{s.v}</span>
                            <span className="font-mono text-xs" style={{ color:"rgba(255,255,255,0.25)" }}>{s.l}</span>
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-xs" style={{ color:"rgba(255,255,255,0.15)" }}>rizotic.com</span>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {[{ fn:goPrev, side:"left-2 sm:left-3", Icon:ChevronLeft }, { fn:goNext, side:"right-2 sm:right-3", Icon:ChevronRight }].map(({fn,side,Icon})=>(
        <button key={side} onClick={fn}
          className={`absolute ${side} top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all`}
          style={{ background:"rgba(0,0,0,0.6)", border:`1px solid ${slide.accent}25`, backdropFilter:"blur(6px)" }}
          onMouseEnter={e=>{ e.currentTarget.style.borderColor=slide.accent; e.currentTarget.style.boxShadow=`0 0 10px ${slide.accent}40`; }}
          onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${slide.accent}25`; e.currentTarget.style.boxShadow="none"; }}
        >
          <Icon size={14} className="text-white"/>
        </button>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_,i)=>(
          <button key={i} onClick={()=>go(i)} className="transition-all duration-300 rounded-full"
            style={{ width:i===current?"18px":"5px", height:"5px", background:i===current?slide.accent:"rgba(255,255,255,0.2)", boxShadow:i===current?`0 0 6px ${slide.accent}60`:"none" }}/>
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 right-3 z-20 font-mono text-xs hidden sm:block" style={{ color:"rgba(255,255,255,0.2)" }}>
        {String(current+1).padStart(2,"0")} / {String(total).padStart(2,"0")}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 z-20" style={{ background:"rgba(255,255,255,0.04)" }}>
        <motion.div key={current} initial={{ width:"0%" }} animate={{ width:"100%" }} transition={{ duration:5.5, ease:"linear" }}
          className="h-full" style={{ background:`linear-gradient(90deg,${slide.accent},${slide.accent}70)` }}/>
      </div>
    </div>
  );
}
