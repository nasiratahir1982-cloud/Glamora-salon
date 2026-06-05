"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Shield, Heart, Star, Scissors, MapPin, Globe, Award, Crown, Gem, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const values = [
  { id: "promise" as const, icon: Shield, title: "Our Promise", desc: "We maintain the highest standards of hygiene and care for every guest." },
  { id: "comfort" as const, icon: Heart, title: "Your Comfort", desc: "Experience a relaxing and peaceful environment during your visit." },
  { id: "quality" as const, icon: Star, title: "Top Quality", desc: "We only use the best and most trusted beauty products in the world." },
  { id: "experience" as const, icon: Award, title: "Experience", desc: "Our team consists of highly trained experts with years of salon experience." },
];

const valueDetails = {
  promise: {
    title: "Our Promise",
    subtitle: "The Glamora Guarantee of Safety & Trust",
    icon: Shield,
    points: [
      {
        title: "Medical-Grade Hygiene Protocols",
        desc: "All metal implements undergo professional ultrasonic cleaning and autoclave sterilization. Single-use items are discarded instantly."
      },
      {
        title: "7-Day Perfection Guarantee",
        desc: "We stand behind our craft. If your hair, skin, or nail service requires adjustments, contact us within 7 days for a complimentary correction."
      },
      {
        title: "Ethical & Clean Products Only",
        desc: "We commit to using only cruelty-free, vegan-friendly, and responsibly sourced products that protect both your health and the environment."
      }
    ]
  },
  comfort: {
    title: "Your Comfort",
    subtitle: "A Sanctuary of Total Relaxation",
    icon: Heart,
    points: [
      {
        title: "Ergonomic & Acoustic Design",
        desc: "Unwind in custom-upholstered reclining massage chairs. Our salon acoustic layout minimizes noise, creating a peaceful, quiet sanctuary."
      },
      {
        title: "Complimentary Luxury Refreshments",
        desc: "Enjoy an curated beverage menu featuring organic herbal teas, freshly brewed artisanal coffee, infused sparkling water, or chilled champagne."
      },
      {
        title: "Customized Aromatherapy & Scents",
        desc: "Indulge in gentle, hypoallergenic essential oil diffusion (lavender, jasmine, sandalwood) tailored to soothe your senses throughout your stay."
      }
    ]
  },
  quality: {
    title: "Top Quality",
    subtitle: "Nothing But the World's Finest Brands",
    icon: Star,
    points: [
      {
        title: "Luxury Formulation Partners",
        desc: "We partner exclusively with elite haircare and beauty brands, including Oribe, Kérastase, and Chanel Professional products."
      },
      {
        title: "Zero Harmful Chemicals",
        desc: "Our products are rigorously screened to be 100% free from sulfates, parabens, formaldehydes, and other aggressive toxins."
      },
      {
        title: "State-of-the-Art Technology",
        desc: "From smart hair analysis scanners to advanced micro-mist treatment processors, we leverage modern technology for optimal results."
      }
    ]
  },
  experience: {
    title: "Experience",
    subtitle: "Artistry Perfected Over Decades",
    icon: Award,
    points: [
      {
        title: "World-Class Trained Stylists",
        desc: "Our team boasts decades of combined experience, with master certifications from elite styling academies in Paris, London, and Milan."
      },
      {
        title: "Continuous Masterclass Education",
        desc: "Glamora artists participate in weekly in-house educational sessions on cutting-edge techniques, seasonal trends, and advanced color theory."
      },
      {
        title: "Bespoke Lifestyle Consultation",
        desc: "We don't just follow trends. We analyze face structure, hair health, and lifestyle to design a customized beauty plan unique to you."
      }
    ]
  }
};

export default function AboutPage() {
  const [activeModal, setActiveModal] = useState<"promise" | "comfort" | "quality" | "experience" | null>(null);

  const selectedDetails = activeModal ? valueDetails[activeModal] : null;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-[100px] pb-12 overflow-hidden bg-accent/20">
        <div className="absolute inset-0 bg-[url('/glamora-salon/images/luxury-salon-lobby.png')] bg-cover bg-center grayscale opacity-15" />
        <div className="absolute -top-20 -right-20 p-40 opacity-[0.03] pointer-events-none rotate-12">
          <Crown className="w-96 h-96 text-primary" />
        </div>
        
        <div className="luxury-container relative z-10 text-center space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-luxury !bg-primary !text-background mx-auto !py-1"
          >
            <Sparkles className="w-3 h-3 mr-2" />
            <span>Serving London since 2012</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-foreground"
          >
            Our Story & <br /> <span className="italic text-primary">Passion.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Glamora is a professional salon in London. We combine expert skills with a beautiful environment to help you look your absolute best.
          </motion.p>
        </div>
      </section>

      {/* 2. OUR STORY (High Density) */}
      <section className="section-padding">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter leading-tight">Beautifully <br /> <span className="text-primary italic">Crafted.</span></h2>
                <div className="w-20 h-1.5 bg-primary/20 rounded-full" />
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                Founded in the heart of London, Glamora was created for those who want more than just a quick appointment—they want a place to relax and feel truly cared for.
                <br /><br />
                We have special areas for **Brides** and a professional **Grooming Space**, ensuring every guest gets the specific, high-end care they deserve from our Glamora experts.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-accent/30 rounded-2xl border border-border">
                  <h4 className="text-3xl font-serif font-black text-primary mb-1">12k+</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Happy Clients</p>
                </div>
                <div className="p-6 bg-accent/30 rounded-2xl border border-border">
                  <h4 className="text-3xl font-serif font-black text-primary mb-1">24</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Expert Staff</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-border transition-transform duration-700 group-hover:scale-[1.02]">
                <img 
                  src="/glamora-salon/images/salon-team.png" 
                  className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                  alt="Salon Team"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary text-background rounded-2xl flex items-center justify-center shadow-xl rotate-12">
                <Gem className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (High Density) */}
      <section className="section-padding bg-accent/10 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="luxury-container relative z-10">
          <div className="text-center mb-12 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">The Glamora Standard</p>
            <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <button
                key={i}
                onClick={() => setActiveModal(v.id)}
                className="luxury-card text-center !p-8 hover:border-primary hover:shadow-primary/5 transition-all group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-3xl w-full text-left sm:text-center block"
              >
                <div className="w-14 h-14 bg-primary text-background rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-tight text-foreground mb-3 text-center">{v.title}</h3>
                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed text-center">{v.desc}</p>
                <div className="mt-4 text-[10px] text-primary uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity text-center">
                  Read Details &rarr;
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Overlay Details */}
      <AnimatePresence>
        {activeModal && selectedDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-2xl bg-card border border-primary/20 rounded-[2rem] p-8 md:p-10 shadow-2xl z-10 overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-accent text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-5 mb-8">
                <div className="w-14 h-14 bg-primary/10 border border-primary/20 text-primary rounded-2xl flex items-center justify-center shrink-0">
                  <selectedDetails.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    {selectedDetails.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-foreground mt-1">
                    {selectedDetails.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                {selectedDetails.points.map((pt, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-accent/20 border border-border">
                    <div className="w-6 h-6 bg-primary text-background rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-black text-foreground uppercase tracking-wide">
                        {pt.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

