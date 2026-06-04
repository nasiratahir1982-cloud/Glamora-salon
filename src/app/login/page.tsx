"use client";

import React, { useState } from "react";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  Eye, 
  EyeOff,
  ChefHat,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // FIXED CREDENTIALS
  const FIXED_EMAIL = "admin@glamora.uk";
  const FIXED_PASSWORD = "glamoraadmin";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      if (email === FIXED_EMAIL && password === FIXED_PASSWORD) {
        // Success
        router.push("/admin");
      } else {
        setError("Invalid credentials. Please verify your email and password.");
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
      </div>

      {/* Back Button */}
      <Link 
        href="/" 
        className="absolute top-10 left-10 flex items-center space-x-2 px-5 py-2.5 bg-accent/30 hover:bg-accent/50 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border border-border"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </Link>

      {/* Top Lock Icon */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10 w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center border border-primary/20 shadow-[0_0_40px_rgba(197,164,126,0.1)]"
      >
        <Lock className="w-8 h-8 text-primary/80" />
      </motion.div>

      {/* Title Section */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-6xl sm:text-7xl font-sans font-black tracking-tighter uppercase flex items-center justify-center">
          Admin <span className="text-primary ml-4">Portal</span>
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <div className="h-px w-8 bg-border" />
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
            Glamora Salon • Secure Entry
          </p>
          <div className="h-px w-8 bg-border" />
        </div>
      </motion.div>

      {/* Login Card */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md bg-[#121212] rounded-[2.5rem] p-10 border border-border shadow-2xl relative"
      >
        <form onSubmit={handleLogin} className="space-y-8">
          
          {/* Email Field */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/80 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input 
                type="email" 
                required
                placeholder="admin@glamora.uk"
                className="w-full bg-accent/20 border border-border focus:border-primary/50 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold placeholder:text-muted-foreground/30 focus:outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-widest text-primary/80 ml-1">Secure Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                placeholder="••••••••"
                className="w-full bg-accent/20 border border-border focus:border-primary/50 rounded-2xl py-4 pl-14 pr-14 text-sm font-bold placeholder:text-muted-foreground/30 focus:outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-bold flex items-center"
            >
              <ShieldCheck className="w-4 h-4 mr-2 flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-5 bg-primary hover:bg-primary/90 text-background rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 transition-all disabled:opacity-50"
          >
            <span>{isLoading ? "Authenticating..." : "Sign In To Portal"}</span>
            {!isLoading && <ArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </motion.div>

      {/* Bottom Legal Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-12 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] text-center"
      >
        Unauthorized Access is Strictly Prohibited
      </motion.p>

      {/* Floating Decorative Icon */}
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30 backdrop-blur-md shadow-2xl">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-background">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
}
