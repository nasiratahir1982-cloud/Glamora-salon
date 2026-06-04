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
  Shield
} from "lucide-react";
import Link from "next/link";

const FeatureCard = ({ icon: Icon, title, desc }: any) => (
  <div className="luxury-card flex flex-col items-start h-full">
    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-5 h-5" />
    </div>
    <h3 className="text-base font-serif font-black mb-2">{title}</h3>
    <p className="text-[11px] text-muted-foreground leading-relaxed">{desc}</p>
  </div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. HIGH-DENSITY HERO */}
      <section className="pt-[100px] pb-12 bg-accent/20 border-b border-border">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="badge-luxury">
                <Sparkles className="w-3 h-3" />
                <span>Beauty Care v4.0</span>
              </div>
              <h1 className="leading-tight">
                Modern Care for <br /> 
                <span className="text-primary italic">Your Beauty.</span>
              </h1>
              <p className="text-sm text-muted-foreground font-medium max-w-md">
                Book services, manage appointments, and explore products with our simple management system.
              </p>
              <div className="flex items-center gap-3">
                <Link href="/booking" className="btn-primary">
                  Book Now <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </Link>
                <Link href="/products" className="btn-outline">
                  Our Products
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-background bg-accent overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
                  <span className="text-foreground">15k+ Happy Clients</span>
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-md border-2 border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80" 
                  className="w-full h-[320px] object-cover grayscale"
                  alt="Salon"
                />
              </div>
              {/* Floating Widget */}
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl border border-border shadow-md z-20 hidden md:block">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Growth</p>
                    <p className="text-sm font-black text-foreground">+24%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-md">
              <div className="badge-luxury mb-2">Quality First</div>
              <h2>Excellence in <span className="text-primary italic">Care.</span></h2>
            </div>
          </div>
          
          <div className="saas-grid">
            <FeatureCard icon={ShieldCheck} title="Secure" desc="Safe and reliable booking." />
            <FeatureCard icon={Clock} title="Fast" desc="Easy online scheduling." />
            <FeatureCard icon={Zap} title="Live" desc="Real-time availability." />
            <FeatureCard icon={Globe} title="Global" desc="Multiple branch support." />
          </div>
        </div>
      </section>

      {/* 3. MANAGEMENT PREVIEW */}
      <section className="section-padding bg-accent/10 border-y border-border">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="luxury-card !p-0 shadow-md overflow-hidden border">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" className="w-full h-64 object-cover grayscale opacity-70" alt="Dashboard" />
              </div>
            </div>
            <div className="space-y-4 order-1 lg:order-2">
              <div className="badge-luxury">Admin Hub</div>
              <h2 className="tracking-tight">Easy <span className="text-primary">Management.</span></h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Control your business from one dashboard. Track sales, staff, and client feedback.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Bookings", val: "99%" },
                  { label: "Our Shops", val: "24+" },
                ].map((stat, i) => (
                  <div key={i} className="p-3 bg-card border border-border rounded-lg">
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-lg font-serif font-black text-primary">{stat.val}</p>
                  </div>
                ))}
              </div>
              <Link href="/admin" className="btn-primary inline-flex">
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATISTICS */}
      <section className="section-padding bg-background border-b border-border">
        <div className="luxury-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Clients", val: "15k+", icon: Users },
              { label: "Stylists", val: "120+", icon: Scissors },
              { label: "Rating", val: "4.9/5", icon: Star },
              { label: "Visits", val: "45k+", icon: Award },
            ].map((m, i) => (
              <div key={i} className="text-center space-y-2">
                <m.icon className="w-4 h-4 text-primary mx-auto opacity-50" />
                <p className="text-2xl font-serif font-black">{m.val}</p>
                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container">
          <div className="saas-grid-3">
            {[
              { user: "Sophia L.", text: "Perfect booking process.", rate: 5 },
              { user: "Marcus V.", text: "Very professional staff.", rate: 5 },
              { user: "Elena G.", text: "Amazing skin treatments.", rate: 5 }
            ].map((rev, i) => (
              <div key={i} className="luxury-card border-x-0 border-t-0 border-b-2 rounded-none bg-transparent !p-2">
                <div className="flex text-primary mb-2">
                  <Star className="w-3 h-3 fill-primary" />
                </div>
                <p className="text-xs font-serif italic text-foreground mb-3 leading-relaxed">"{rev.text}"</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{rev.user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPACT CTA */}
      <section className="section-padding bg-background">
        <div className="luxury-container">
          <div className="bg-primary p-8 rounded-2xl text-background text-center shadow-lg">
            <h2 className="text-background mb-4">Ready for your <span className="italic text-accent">Appointment?</span></h2>
            <div className="flex justify-center gap-4">
              <Link href="/booking" className="btn-primary bg-background text-primary">Book Now</Link>
              <Link href="/contact" className="btn-outline border-background/30 text-background">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
