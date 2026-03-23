// src/pages/Admin.jsx
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { LogOut, Mail, Eye, RefreshCw, Lock } from "lucide-react";
import api from "../lib/api.js";
import toast from "react-hot-toast";

// ── Login Form ────────────────────────────────────────────────────────
function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", { email, password });
      localStorage.setItem("rizotic_admin_token", data.token);
      onLogin(data.user);
      toast.success(`Welcome, ${data.user.name}`);
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm card-base rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center">
            <Lock size={18} className="text-brand-blue" />
          </div>
          <div>
            <p className="font-display font-bold text-white">Admin Panel</p>
            <p className="text-xs text-gray-500">RIZOTIC Technologies</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@rizotic.com"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-blue/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-blue/60 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center py-3 mt-2 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────
function Dashboard({ user, onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  async function fetchContacts(p = 1) {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/contacts?page=${p}`);
      setContacts(data.submissions);
      setTotal(data.total);
      setPages(data.pages);
      setPage(p);
    } catch {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id) {
    try {
      await api.patch(`/admin/contacts/${id}/read`);
      setContacts((c) => c.map((s) => s.id === id ? { ...s, read: true } : s));
    } catch {
      toast.error("Failed to update");
    }
  }

  useEffect(() => { fetchContacts(); }, []);

  return (
    <div className="min-h-screen bg-slate-950 pt-16">
      {/* Header */}
      <div className="bg-navy-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="font-display font-bold text-white">Rizotic Admin</p>
          <p className="text-xs text-gray-400">Welcome, {user.name}</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Enquiries", value: total },
            { label: "Unread", value: contacts.filter((c) => !c.read).length },
            { label: "This Page", value: contacts.length },
            { label: "Pages", value: pages },
          ].map((s) => (
            <div key={s.label} className="card-base rounded-xl p-4 text-center">
              <div className="text-2xl font-display font-bold gradient-text">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="card-base rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="font-display font-semibold text-white flex items-center gap-2">
              <Mail size={16} className="text-brand-blue" /> Contact Submissions
            </h2>
            <button
              onClick={() => fetchContacts(page)}
              className="text-gray-400 hover:text-white transition-colors"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading...</div>
          ) : contacts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-left">
                    {["Name", "Email", "Company", "Service", "Date", "Status", ""].map((h) => (
                      <th key={h} className="px-5 py-3 text-xs text-gray-500 font-medium uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c) => (
                    <tr key={c.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${!c.read ? "bg-brand-blue/5" : ""}`}>
                      <td className="px-5 py-3 text-white font-medium">{c.name}</td>
                      <td className="px-5 py-3 text-gray-300">{c.email}</td>
                      <td className="px-5 py-3 text-gray-400">{c.company || "—"}</td>
                      <td className="px-5 py-3 text-gray-400">{c.service || "—"}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${c.read ? "bg-gray-800 text-gray-400" : "bg-brand-blue/20 text-brand-blue"}`}>
                          {c.read ? "Read" : "New"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => { setSelected(c); if (!c.read) markRead(c.id); }}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Eye size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="px-6 py-4 border-t border-white/10 flex items-center gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => fetchContacts(p)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${p === page ? "bg-brand-blue text-white" : "text-gray-400 hover:text-white hover:bg-white/10"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelected(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-navy-900 border border-white/10 rounded-2xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="font-display font-bold text-white text-lg">{selected.name}</h3>
                <p className="text-gray-400 text-sm">{selected.email}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white text-xl leading-none">×</button>
            </div>
            <div className="space-y-3 text-sm">
              {selected.company && <p><span className="text-gray-500">Company:</span> <span className="text-white ml-2">{selected.company}</span></p>}
              {selected.phone && <p><span className="text-gray-500">Phone:</span> <span className="text-white ml-2">{selected.phone}</span></p>}
              {selected.service && <p><span className="text-gray-500">Service:</span> <span className="text-white ml-2">{selected.service}</span></p>}
              <p><span className="text-gray-500">Date:</span> <span className="text-white ml-2">{new Date(selected.createdAt).toLocaleString()}</span></p>
              <div className="border-t border-white/10 pt-4 mt-4">
                <p className="text-gray-500 mb-2">Message:</p>
                <p className="text-gray-200 leading-relaxed">{selected.message}</p>
              </div>
            </div>
            <a
              href={`mailto:${selected.email}`}
              className="btn-primary mt-6 w-full justify-center text-sm"
            >
              <Mail size={14} /> Reply via Email
            </a>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────
export default function Admin() {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("rizotic_admin_token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      if (payload.exp * 1000 < Date.now()) { localStorage.removeItem("rizotic_admin_token"); return null; }
      return payload;
    } catch { return null; }
  });

  function handleLogout() {
    localStorage.removeItem("rizotic_admin_token");
    setUser(null);
  }

  return (
    <>
      <Helmet><title>Admin — RIZOTIC</title></Helmet>
      {user ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginForm onLogin={setUser} />}
    </>
  );
}
