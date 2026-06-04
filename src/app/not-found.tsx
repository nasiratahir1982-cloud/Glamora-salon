"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Home, Search, ShieldAlert, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      // If the path is the absolute root '/' or empty, redirect to the subdirectory '/glamora-salon/'
      if (path === "/" || path === "") {
        window.location.replace("/glamora-salon/");
        return;
      }
      // If pathname is exactly /glamora-salon (no trailing slash), redirect to /glamora-salon/
      if (path === "/glamora-salon") {
        window.location.replace("/glamora-salon/");
        return;
      }
      // For any clean paths missing trailing slash (e.g. /glamora-salon/about -> /glamora-salon/about/)
      if (path.startsWith("/glamora-salon") && !path.endsWith("/")) {
        const parts = path.split("/");
        const lastPart = parts[parts.length - 1];
        if (!lastPart.includes(".")) {
          window.location.replace(path + "/");
        }
      }
    }
  }, []);

  return (
    <main className="page-reveal min-h-screen bg-background">
      <Navbar />
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Backdrop */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background z-10" />
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-10 scale-110" 
          />
        </div>

        <div className="luxury-container relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
            className="space-y-12"
          >
            <div className="badge-luxury mb-16 border-4 border-red-500/30 text-red-500">
              <ShieldAlert className="w-5 h-5" />
              <span>Page Not Found: 404</span>
            </div>
            
            <h1 className="text-8xl md:text-[14rem] font-serif font-black text-foreground tracking-tighter leading-none">
              Page <br /> <span className="text-primary italic">Not Found.</span>
            </h1>
            
            <p className="text-3xl text-muted-foreground font-medium max-w-3xl mx-auto leading-relaxed">
              We couldn't find the page you're looking for. It might have been moved or deleted.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-12 pt-20">
              <Link href="/" className="btn-primary px-20 py-10 shadow-tesla group">
                <Home className="w-6 h-6 mr-4" /> Return Home
              </Link>
              <button 
                onClick={() => {
                  const event = new KeyboardEvent('keydown', {
                    key: 'k',
                    metaKey: true
                  });
                  window.dispatchEvent(event);
                }}
                className="btn-outline px-20 py-10 group"
              >
                <Search className="w-6 h-6 mr-4" /> Search Site
              </button>
            </div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center space-x-20 opacity-20">
          <Zap className="w-12 h-12 text-primary animate-pulse" />
          <Sparkles className="w-16 h-16 text-primary animate-bounce" />
          <Zap className="w-12 h-12 text-primary animate-pulse" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
