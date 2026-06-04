"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  User, 
  LogIn, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  ChevronRight,
  ArrowRight,
  Timer
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function StaffAttendancePortal() {
  const [staffId, setStaffId] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [lastAction, setLastAction] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = (type: 'in' | 'out') => {
    if (!staffId) {
      setStatus('error');
      return;
    }
    // Simulation
    setLastAction(type === 'in' ? "Sign-In Successful" : "Sign-Out Successful");
    setStatus('success');
    setStaffId("");
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full space-y-12 text-center">
        {/* 1. BRANDING */}
        <div className="flex flex-col items-center space-y-4">
          <Link href="/" className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-2xl rotate-3 mb-4">
            <Sparkles className="text-background w-8 h-8" />
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-black tracking-tighter">GLAMORA</h1>
            <p className="text-[10px] text-primary font-black uppercase tracking-[0.5em]">Staff Sanctuary Portal</p>
          </div>
        </div>

        {/* 2. LIVE CLOCK */}
        <div className="luxury-card !p-10 !rounded-[3rem] border-primary/20 bg-white shadow-premium relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5">
            <Timer className="w-24 h-24" />
          </div>
          <div className="space-y-2 relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">{currentTime.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <h2 className="text-6xl font-serif font-black tracking-tighter text-primary">
              {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </h2>
          </div>
        </div>

        {/* 3. INPUT AREA */}
        <div className="space-y-6 w-full">
          <div className="relative group">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-all" />
            <input 
              type="text" 
              placeholder="Enter Staff ID (e.g. STF-001)" 
              className="w-full bg-white border-2 border-primary/10 rounded-3xl py-6 px-16 text-sm font-bold focus:border-primary focus:bg-white transition-all outline-none shadow-sm"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value.toUpperCase())}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleAction('in')}
              className="group relative flex flex-col items-center justify-center p-8 bg-green-500/5 border-2 border-green-500/10 rounded-[2.5rem] hover:bg-green-500 hover:text-white transition-all overflow-hidden"
            >
              <LogIn className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button 
              onClick={() => handleAction('out')}
              className="group relative flex flex-col items-center justify-center p-8 bg-amber-500/5 border-2 border-amber-500/10 rounded-[2.5rem] hover:bg-amber-500 hover:text-white transition-all overflow-hidden"
            >
              <LogOut className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sign Out</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>

        {/* 4. FEEDBACK */}
        <AnimatePresence mode="wait">
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center space-x-3 text-green-600 bg-green-500/10 py-4 rounded-2xl border border-green-500/20"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">{lastAction}</span>
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center space-x-3 text-red-600 bg-red-500/10 py-4 rounded-2xl border border-red-500/20"
            >
              <AlertCircle className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Invalid Staff Identity</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. FOOTER */}
        <div className="pt-8 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-primary/30">
            <ShieldCheck className="w-5 h-5" />
            <p className="text-[8px] font-black uppercase tracking-[0.5em]">Secure Biometric Simulation Active</p>
          </div>
          <Link href="/admin" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary flex items-center transition-all">
            Return to Management <ArrowRight className="w-3 h-3 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}
