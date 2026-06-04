"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  FileText, 
  Download, 
  Lock, 
  Eye, 
  UserCheck, 
  ArrowLeft,
  Printer,
  Sparkles,
  X
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function PrivacyPage() {
  const [activeModal, setActiveModal] = useState<"portability" | "erasure" | "storage" | null>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. HERO */}
      <section className="relative pt-[100px] pb-12 overflow-hidden bg-accent/20 border-b border-border">
        <div className="luxury-container relative z-10 space-y-4">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge-luxury !bg-primary !text-background !py-1"
              >
                <ShieldCheck className="w-3 h-3 mr-2" />
                <span>Security Standards v2.0</span>
              </motion.div>
              <h1 className="text-4xl font-serif font-black tracking-tighter">Privacy <span className="text-primary italic">Protocol.</span></h1>
              <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">Last Updated: May 10, 2026</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={handlePrint}
                className="btn-outline !py-3 !px-6 text-[10px] uppercase font-black tracking-widest flex items-center border-primary/20 hover:bg-primary hover:text-background"
              >
                <Download className="w-4 h-4 mr-2" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POLICY CONTENT */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
            <div className="lg:col-span-2 flex">
              <div className="luxury-card !p-12 space-y-8 print:shadow-none print:border-none w-full h-full">
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black">1. Data Sovereignty</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    At Glamora, we treat your personal data with the same level of care as our best services. This Privacy Protocol outlines how we collect, protect, and manage your information when you engage with our London studio.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black">2. Information we Collect</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    To provide a bespoke experience, we collect:
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground pl-4 border-l-2 border-primary/20">
                    <li className="flex items-start"><Sparkles className="w-4 h-4 text-primary mr-3 mt-1 shrink-0" /> Contact details for session confirmations.</li>
                    <li className="flex items-start"><Sparkles className="w-4 h-4 text-primary mr-3 mt-1 shrink-0" /> Service history to personalize future rituals.</li>
                    <li className="flex items-start"><Sparkles className="w-4 h-4 text-primary mr-3 mt-1 shrink-0" /> Aesthetic preferences and skin sensitivity records.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black">3. Transactional Security</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Financial data is processed through highly secure, encrypted gateways. Glamora does not store your full card information on our internal systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="luxury-card !p-10 space-y-8">
                <h3 className="text-xl font-serif font-black tracking-tight">Quick Summary</h3>
                <div className="space-y-6">
                  {[
                    { icon: Eye, title: "Transparency", desc: "No hidden tracking." },
                    { icon: UserCheck, title: "Your Control", desc: "Manage your preferences." },
                    { icon: ShieldCheck, title: "Security", desc: "Encrypted data storage." },
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

              <div className="luxury-card !p-10 bg-primary text-background border-none shadow-premium flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-xl font-serif font-black tracking-tight mb-4">Contact Concierge</h3>
                  <p className="text-xs font-medium leading-relaxed opacity-90">Questions regarding your privacy? Our data protection officer is available for consultation at any time.</p>
                </div>
                <Link href="/contact" className="w-full btn-primary bg-background text-primary !py-4 shadow-xl hover:scale-105 transition-all text-center">Contact DPO</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GDPR FULL WIDTH SECTION */}
      <section className="section-padding bg-background border-y border-border">
        <div className="luxury-container">
          <div className="luxury-card !p-12 bg-accent/20 border-primary/20 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-primary text-background rounded-3xl flex items-center justify-center shrink-0 shadow-xl">
              <Lock className="w-10 h-10" />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-serif font-black tracking-tighter">GDPR <span className="text-primary italic">Compliance.</span></h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                You have the absolute right to request access to your data, correction of any inaccuracies, or total deletion of your digital footprint from the Glamora ecosystem. Our data protocols are strictly aligned with European and UK security standards to ensure your peace of mind.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <button 
                  onClick={() => setActiveModal("portability")}
                  className="badge-luxury !bg-green-500/10 !text-green-500 border-none hover:bg-green-500/20 hover:scale-105 transition-all cursor-pointer font-bold animate-pulse"
                >
                  Data Portability
                </button>
                <button 
                  onClick={() => setActiveModal("erasure")}
                  className="badge-luxury !bg-green-500/10 !text-green-500 border-none hover:bg-green-500/20 hover:scale-105 transition-all cursor-pointer font-bold"
                >
                  Right to Erasure
                </button>
                <button 
                  onClick={() => setActiveModal("storage")}
                  className="badge-luxury !bg-green-500/10 !text-green-500 border-none hover:bg-green-500/20 hover:scale-105 transition-all cursor-pointer font-bold"
                >
                  Secure Storage
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GDPR COMPLIANCE DETAIL MODAL */}
      <AnimatePresence>
        {activeModal !== null && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md cursor-pointer"
            />
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-card border-2 border-primary/20 rounded-[2.5rem] shadow-premium overflow-hidden p-8 z-10 text-center space-y-6"
            >
              {/* Icon & Title */}
              <div className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto border border-primary/20">
                  {activeModal === "portability" ? (
                    <Download className="w-8 h-8 text-green-500" />
                  ) : activeModal === "erasure" ? (
                    <FileText className="w-8 h-8 text-primary" />
                  ) : (
                    <Lock className="w-8 h-8 text-emerald-500" />
                  )}
                </div>
                <h3 className="text-xl font-serif font-black text-foreground">
                  {activeModal === "portability" ? "Data Portability Right" :
                   activeModal === "erasure" ? "Right to Erasure (To Be Forgotten)" :
                   "AES-256 Secure Database Storage"}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed font-bold">
                {activeModal === "portability" ? 
                  "You have the right to request a complete machine-readable copy of your personal data, service records, and treatment logs. Our DPO will package this information securely into standard CSV or JSON files within 30 days of request." :
                 activeModal === "erasure" ? 
                  "We respect your digital footprint. You can demand the permanent deletion of your profile, booking archives, and contact information. Once requested, your personal accounts are completely wiped across all CRM databases." :
                  "All personal preferences, skin sensitivity records, and bookings are stored in encrypted databases using AES-256 standard protocols. We monitor access via strict session audits to prevent unauthorized data exposure."
                }
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="btn-primary !px-8 !py-3 text-[10px] uppercase font-black tracking-widest bg-green-600 hover:bg-green-700 text-white"
                >
                  I Understand
                </button>
              </div>

              {/* Absolute Close X */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 bg-accent rounded-full hover:bg-red-500 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
