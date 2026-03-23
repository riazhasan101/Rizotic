// src/pages/ServiceDetail.jsx
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail } from "lucide-react";
import { SERVICES } from "../assets/data/services.js";
import { useTheme } from "../lib/theme.js";

const SERVICE_CONTENT = {
  "ai-ml-solutions":      { heroTag:"Artificial Intelligence",      headline:"AI & Machine Learning that drives real outcomes",          body:"Our AI/ML team builds production-grade models trained on your own data — from computer vision pipelines that catch defects in milliseconds to NLP engines that handle customer queries 24/7.",                                                                                  image:"https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80", imageAlt:"AI machine learning neural network", specs:[{label:"Model Types",value:"CNNs, Transformers, LLMs, GNNs"},{label:"Frameworks",value:"TensorFlow, PyTorch, HuggingFace"},{label:"Deployment",value:"REST API, Edge, Docker, Kubernetes"},{label:"Data Needed",value:"Min. 1,000 labelled samples"},{label:"Timeline",value:"8–16 weeks to production"},{label:"Accuracy",value:"90–98% depending on task"}], steps:["Requirements & data audit","Dataset labelling","Model architecture","Training & validation","Deployment","Continuous retraining"] },
  "iot-robotics":         { heroTag:"IoT & Smart Devices",           headline:"Custom IoT products — from PCB to cloud",                  body:"We design complete IoT products from scratch — PCB schematics, firmware, embedded systems, wireless connectivity, and cloud backends. We serve every sector: agriculture, healthcare, smart buildings, energy, retail, and beyond.",                      image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", imageAlt:"PCB circuit board IoT hardware",    specs:[{label:"Hardware Design",value:"PCB schematic, layout, prototyping"},{label:"MCUs",value:"STM32, ESP32, Arduino, Raspberry Pi"},{label:"Wireless",value:"WiFi, BLE, LoRa, Zigbee, NB-IoT"},{label:"Firmware",value:"C/C++, FreeRTOS, MicroPython"},{label:"Cloud",value:"AWS IoT, Azure IoT Hub, custom"},{label:"Sectors",value:"Agriculture, Healthcare, Buildings, Industry"}], steps:["Requirement study","PCB design","Firmware development","Prototype & testing","Cloud & app integration","Production support"] },
  "industrial-automation":{ heroTag:"Industrial Automation",         headline:"PLC, SCADA & HMI systems that maximise OEE",               body:"We modernise factory floors with full Industry 4.0 automation — PLC programming, HMI touchscreens, SCADA supervisory control, and MES integration that gives management real-time production visibility.",                                      image:"https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80", imageAlt:"Industrial automation control room",specs:[{label:"PLC Brands",value:"Siemens, Allen-Bradley, IDEC"},{label:"SCADA",value:"Ignition, WinCC, custom"},{label:"Protocols",value:"Profibus, Ethernet/IP, Modbus"},{label:"Industries",value:"Garments, Pharma, Food & Bev"},{label:"OEE Impact",value:"+15–30% typical"},{label:"Commissioning",value:"4–12 weeks on-site"}], steps:["P&ID review","PLC & panel design","Software development","Site installation","Commissioning & testing","Operator training"] },
  "software-services":    { heroTag:"Software Development",          headline:"Custom software built to last",                            body:"From greenfield enterprise platforms to modernizing legacy codebases, our engineers ship clean, tested, scalable software aligned precisely to your business processes and workflows.",                                                           image:"https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80", imageAlt:"Software development coding",       specs:[{label:"Stack",value:"React, Node.js, Python, Go"},{label:"Mobile",value:"React Native, Flutter"},{label:"Cloud",value:"AWS, Azure, GCP"},{label:"Testing",value:"Unit, Integration, E2E"},{label:"Methodology",value:"Agile / Scrum"},{label:"Delivery",value:"Weekly demos & releases"}], steps:["Requirements workshop","System architecture","Iterative sprints","QA & testing","Deployment & CI/CD","Maintenance"] },
  "devops":               { heroTag:"Cloud & DevOps",                 headline:"Infrastructure that scales with you",                      body:"CI/CD pipelines, Kubernetes orchestration, multi-cloud architecture — we build the engineering scaffolding so your team ships faster with zero-downtime deployments.",                                                                       image:"https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80", imageAlt:"Cloud server infrastructure",       specs:[{label:"Cloud",value:"AWS, Azure, GCP, multi-cloud"},{label:"Containers",value:"Docker, Kubernetes, Helm"},{label:"IaC",value:"Terraform, Pulumi, Ansible"},{label:"CI/CD",value:"GitHub Actions, GitLab CI"},{label:"Monitoring",value:"Prometheus, Grafana, Datadog"},{label:"Uptime SLA",value:"99.9% target"}], steps:["Infrastructure audit","Architecture design","Pipeline build","Container migration","Monitoring setup","Ongoing optimisation"] },
  "erp-solutions":        { heroTag:"Enterprise Resource Planning",  headline:"One system for your entire business",                     body:"Custom ERP implementations that fit your workflows — integrating finance, HR, inventory, and CRM into a single source of truth with real-time business intelligence.",                                                                     image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", imageAlt:"Business analytics ERP dashboard",  specs:[{label:"Modules",value:"Finance, HR, Inventory, CRM, BI"},{label:"Platforms",value:"Custom, Odoo, SAP integration"},{label:"Tech Stack",value:"React, Node.js, PostgreSQL"},{label:"Reporting",value:"Real-time dashboards"},{label:"Integration",value:"REST APIs, connectors"},{label:"Timeline",value:"12–24 weeks full impl."}], steps:["Process mapping","System design","Module development","Data migration","UAT & training","Go-live & support"] },
  "mobile-development":   { heroTag:"Mobile Development",            headline:"Apps that users love to open",                            body:"Native iOS & Android, React Native, Flutter — enterprise-grade mobile apps designed for performance, beautiful UX, and seamless integration with your backend systems.",                                                                   image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", imageAlt:"Mobile app development smartphone",  specs:[{label:"Platforms",value:"iOS, Android, cross-platform"},{label:"Frameworks",value:"React Native, Flutter, Swift"},{label:"Backend",value:"REST APIs, GraphQL, Firebase"},{label:"UI/UX",value:"Figma design & prototyping"},{label:"Distribution",value:"App Store & Play Store"},{label:"Timeline",value:"10–20 weeks to launch"}], steps:["UX research","UI design","Frontend development","Backend integration","Beta testing","Store submission"] },
  "garments-automation":  { heroTag:"Garments & Textile Automation", headline:"Smart factories for Bangladesh's RMG sector",             body:"We bring Industry 4.0 to the garments sector — AI vision for quality inspection, automated cutting & sewing lines, real-time production tracking, and worker safety monitoring across the factory floor.",                           image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", imageAlt:"Textile garments factory production", specs:[{label:"Vision AI",value:"Defect detection <50ms"},{label:"Output",value:"Up to 420 units/hr"},{label:"Integration",value:"ERP, MES, dashboards"},{label:"Compliance",value:"BGMEA standards"},{label:"ROI",value:"Payback 18–24 months"},{label:"Installation",value:"Minimal downtime"}], steps:["Factory assessment","System design","Hardware procurement","Vision AI dev","Pilot installation","Full rollout"] },
  "website-development":  { heroTag:"Web Development",               headline:"Modern, fast & lead-generating websites",                 body:"Full-stack web development — React, Next.js, custom CMS — designed to convert visitors into customers with stunning UI/UX, blazing performance, and full SEO optimization.",                                                                 image:"https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80", imageAlt:"Website development UI UX design",   specs:[{label:"Frontend",value:"React, Next.js, TypeScript"},{label:"Backend",value:"Node.js, Python, headless CMS"},{label:"Performance",value:"90+ Lighthouse score"},{label:"SEO",value:"Technical SEO + schema"},{label:"Responsive",value:"Mobile-first design"},{label:"Timeline",value:"4–10 weeks"}], steps:["Discovery & sitemap","UI/UX design","Frontend dev","CMS integration","SEO audit","Launch & maintenance"] },
};

function getFallback(service) {
  return {
    heroTag: service.name, headline: service.name + " — built for your business",
    body: service.detail || service.description,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    imageAlt: service.name,
    specs: service.features.map((f, i) => ({ label:`Capability ${i+1}`, value:f })),
    steps: ["Discovery","Design","Development","Testing","Deployment","Support"],
  };
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { mode }  = useTheme();
  const L         = mode === "light";
  const service   = SERVICES.find(s => s.slug === slug);
  const idx       = SERVICES.findIndex(s => s.slug === slug);
  const prev      = SERVICES[idx - 1];
  const next      = SERVICES[idx + 1];
  if (!service) return <Navigate to="/services" replace />;
  const content = SERVICE_CONTENT[slug] || getFallback(service);
  const acc = service.accentColor;
  const bg = {
    hero:    L ? "#eff6ff" : "var(--bg-1)",
    specs:   L ? "#ffffff" : "var(--bg-0)",
    process: L ? "#f0fdf4" : "var(--bg-1)",
    cta:     L ? `linear-gradient(135deg,${acc}22,${acc}08)` : `linear-gradient(135deg,${acc}18,${acc}06)`,
    nav:     L ? "#ffffff" : "var(--bg-0)",
    specsRowEven: L ? "#f7f9ff" : "var(--bg-1)",
    specsRowOdd:  L ? "#ffffff" : "var(--bg-0)",
    featureItem:  L ? "#f8fafc" : "var(--bg-1)",
  };

  return (
    <>
      <Helmet><title>{service.name} — RIZOTIC Technologies</title><meta name="description" content={service.description}/></Helmet>

      {/* Hero */}
      <section className="section-detail-hero" style={{ background:bg.hero, borderBottom:"1px solid var(--border)", paddingTop:"80px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/services" className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors" style={{ color:"var(--text-muted)" }}>
            <ArrowLeft size={14}/> Back to Services
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4"
                style={{ border:`1px solid ${acc}40`, background:`${acc}12`, color:acc }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background:acc }}/> {content.heroTag}
              </div>
              <h1 className="font-display font-bold leading-tight mb-4"
                style={{ fontSize:"clamp(1.8rem,3.5vw,3rem)", color:"var(--text-pri)" }}>{content.headline}</h1>
              <p className="leading-relaxed mb-6" style={{ color:"var(--text-sec)", fontSize:"0.95rem", maxWidth:"480px" }}>{content.body}</p>
              <div className="flex gap-3">
                <Link to="/contact" className="btn-primary" style={{ background:`linear-gradient(135deg,${acc},${acc}cc)` }}>
                  Start a Project <ArrowRight size={15}/>
                </Link>
                <a href="mailto:info@rizotic.com" className="btn-outline" style={{ borderColor:`${acc}60`, color:acc }}>
                  <Mail size={14}/> Email Us
                </a>
              </div>
            </motion.div>
            <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15, duration:0.6 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ height:"340px", border:`1px solid ${acc}25`, boxShadow:`0 8px 40px rgba(0,0,0,0.12), 0 0 0 1px ${acc}10` }}>
              <img src={content.image} alt={content.imageAlt} className="w-full h-full object-cover" loading="lazy"/>
              <div className="absolute inset-0" style={{ background:`linear-gradient(135deg,${acc}22 0%,rgba(0,0,0,0.1) 100%)` }}/>
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm"
                style={{ background:"rgba(0,0,0,0.55)", border:`1px solid ${acc}40` }}>
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <div className="font-display font-bold text-sm leading-tight" style={{ color:"#fff" }}>{service.name}</div>
                  <div className="text-xs font-mono" style={{ color:acc }}>{content.heroTag}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specs + Features */}
      <section className="section-detail-specs" style={{ background:"var(--bg-0)", borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="font-display font-bold text-2xl mb-6" style={{ color:"var(--text-pri)" }}>Service Specifications</h2>
              <div className="rounded-xl overflow-hidden" style={{ border:"1px solid var(--border)" }}>
                {content.specs.map((sp, i) => (
                  <div key={sp.label} className="grid grid-cols-2 gap-4 px-5 py-4"
                    style={{ borderBottom: i < content.specs.length-1 ? "1px solid var(--border)" : "none",
                      background: i%2===0 ? bg.specsRowEven : bg.specsRowOdd }}>
                    <div className="text-sm font-medium" style={{ color:"var(--text-muted)" }}>{sp.label}</div>
                    <div className="text-sm font-semibold" style={{ color:"var(--text-pri)" }}>{sp.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display font-bold text-2xl mb-6" style={{ color:"var(--text-pri)" }}>What's Included</h2>
              <ul className="space-y-3">
                {service.features.map(f => (
                  <li key={f} className="flex items-start gap-3 p-3 rounded-lg"
                    style={{ background:bg.featureItem, border:"1px solid var(--border)" }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background:`${acc}18`, border:`1px solid ${acc}35` }}>
                      <CheckCircle size={11} style={{ color:acc }}/>
                    </div>
                    <span className="text-sm leading-relaxed" style={{ color:"var(--text-pri)" }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Process */}
      <section className="section-detail-process" style={{ background:"var(--bg-1)", borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="font-display font-bold text-2xl mb-10 text-center" style={{ color:"var(--text-pri)" }}>How We Deliver It</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {content.steps.map((step, i) => (
              <motion.div key={step} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ delay: i*0.07 }} className="text-center">
                <div className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3 font-mono font-bold text-sm"
                  style={{ background:`linear-gradient(135deg,${acc},${acc}88)`, color:"#fff" }}>
                  {String(i+1).padStart(2,"0")}
                </div>
                <p className="text-xs leading-relaxed" style={{ color:"var(--text-sec)" }}>{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:`linear-gradient(135deg,${acc}18,${acc}06)`, borderBottom:"1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-2xl mb-1" style={{ color:"var(--text-pri)" }}>
                Ready to get started with {service.name}?
              </h2>
              <p className="text-sm" style={{ color:"var(--text-sec)" }}>Free 30-min discovery call · No commitment required</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link to="/contact" className="btn-primary" style={{ background:`linear-gradient(135deg,${acc},${acc}cc)` }}>
                <Phone size={14}/> Book a Call
              </Link>
              <a href="mailto:info@rizotic.com" className="btn-outline" style={{ borderColor:acc, color:acc }}>
                <Mail size={14}/> Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="section-detail-nav" style={{ background:"var(--bg-0)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center gap-4">
            {prev ? (
              <Link to={`/services/${prev.slug}`} className="flex items-center gap-3 card-base rounded-xl px-5 py-4 group">
                <ArrowLeft size={14} style={{ color:"var(--text-muted)" }}/>
                <div>
                  <div className="text-xs" style={{ color:"var(--text-muted)" }}>Previous</div>
                  <div className="text-sm font-semibold" style={{ color:"var(--text-pri)" }}>{prev.name}</div>
                </div>
              </Link>
            ) : <div/>}
            {next && (
              <Link to={`/services/${next.slug}`} className="flex items-center gap-3 card-base rounded-xl px-5 py-4 text-right group">
                <div>
                  <div className="text-xs" style={{ color:"var(--text-muted)" }}>Next</div>
                  <div className="text-sm font-semibold" style={{ color:"var(--text-pri)" }}>{next.name}</div>
                </div>
                <ArrowRight size={14} style={{ color:"var(--text-muted)" }}/>
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
