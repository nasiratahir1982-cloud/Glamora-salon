"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Download, 
  CheckSquare, 
  AlertCircle, 
  Scale, 
  Calendar, 
  Shield,
  Sparkles,
  Award,
  Clock,
  Zap,
  Crown,
  X,
  Lock
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function TermsPage() {
  const [activeModal, setActiveModal] = useState<"locker" | "allergy" | "valuables" | null>(null);

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
                <Scale className="w-3 h-3 mr-2" />
                <span>Legal Framework v1.4</span>
              </motion.div>
              <h1 className="text-4xl font-serif font-black tracking-tighter">Terms of <span className="text-primary italic">Service.</span></h1>
              <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">Effective Date: May 10, 2026</p>
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
              <div className="luxury-card !p-12 space-y-10 print:shadow-none print:border-none w-full h-full">
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black flex items-center">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs mr-4">1</span>
                    Elite Session Agreements
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    By booking an appointment at Glamora, you enter into a professional agreement for beauty and grooming services. We reserve the right to refuse service based on health and safety protocols or studio capacity.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black flex items-center">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs mr-4">2</span>
                    Cancellation Policy
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Excellence requires preparation. We require a minimum of 24 hours' notice for cancellations. Late cancellations or "no-shows" will result in a 50% ritual fee to respect the time of our Master Stylists.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-black flex items-center">
                    <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs mr-4">3</span>
                    Product & Ritual Guarantees
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We use only elite, professional-grade products. If you experience an unexpected reaction within 24 hours of a ritual, please notify our studio immediately for a complimentary assessment.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="luxury-card !p-10 space-y-8">
                <h3 className="text-xl font-serif font-black text-primary tracking-tight">Core Pillars</h3>
                <div className="space-y-6">
                  {[
                    { icon: Calendar, title: "Booking", desc: "Online or Concierge." },
                    { icon: Shield, title: "Safety", desc: "Strict hygiene codes." },
                    { icon: CheckSquare, title: "Compliance", desc: "Highest standards." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-5 group">
                      <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
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

              <div className="luxury-card !p-10 border-primary/20 bg-accent/30 flex flex-col justify-center flex-1 text-center space-y-6">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                  <Crown className="w-6 h-6" />
                </div>
                <p className="text-xs text-muted-foreground font-bold italic leading-relaxed">
                  "Respect for our craft and our guests is the foundation of every session at Glamora."
                </p>
                <div className="space-y-1">
                  <div className="h-px w-8 bg-primary/40 mx-auto mb-2" />
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground">Director of Operations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESPONSIBILITY FULL WIDTH SECTION */}
      <section className="section-padding bg-background border-y border-border">
        <div className="luxury-container">
          <div className="luxury-card !p-12 bg-amber-500/5 border-amber-500/20 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-amber-500 text-white rounded-3xl flex items-center justify-center shrink-0 shadow-xl shadow-amber-500/20">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-serif font-black tracking-tighter text-amber-600">Client <span className="italic text-foreground">Responsibility.</span></h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Glamora is not liable for loss of personal items within the studio. We recommend securing all valuables in the provided lockers before your appointment. Guests are responsible for disclosing any known allergies before services begin.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                <button 
                  onClick={() => setActiveModal("locker")}
                  className="badge-luxury !bg-amber-500/10 !text-amber-600 border-none hover:bg-amber-500/20 hover:scale-105 transition-all cursor-pointer font-bold"
                >
                  Locker Access
                </button>
                <button 
                  onClick={() => setActiveModal("allergy")}
                  className="badge-luxury !bg-amber-500/10 !text-amber-600 border-none hover:bg-amber-500/20 hover:scale-105 transition-all cursor-pointer font-bold"
                >
                  Allergy Disclosure
                </button>
                <button 
                  onClick={() => setActiveModal("valuables")}
                  className="badge-luxury !bg-amber-500/10 !text-amber-600 border-none hover:bg-amber-500/20 hover:scale-105 transition-all cursor-pointer font-bold"
                >
                  Valuables Safety
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLIENT RESPONSIBILITY MODAL */}
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
                  {activeModal === "locker" ? (
                    <Lock className="w-8 h-8" />
                  ) : activeModal === "allergy" ? (
                    <AlertCircle className="w-8 h-8 text-amber-500" />
                  ) : (
                    <Shield className="w-8 h-8 text-emerald-500" />
                  )}
                </div>
                <h3 className="text-xl font-serif font-black text-foreground">
                  {activeModal === "locker" ? "Locker Access & Security" :
                   activeModal === "allergy" ? "Allergen & Health Disclosure" :
                   "Valuables & Jewellery Safety"}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs text-muted-foreground leading-relaxed font-bold">
                {activeModal === "locker" ? 
                  "Glamora provides digital secure lockers near the lobby area. Each locker uses a self-defined 4-digit code and features built-in high-speed wireless charging and USB-C ports to recharge your devices safely while you undergo your beauty rituals." :
                 activeModal === "allergy" ? 
                  "To ensure your safety, please disclose any skin sensitivities, food triggers, or chemical allergies (such as PPD in dyes, nut oils, or latex) before your session begins. We provide complimentary patch tests 24-48 hours before styling/skincare rituals." :
                  "For your comfort and to prevent loss or snagging, we recommend removing delicate jewellery before facials, hair styling, and washing rituals. Our reception concierge can safely lock high-value belongings in reception storage upon request."
                }
              </p>

              {/* Action Buttons */}
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="btn-primary !px-8 !py-3 text-[10px] uppercase font-black tracking-widest"
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
