"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Scissors, 
  Heart, 
  Star, 
  Clock, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Award,
  Gem,
  Crown
} from "lucide-react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

const serviceCategories = [
  {
    title: "Bridal Excellence",
    icon: Heart,
    services: [
      { name: "Full Bridal Makeup", price: "£850", desc: "Complete makeup artistry for your special day." },
      { name: "Bridal Hair Styling", price: "£450", desc: "Elegant updos and hair design for brides." },
      { name: "Maid of Honor Special", price: "£250", desc: "Professional makeup and hair for bridesmaids." },
    ]
  },
  {
    title: "Men's Grooming",
    icon: Scissors,
    services: [
      { name: "Signature Haircut", price: "£120", desc: "Precision cutting and styling by our experts." },
      { name: "Beard Sculpture", price: "£80", desc: "Professional beard grooming and hot towel treatment." },
      { name: "Executive Pack", price: "£180", desc: "Full haircut, beard trim, and skin refresh." },
    ]
  },
  {
    title: "Skin & Spa",
    icon: Sparkles,
    services: [
      { name: "Hydrating Facial", price: "£180", desc: "Deep skin hydration and cleansing treatment." },
      { name: "Anti-Aging Therapy", price: "£220", desc: "Advanced skin rejuvenation and firming." },
      { name: "Quick Glow Refresh", price: "£90", desc: "A 30-minute skin boost for busy days." },
    ]
  }
];

export default function ServicesPage() {
  const { toggleWishlist, isInWishlist } = useCart();
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. COMPACT CINEMATIC HERO */}
      <section className="relative pt-[90px] pb-10 overflow-hidden bg-accent/20 border-b border-border">
        {/* Layered Background Textures */}
        <div className="absolute inset-0 bg-[url('/images/luxury-services-banner.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute -top-10 -left-10 p-40 opacity-[0.03] pointer-events-none rotate-12">
          <Scissors className="w-96 h-96 text-primary" />
        </div>
        <div className="absolute top-40 right-20 p-20 opacity-[0.02] pointer-events-none -rotate-12">
          <Crown className="w-64 h-64 text-primary" />
        </div>

        <div className="luxury-container relative z-10">
          <div className="flex flex-col items-center text-center space-y-3 max-w-5xl mx-auto">
            <Breadcrumbs />
            
            <div className="space-y-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge-luxury !bg-primary !text-background mx-auto !py-0.5 !px-3"
              >
                <Award className="w-2.5 h-2.5 mr-1.5" />
                <span className="text-[8px] uppercase tracking-[0.2em] font-black">World-Class Artistry</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className=""
              >
                Curated Beauty <br /> 
                <span className="text-primary italic relative">
                  Services.
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/20 rounded-full blur-[1px]" />
                </span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] md:text-xs text-muted-foreground font-medium max-w-xl leading-relaxed"
            >
              Discover our salon services at Glamora. From bridal makeovers to professional grooming, we offer the best in beauty care.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. SERVICES LIST - High Density */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 justify-center">
            {serviceCategories.map((cat, i) => (
              <div key={i} className="space-y-6">
                <div className="flex items-center space-x-4 pb-4 border-b border-border">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20 shadow-sm">
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-black">{cat.title}</h2>
                </div>
                
                <div className="space-y-5">
                  {cat.services.map((service, si) => (
                    <div key={si} className="luxury-card !p-5 group relative">
                      <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none">
                        <Sparkles className="w-12 h-12 text-primary" />
                      </div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-1 flex-1 mr-4">
                          <h3 className="text-base font-black text-foreground group-hover:text-primary transition-colors tracking-tight uppercase">{service.name}</h3>
                          <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                            {service.desc}
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <span className="text-lg font-serif font-black text-primary">{service.price}</span>
                          <button 
                            onClick={() => toggleWishlist({ ...service, id: `svc-${service.name.toLowerCase().replace(/\s+/g, '-')}` }, 'service')}
                            className={cn(
                              "p-2.5 rounded-xl border transition-all duration-500",
                              isInWishlist(`svc-${service.name.toLowerCase().replace(/\s+/g, '-')}`) 
                                ? "bg-primary border-primary text-background shadow-lg shadow-primary/20" 
                                : "bg-accent/50 border-border text-primary hover:border-primary/40"
                            )}
                          >
                            <Heart className={cn("w-4 h-4", isInWishlist(`svc-${service.name.toLowerCase().replace(/\s+/g, '-')}`) && "fill-current")} />
                          </button>
                        </div>
                      </div>
                      <Link href={`/booking?service=${encodeURIComponent(service.name)}`} className="flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:opacity-80 transition-opacity">
                        Reserve Session <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUALITY PROMISE */}
      <section className="section-padding bg-background border-y border-border">
        <div className="luxury-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Expert Staff", icon: CheckCircle2, desc: "Highly trained professionals." },
              { title: "Premium Products", icon: Star, desc: "Only the best for your skin." },
              { title: "Safe & Clean", icon: ShieldCheck, desc: "Strict hygiene protocols." },
              { title: "Instant Booking", icon: Zap, desc: "Reserve your spot online." },
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                  <p.icon className="w-5 h-5" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-widest">{p.title}</h4>
                <p className="text-[10px] text-muted-foreground font-medium">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
