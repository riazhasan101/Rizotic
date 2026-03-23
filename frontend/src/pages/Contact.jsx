import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useContactForm } from "../hooks/useContactForm.js";
import { SERVICES } from "../assets/data/services.js";

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-mono mb-1.5" style={{ color:"var(--text-muted)" }}>{label}</label>
      {children}
      {error && <p className="mt-1 text-xs" style={{ color:"#ef4444" }}>{error}</p>}
    </div>
  );
}

export default function Contact() {
  const { values, errors, loading, success, handleChange, handleSubmit } = useContactForm();
  return (
    <>
      <Helmet><title>Contact — RIZOTIC Technologies</title></Helmet>
      <section className="section-contact-hero" style={{ background:bgHero, borderBottom:"1px solid var(--border)", paddingTop:"80px" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
            <p className="section-tag">Let's Talk</p>
            <h1 className="section-heading mb-2">Ready to <span className="gradient-text">Transform</span> Your Business?</h1>
            <p className="text-sm max-w-lg" style={{ color:"var(--text-sec)" }}>Tell us about your challenge. Our team responds within 1 business day.</p>
          </motion.div>
        </div>
      </section>
      <section className="section-contact-form" style={{ background:"var(--bg-0)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Contact info */}
            <motion.div className="lg:col-span-2 space-y-4"
              initial={{ opacity:0, x:-14 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              <div className="bracket-card card-base rounded-xl p-5">
                <h2 className="font-display font-bold text-lg mb-5" style={{ color:"var(--text-pri)" }}>Contact Details</h2>
                <div className="space-y-4">
                  {[
                    { icon:Mail,   label:"Email",    value:"info@rizotic.com",      href:"mailto:info@rizotic.com" },
                    { icon:Phone,  label:"Phone",    value:"+880 1614644644",        href:"tel:+8801614644644" },
                    { icon:MapPin, label:"Location", value:"Gazipur City, Bangladesh", href:null },
                  ].map(({ icon:Icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                        style={{ background:"var(--tag-bg)", border:"1px solid var(--border)" }}>
                        <Icon size={13} style={{ color:"var(--cyan)" }}/>
                      </div>
                      <div>
                        <p className="text-xs font-mono mb-0.5" style={{ color:"var(--text-muted)" }}>{label}</p>
                        {href
                          ? <a href={href} className="text-xs transition-colors" style={{ color:"var(--text-pri)" }}>{value}</a>
                          : <p className="text-xs" style={{ color:"var(--text-pri)" }}>{value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bracket-card card-base rounded-xl p-5">
                <h3 className="font-display font-semibold text-base mb-2" style={{ color:"var(--text-pri)" }}>Response Time</h3>
                <p className="text-xs leading-relaxed" style={{ color:"var(--text-sec)" }}>
                  We typically respond within <strong style={{ color:"var(--text-pri)" }}>1 business day</strong>. For urgent matters, call directly.
                </p>
              </div>
            </motion.div>
            {/* Form */}
            <motion.div className="lg:col-span-3"
              initial={{ opacity:0, x:14 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
              {success ? (
                <div className="bracket-card card-base rounded-xl p-12 text-center">
                  <CheckCircle size={40} className="mx-auto mb-4" style={{ color:"#22c55e" }}/>
                  <h2 className="font-display font-bold text-2xl mb-2" style={{ color:"var(--text-pri)" }}>Message Sent!</h2>
                  <p className="text-sm" style={{ color:"var(--text-sec)" }}>Thanks for reaching out. We'll be in touch within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bracket-card card-base rounded-xl p-6 space-y-4">
                  <h2 className="font-display font-bold text-lg mb-1" style={{ color:"var(--text-pri)" }}>Send a Message</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Full Name *" error={errors.name}>
                      <input name="name" value={values.name} onChange={handleChange} placeholder="Your name" className="field-input"/>
                    </Field>
                    <Field label="Email Address *" error={errors.email}>
                      <input name="email" type="email" value={values.email} onChange={handleChange} placeholder="you@company.com" className="field-input"/>
                    </Field>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Company" error={errors.company}>
                      <input name="company" value={values.company} onChange={handleChange} placeholder="Your company" className="field-input"/>
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                      <input name="phone" value={values.phone} onChange={handleChange} placeholder="+880 ..." className="field-input"/>
                    </Field>
                  </div>
                  <Field label="Service of Interest" error={errors.service}>
                    <select name="service" value={values.service} onChange={handleChange} className="field-input appearance-none cursor-pointer">
                      <option value="">Select a service (optional)</option>
                      {SERVICES.map(s => <option key={s.slug} value={s.name}>{s.name}</option>)}
                      <option value="Other">Other / General Inquiry</option>
                    </select>
                  </Field>
                  <Field label="Message *" error={errors.message}>
                    <textarea name="message" value={values.message} onChange={handleChange} rows={4} placeholder="Tell us about your project..." className="field-input resize-none"/>
                  </Field>
                  <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                    {loading
                      ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending...</>
                      : <><Send size={14}/>Send Message</>}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
