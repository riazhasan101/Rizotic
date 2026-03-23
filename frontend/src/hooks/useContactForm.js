// Contact form — sends directly via EmailJS (no backend needed)
// OR falls back to mailto if not configured
import { useState } from "react";
import toast from "react-hot-toast";

const INITIAL = { name:"", email:"", company:"", phone:"", service:"", message:"" };

function validate(v) {
  const e = {};
  if (!v.name.trim())  e.name    = "Name is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Valid email required";
  if (!v.message.trim()) e.message = "Message is required";
  return e;
}

export function useContactForm() {
  const [values, setValues]   = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    try {
      // Option A: Use Web3Forms (free, no backend, no signup needed for basic use)
      // Get a free access key at https://web3forms.com
      const WEB3_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "";

      if (WEB3_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: WEB3_KEY,
            subject: `New enquiry from ${values.name} — Rizotic`,
            from_name: "Rizotic Website",
            ...values,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.message);
      } else {
        // Option B: Fallback — open mailto (works without any config)
        const body = `Name: ${values.name}\nEmail: ${values.email}\nCompany: ${values.company || "-"}\nPhone: ${values.phone || "-"}\nService: ${values.service || "-"}\n\nMessage:\n${values.message}`;
        window.location.href = `mailto:info@rizotic.com?subject=Enquiry from ${encodeURIComponent(values.name)}&body=${encodeURIComponent(body)}`;
      }

      setSuccess(true);
      setValues(INITIAL);
      toast.success("Message sent! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please email us directly at info@rizotic.com");
    } finally {
      setLoading(false);
    }
  }

  return { values, errors, loading, success, handleChange, handleSubmit };
}
