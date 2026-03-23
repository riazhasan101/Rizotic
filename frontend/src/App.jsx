// src/App.jsx
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import PageLoader from "./components/ui/PageLoader.jsx";
import { useTheme } from "./lib/theme.js";

const Home         = lazy(() => import("./pages/Home.jsx"));
const About        = lazy(() => import("./pages/About.jsx"));
const Services     = lazy(() => import("./pages/Services.jsx"));
const ServiceDetail= lazy(() => import("./pages/ServiceDetail.jsx"));
const Industries   = lazy(() => import("./pages/Industries.jsx"));
const Technology   = lazy(() => import("./pages/Technology.jsx"));
const Process      = lazy(() => import("./pages/Process.jsx"));
const Contact      = lazy(() => import("./pages/Contact.jsx"));
const Admin        = lazy(() => import("./pages/Admin.jsx"));
const NotFound     = lazy(() => import("./pages/NotFound.jsx"));

function ThemeApplier() {
  const { mode } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeApplier />
        <Toaster position="top-right"
          toastOptions={{
            style: { background: "var(--card-bg)", color: "var(--text-pri)", border: "1px solid var(--border)" }
          }}
        />
        <Navbar />
        <main className="min-h-screen">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/"             element={<Home />} />
              <Route path="/about"        element={<About />} />
              <Route path="/services"     element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/industries"   element={<Industries />} />
              <Route path="/technology"   element={<Technology />} />
              <Route path="/process"      element={<Process />} />
              <Route path="/contact"      element={<Contact />} />
              <Route path="/admin/*"      element={<Admin />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  );
}
