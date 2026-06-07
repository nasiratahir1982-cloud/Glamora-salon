"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Star, 
  Zap, 
  Globe, 
  Scissors, 
  Award,
  Users,
  LayoutDashboard,
  TrendingUp,
  Shield,
  Crown
} from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <motion.div 
    whileHover={{ y: -6, scale: 1.02 }}
    className="luxury-card flex flex-col items-center text-center p-6 sm:p-8 h-full bg-gradient-to-b from-card/80 via-card/50 to-accent/20 border-primary/20 hover:border-primary/50 transition-all duration-300 rounded-[2rem] shadow-lg hover:shadow-primary/5"
  >
    <div className="w-14 h-14 bg-gradient-to-br from-primary via-primary/80 to-[#a88759] text-background rounded-[1.2rem] flex items-center justify-center mb-6 shadow-lg">
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-serif font-black mb-3 text-foreground tracking-tight uppercase">{title}</h3>
    <p className="text-xs text-muted-foreground leading-relaxed font-medium">
      {desc}
    </p>
  </motion.div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-[120px] pb-20 overflow-hidden bg-accent/20 border-b border-border">
        {/* Layered Background Textures */}
        <div className="absolute inset-0 bg-[url('/glamora-salon/images/luxury-gold-abstract.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/20" />
        
        {/* Floating Decorative Icon */}
        <div className="absolute -top-20 -right-20 p-40 opacity-[0.03] pointer-events-none rotate-12">
          <Crown className="w-96 h-96 text-primary" />
        </div>
        
        <div className="luxury-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-left">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="badge-luxury !bg-primary !text-background !py-1"
              >
                <Sparkles className="w-3 h-3 mr-2" />
                <span>Modern Care & Luxury Salon v4.0</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-foreground text-5xl sm:text-6xl font-serif font-black tracking-tight leading-[1.1]"
              >
                Modern Care for <br /> 
                <span className="text-primary italic">Your Beauty.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-muted-foreground font-medium max-w-md leading-relaxed"
              >
                Indulge in a premium salon experience in London. Book master rituals, explore elite skincare brands, and manage all your bookings seamlessly.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4"
              >
                <Link href="/booking" className="btn-primary px-8 py-4 shadow-luxury-gold flex items-center gap-2 group">
                  Book Appointment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/products" className="btn-outline px-8 py-4 border-primary/20 hover:border-primary">
                  Our Products
                </Link>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center space-x-4 pt-4"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-accent overflow-hidden shadow-md">
                      <img src={`https://i.pravatar.cc/100?img=${i+12}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <span className="text-primary font-bold">15k+</span> Happy Clients served in London
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative group w-full"
            >
              <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-3xl transform -translate-x-3 translate-y-3 opacity-50 z-0" />
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/20 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/glamora-salon/images/luxury-salon-showcase.png" 
                  className="w-full h-[400px] object-cover"
                  alt="Glamora Salon Interior"
                />
              </div>
              
              {/* Floating Stat Widget */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-primary/20 shadow-xl z-20 hidden md:block"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">Rating growth</p>
                    <p className="text-base font-black text-foreground">+24% Weekly</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES FEATURE GRID */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Luminous Glamour Orbs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="luxury-container relative z-10">
          <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-16 space-y-3">
            <div className="badge-luxury mb-2">Quality First</div>
            <h2 className="text-4xl font-serif font-black tracking-tight uppercase">Excellence in <span className="text-primary italic">Care.</span></h2>
            <div className="w-20 h-1 bg-primary/20 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={ShieldCheck} title="Secure Booking" desc="Autographed security protocols and fully secure payment systems protect every luxury transaction." />
            <FeatureCard icon={Clock} title="Real-time Slots" desc="Direct calendar sync and instant scheduling with your favorite master stylist, 24/7." />
            <FeatureCard icon={Zap} title="Instant Alerts" desc="Receive live concierge updates, automated checkouts, and custom booking reminders in real-time." />
            <FeatureCard icon={Globe} title="Bespoke Care" desc="Vibrant, custom treatment plans tailored for your specific lifestyle and unique hair/skin profile." />
          </div>
        </div>
      </section>

      {/* 3. MANAGEMENT PREVIEW */}
      <section className="section-padding bg-accent/10 border-y border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/glamora-salon/images/luxury-gold-abstract.png')] bg-cover bg-center opacity-[0.05] pointer-events-none" />
        
        <div className="luxury-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative group w-full">
              <div className="absolute inset-0 bg-primary/10 rounded-[2.5rem] blur-3xl opacity-60 z-0" />
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border border-primary/20 transition-transform duration-700 group-hover:scale-[1.01]">
                <img 
                  src="/glamora-salon/images/luxury-salon-dashboard-mockup.png" 
                  className="w-full h-80 object-cover" 
                  alt="Glamora Management Dashboard" 
                />
              </div>
            </div>
            
            <div className="space-y-6 order-1 lg:order-2 text-left">
              <div className="badge-luxury">Admin Hub</div>
              <h2 className="text-4xl font-serif font-black tracking-tight leading-tight uppercase">Easy <br /><span className="text-primary italic">Management.</span></h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                Control your business from one unified admin dashboard. Track financial statements, monitor staff payroll/performance, and review client feedback in real-time.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-2">
                {[
                  { label: "Bookings efficiency", val: "99.8%" },
                  { label: "Active shops", val: "24 Branches" },
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-card/60 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/30 transition-colors">
                    <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-xl font-serif font-black text-primary">{stat.val}</p>
                  </div>
                ))}
              </div>
              
              <Link href="/admin" className="btn-primary inline-flex px-8 py-4 shadow-xl">
                Open Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATISTICS */}
      <section className="section-padding bg-background border-b border-border">
        <div className="luxury-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Happy Clients", val: "15k+", icon: Users },
              { label: "Master Stylists", val: "8+", icon: Scissors },
              { label: "Average Rating", val: "4.9/5", icon: Star },
              { label: "Rituals Done", val: "45k+", icon: Award },
            ].map((m, i) => (
              <div key={i} className="text-center space-y-3 p-6 bg-accent/20 rounded-3xl border border-border hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mx-auto text-primary border border-primary/10">
                  <m.icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-serif font-black text-foreground">{m.val}</p>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL REVIEWS */}
      <section className="section-padding bg-accent/5 relative overflow-hidden">
        <div className="luxury-container">
          <div className="text-center mb-16 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Guest Statements</p>
            <h2 className="text-4xl font-serif font-black tracking-tight uppercase">Trusted Reviews</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { user: "Sophia L.", text: "The booking process is completely seamless. I scheduled my session for June 9 and received an instant response! Highly recommended.", rate: 5 },
              { user: "Marcus V.", text: "Very professional staff and top-tier products. The La Mer facial treatment left my skin feeling completely refreshed.", rate: 5 },
              { user: "Elena G.", text: "Glamora is hands down the best beauty salon in London. The environment is relaxing, and the stylists are absolute experts.", rate: 5 }
            ].map((rev, i) => (
              <motion.div 
                whileHover={{ y: -4 }}
                key={i} 
                className="luxury-card bg-card/60 backdrop-blur-sm border border-border rounded-[2rem] p-8 flex flex-col justify-between"
              >
                <div className="flex text-primary mb-4 space-x-1">
                  {[...Array(rev.rate)].map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs font-medium italic text-muted-foreground mb-6 leading-relaxed">"{rev.text}"</p>
                <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-black text-primary text-[10px]">
                    {rev.user.charAt(0)}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground">{rev.user} • Verified Guest</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPACT CTA */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="luxury-container">
          <div className="bg-primary p-12 sm:p-16 rounded-[3rem] text-background text-center shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/glamora-salon/images/luxury-gold-abstract.png')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none" />
            
            <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
              <h2 className="text-background text-4xl sm:text-5xl font-serif font-black tracking-tight leading-tight uppercase">Ready for your <br /><span className="italic text-accent">Appointment?</span></h2>
              <p className="text-sm text-background/80 font-medium leading-relaxed">
                Step into a world of ultimate beauty and care. Book your ritual slot online and customize your selection with our master artisans.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/booking" className="btn-primary bg-background text-primary px-10 py-4.5 border-none shadow-xl hover:scale-105 transition-all">Book Now</Link>
                <Link href="/contact" className="btn-outline border-background/20 text-background hover:bg-background/10 px-10 py-4.5 hover:scale-105 transition-all">Contact Us</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
