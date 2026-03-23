// src/hooks/useContactForm.js
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../lib/api.js";

const INITIAL = { name: "", email: "", company: "", phone: "", service: "", message: "" };

export function useContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!values.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!values.message.trim()) e.message = "Message is required";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    try {
      await api.post("/contact", values);
      setSuccess(true);
      setValues(INITIAL);
      toast.success("Message sent! We'll be in touch soon.");
    } catch (err) {
      const msg = err.response?.data?.error || "Something went wrong. Please try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return { values, errors, loading, success, handleChange, handleSubmit };
}
