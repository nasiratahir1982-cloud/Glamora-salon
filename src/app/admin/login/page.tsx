"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  ChevronLeft,
  Fingerprint,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isAdminLoggedIn");
      if (loggedIn === "true") {
        window.location.replace("/glamora-salon/admin/");
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Snappier luxury authentication
    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("isAdminLoggedIn", "true");
      }
      window.location.replace("/glamora-salon/admin/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* 🔙 BACK TO WEBSITE BUTTON */}
      <Link 
        href="/" 
        className="absolute top-10 left-10 z-[200] flex items-center space-x-3 text-muted-foreground hover:text-primary transition-all group p-2"
      >
        <div className="w-10 h-10 bg-accent/50 rounded-xl flex items-center justify-center border border-border group-hover:border-primary/30 group-hover:scale-110 transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </div>
        <div className="hidden sm:block">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">Return to</p>
          <p className="text-xs font-serif font-black tracking-tight mt-1 text-foreground">Glamora Experience</p>
        </div>
      </Link>

      {/* 🎭 LUXURY BACKGROUND ELEMENTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md z-10"
      >
        {/* 1. BRAND HEADER */}
        <div className="text-center mb-10 space-y-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-primary/30"
          >
            <Sparkles className="text-background w-8 h-8" />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-black tracking-tight uppercase">Glamora</h1>
            <div className="flex items-center justify-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Management Gateway</p>
            </div>
          </div>
        </div>

        {/* 2. LOGIN CARD */}
        <div className="luxury-card !p-10 border-primary/20 bg-card/80 backdrop-blur-xl shadow-premium">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Administrator ID</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@glamora.uk"
                    className="w-full bg-accent/30 border border-border rounded-xl py-3 px-12 text-xs font-bold focus:outline-none focus:border-primary focus:bg-background transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Access Key</label>
                  <button type="button" className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">Recover Key</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-accent/30 border border-border rounded-xl py-3 px-12 text-xs font-bold focus:outline-none focus:border-primary focus:bg-background transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Device */}
            <div className="flex items-center space-x-2 px-1">
              <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-border text-primary focus:ring-primary bg-accent/50" />
              <label htmlFor="remember" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest cursor-pointer select-none">Trusted Workstation</label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full btn-primary !py-4 rounded-xl shadow-xl shadow-primary/20 relative overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-3"
                  >
                    <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authenticating...</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="static"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Enter Management Portal</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          {/* Biometric Prompt */}
          <div className="mt-8 pt-8 border-t border-border text-center">
            <button className="inline-flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors">
              <Fingerprint className="w-5 h-5" />
              <span className="text-[9px] font-black uppercase tracking-widest">Biometric Login</span>
            </button>
          </div>
        </div>

        {/* 3. FOOTER ACTIONS */}
        <div className="mt-8 flex items-center justify-center space-x-6 text-muted-foreground">
          <Link href="/" className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors">
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Salon Website</span>
          </Link>
          <div className="w-1 h-1 bg-border rounded-full" />
          <Link href="/contact" className="text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors">Support</Link>
        </div>
      </motion.div>
    </div>
  );
}
