"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Search, 
  X, 
  History, 
  TrendingUp, 
  Command, 
  ArrowRight,
  Sparkles,
  Scissors,
  Users,
  Calendar,
  Layers,
  Zap,
  Mic
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const suggestions = [
  { id: "s1", label: "Bridal Ritual Coordination", icon: Sparkles, cat: "Services" },
  { id: "s2", label: "Elite Grooming Portfolio", icon: Scissors, cat: "Artisans" },
  { id: "s3", label: "Royal Gold Essence Collection", icon: Zap, cat: "Products" },
  { id: "s4", label: "Operational Inventory Sync", icon: Layers, cat: "Admin" },
];

export const SearchOverlay = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState(["Salon Services", "Expert Stylists", "London Locations"]);
  const [isListening, setIsListening] = useState(false);
  const router = useRouter();

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const handleVoiceSearch = () => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice Search is not supported in this browser. Please use Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const speechToText = event.results[0][0].transcript;
      setQuery(speechToText);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const handleSearch = (q: string) => {
    if (!q.trim()) return;
    setHistory(prev => [q, ...prev.filter(h => h !== q)].slice(0, 5));
    // Simulate navigation
    handleClose();
    router.push(`/products?search=${q}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-start justify-center pt-[10vh] px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-[20px] cursor-none"
          />

          {/* Search Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-4xl glass-panel rounded-[3rem] overflow-hidden border-4 border-primary/20 shadow-tesla"
          >
            {/* Input Area */}
            <div className="p-10 border-b-4 border-border flex items-center space-x-8">
              <Search className="w-10 h-10 text-primary animate-pulse" />
              <input
                autoFocus
                type="text"
                placeholder="Synchronize with Intelligence..."
                className="flex-1 bg-transparent border-none outline-none text-4xl font-serif font-black text-foreground placeholder:text-muted-foreground/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
              />
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleVoiceSearch}
                  className={cn(
                    "p-4 rounded-2xl transition-all",
                    isListening 
                      ? "bg-red-500 text-white animate-pulse shadow-lg ring-4 ring-red-500/20" 
                      : "hover:bg-primary hover:text-background"
                  )} 
                  data-tooltip="Voice Sync"
                >
                  <Mic className="w-6 h-6" />
                </button>
                <div className="flex items-center px-4 py-2 bg-accent/50 rounded-xl border-2 border-border text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  <Command className="w-3.5 h-3.5 mr-2" /> K
                </div>
                <button onClick={handleClose} className="p-4 hover:bg-red-500 hover:text-white rounded-2xl transition-all">
                  <X className="w-8 h-8" />
                </button>
              </div>
            </div>

            {/* Results / Discovery */}
            <div className="p-12 space-y-12 max-h-[60vh] overflow-y-auto no-scrollbar">
              {/* History */}
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Recent Synchronizations</p>
                <div className="flex flex-wrap gap-4">
                  {history.map((h, i) => (
                    <button 
                      key={i}
                      onClick={() => handleSearch(h)}
                      className="px-8 py-4 bg-accent/30 hover:bg-primary hover:text-background rounded-2xl text-sm font-bold flex items-center space-x-3 transition-all border-2 border-transparent hover:border-primary/50"
                    >
                      <History className="w-4 h-4" />
                      <span>{h}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-8">
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Intelligence Suggestions</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {suggestions.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSearch(s.label)}
                      className="p-8 bg-card border-2 border-border rounded-3xl flex items-center justify-between group hover:border-primary/50 hover:shadow-luxury-gold transition-all"
                    >
                      <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <s.icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="text-lg font-black uppercase tracking-tighter text-foreground">{s.label}</p>
                          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{s.cat}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Navigation */}
              <div className="pt-8 border-t-2 border-border grid grid-cols-3 gap-8">
                {[
                  { label: "Book Ritual", icon: Calendar, href: "/booking" },
                  { label: "Team Intel", icon: Users, href: "/admin/staff" },
                  { label: "Operational Stats", icon: TrendingUp, href: "/admin" },
                ].map((n, i) => (
                  <button 
                    key={i}
                    onClick={() => { handleClose(); router.push(n.href); }}
                    className="flex flex-col items-center p-6 hover:bg-primary/5 rounded-3xl transition-all group"
                  >
                    <n.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground">{n.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Intel */}
            <div className="p-8 bg-accent/20 border-t-2 border-border text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                Search Glamora • Secured and Encrypted
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
