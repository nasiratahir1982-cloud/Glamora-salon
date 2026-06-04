"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Accessibility as AccessibilityIcon, 
  Download, 
  Eye, 
  Ear, 
  Hand, 
  Globe, 
  CheckCircle2,
  Sparkles,
  Zap,
  Award,
  X
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function AccessibilityPage() {
  const [activeModal, setActiveModal] = useState<"screenReader" | "contrast" | "keyboard" | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. HERO */}
      <section className="relative pt-[100px] pb-12 overflow-hidden bg-accent/20 border-b border-border">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-10" />
        
        <div className="luxury-container relative z-10 space-y-4">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge-luxury !bg-primary !text-background !py-1"
              >
                <AccessibilityIcon className="w-3 h-3 mr-2" />
                <span>Inclusive Excellence v1.1</span>
              </motion.div>
              <h1 className="text-4xl font-serif font-black tracking-tighter">Inclusion & <span className="text-primary italic">Access.</span></h1>
              <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">Last Update: May 10, 2026</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handlePrint}
                className="btn-outline !py-3 !px-6 text-[10px] uppercase font-black tracking-widest flex items-center border-primary/20 hover:bg-primary hover:text-background transition-all"
              >
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTENT GRID */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
            <div className="lg:col-span-2 flex">
              <div className="luxury-card !p-12 space-y-12 print:shadow-none print:border-none w-full h-full">
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black flex items-center">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs mr-4">1</span>
                    Digital Inclusivity
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The Glamora digital portal is designed to meet WCAG 2.1 Level AA standards. We strive to provide a seamless booking and browsing experience for all guests, regardless of ability or technology.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black flex items-center">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs mr-4">2</span>
                    Studio Access
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Our London studio is fully accessible. We offer:
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <li className="flex items-center p-4 bg-accent/30 rounded-xl"><CheckCircle2 className="w-4 h-4 text-primary mr-3" /> Step-free entrance & lift access.</li>
                    <li className="flex items-center p-4 bg-accent/30 rounded-xl"><CheckCircle2 className="w-4 h-4 text-primary mr-3" /> Adjustable styling rituals.</li>
                    <li className="flex items-center p-4 bg-accent/30 rounded-xl"><CheckCircle2 className="w-4 h-4 text-primary mr-3" /> Accessible private suites.</li>
                    <li className="flex items-center p-4 bg-accent/30 rounded-xl"><CheckCircle2 className="w-4 h-4 text-primary mr-3" /> Assisted booking services.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black flex items-center">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs mr-4">3</span>
                    Continuous Improvement
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Accessibility is a journey. We regularly audit our systems and physical spaces to ensure the highest level of inclusion for our global guest list.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="luxury-card !p-10 space-y-8">
                <h3 className="text-xl font-serif font-black text-primary tracking-tight">Support Tools</h3>
                <div className="space-y-6">
                  {[
                    { icon: Eye, title: "Visual Aid", desc: "High contrast modes." },
                    { icon: Ear, title: "Audio Support", desc: "Text-to-speech ready." },
                    { icon: Globe, title: "Multilingual", desc: "Global guest support." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-5 group">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-foreground">{item.title}</h4>
                        <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="luxury-card !p-10 bg-primary text-background border-none shadow-premium flex flex-col justify-between flex-1 space-y-6">
                <div>
                  <div className="w-12 h-12 bg-background/20 rounded-2xl flex items-center justify-center mb-6">
                    <AccessibilityIcon className="w-6 h-6 text-background" />
                  </div>
                  <h3 className="text-xl font-serif font-black tracking-tight mb-4">Need Assistance?</h3>
                  <p className="text-xs font-medium leading-relaxed opacity-90">Our concierge team is specially trained to assist with all accessibility requirements to ensure your visit is effortless.</p>
                </div>
                <Link href="/contact" className="w-full btn-primary bg-background text-primary !py-4 shadow-xl hover:scale-105 transition-all text-center">Special Requests</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WCAG COMPLIANCE SECTION */}
      <section className="section-padding bg-background border-y border-border">
        <div className="luxury-container">
          <div className="luxury-card !p-12 bg-accent/20 border-primary/20 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-primary text-background rounded-3xl flex items-center justify-center shrink-0 shadow-xl">
              <Zap className="w-10 h-10" />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-serif font-black tracking-tighter">WCAG 2.1 <span className="text-primary italic">Certified.</span></h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                We are committed to making our digital experience accessible to everyone. Our platform is audited against WCAG 2.1 AA standards to ensure that guests using screen readers, keyboard-only navigation, and other assistive technologies have a first-class experience.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <button 
                  onClick={() => setActiveModal("screenReader")}
                  className="badge-luxury !bg-green-500/10 !text-green-500 border border-green-500/20 hover:!bg-green-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Screen Reader Optimized
                </button>
                <button 
                  onClick={() => setActiveModal("contrast")}
                  className="badge-luxury !bg-green-500/10 !text-green-500 border border-green-500/20 hover:!bg-green-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Contrast Compliant
                </button>
                <button 
                  onClick={() => setActiveModal("keyboard")}
                  className="badge-luxury !bg-green-500/10 !text-green-500 border border-green-500/20 hover:!bg-green-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Keyboard Nav
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Interactive Accessibility Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-card border border-border rounded-3xl p-8 md:p-10 shadow-luxury overflow-hidden"
            >
              {/* Background Accent Gradients */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl" />

              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full border border-border hover:bg-accent hover:text-foreground transition-all duration-200"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Content */}
              <div className="relative space-y-6">
                {activeModal === "screenReader" && (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                        <Ear className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-green-500">WCAG 2.1 AA Audit</span>
                        <h3 className="text-2xl font-serif font-black tracking-tight mt-0.5">Screen Reader</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Our web platform is designed with custom ARIA landmarks and roles to ensure seamless compatibility with screen reader technologies. Every interactive tool and text block is mapped for standard voice interfaces.
                    </p>
                    <div className="space-y-3 pt-2">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-foreground">Optimization Highlights</h4>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> Full alternative text attributes for all visual media.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> ARIA live-regions for dynamic content updates.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> Form fields mapped with explicit labels.</li>
                      </ul>
                    </div>
                  </>
                )}

                {activeModal === "contrast" && (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                        <Eye className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-green-500">WCAG 2.1 AA Audit</span>
                        <h3 className="text-2xl font-serif font-black tracking-tight mt-0.5">Contrast Compliant</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Glamora utilizes a tailored, high-contrast palette. Text contrast meets or exceeds the required 4.5:1 ratio against backgrounds (and 3:1 for large display elements) to guarantee comfort and clear legibility.
                    </p>
                    <div className="space-y-3 pt-2">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-foreground">Legibility Highlights</h4>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> Contrast ratios audited using professional web accessibility standards.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> Non-color indicators for alerts, errors, and key actions.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> Full scaling support up to 200% without display loss.</li>
                      </ul>
                    </div>
                  </>
                )}

                {activeModal === "keyboard" && (
                  <>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                        <Hand className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-black tracking-widest text-green-500">WCAG 2.1 AA Audit</span>
                        <h3 className="text-2xl font-serif font-black tracking-tight mt-0.5">Keyboard Navigation</h3>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Every feature, page, and reservation panel on our digital home is navigable using only standard keyboard keys. Tab indices are custom configured to enable fluid and predictable interactions.
                    </p>
                    <div className="space-y-3 pt-2">
                      <h4 className="text-[11px] font-black uppercase tracking-widest text-foreground">Navigation Highlights</h4>
                      <ul className="space-y-2.5 text-xs text-muted-foreground">
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> Standard focus indicators highlighted with high-contrast borders.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> "Skip to Content" logic for quick structural navigation.</li>
                        <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" /> Fully keyboard-escapable overlays, popups, and menus.</li>
                      </ul>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-border flex justify-end">
                  <button
                    onClick={() => setActiveModal(null)}
                    className="btn-primary !py-3 !px-8 text-[10px] uppercase font-black tracking-widest hover:scale-105 active:scale-95 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
