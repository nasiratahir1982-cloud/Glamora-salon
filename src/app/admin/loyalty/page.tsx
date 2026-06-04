"use client";

import React, { useState } from "react";
import { 
  Award, 
  Star, 
  Zap, 
  Users, 
  Send, 
  CheckCircle2, 
  Clock, 
  Gift, 
  ShieldCheck, 
  Crown,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Filter,
  Search,
  MoreHorizontal,
  Mail,
  Smartphone,
  Check,
  X,
  MessageSquare,
  ShieldAlert,
  ArrowUpRight,
  Fingerprint
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const membershipTiers = [
  { name: "Platinum Elite", count: 12, color: "text-primary", bg: "bg-primary/10", icon: Crown, trend: "+12%" },
  { name: "Gold Prestige", count: 45, color: "text-amber-500", bg: "bg-amber-500/10", icon: Award, trend: "+8%" },
  { name: "Silver Member", count: 128, color: "text-slate-400", bg: "bg-slate-400/10", icon: ShieldCheck, trend: "+24%" },
];

const pendingRituals = [
  { 
    id: "OFF-1", 
    customer: "Sophia Reynolds", 
    trigger: "5th Milestone Visit", 
    reward: "20% Royal Discount", 
    category: "Milestone",
    status: "Platinum VIP",
    engagement: "98%",
    initials: "SR"
  },
  { 
    id: "OFF-2", 
    customer: "Marcus Thorne", 
    trigger: "Re-engagement Protocol", 
    reward: "Complimentary Grooming", 
    category: "Retention",
    status: "Gold Elite",
    engagement: "42%",
    initials: "MT"
  },
  { 
    id: "OFF-3", 
    customer: "Isabella Vane", 
    trigger: "Patron Anniversary", 
    reward: "Luxury Facial Set", 
    category: "Celebration",
    status: "Platinum VIP",
    engagement: "100%",
    initials: "IV"
  },
  { 
    id: "OFF-4", 
    customer: "Julian Moore", 
    trigger: "High-Spender Alert", 
    reward: "Private Suite Upgrade", 
    category: "Privilege",
    status: "Diamond Member",
    engagement: "95%",
    initials: "JM"
  },
];

export default function LoyaltyDashboard() {
  const [rituals, setRituals] = useState(pendingRituals);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setIsProcessing(id);
    setTimeout(() => {
      setRituals(prev => prev.filter(r => r.id !== id));
      setIsProcessing(null);
    }, 1200);
  };

  const handleReject = (id: string) => {
    setRituals(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-10 pb-16">
      {/* 🎭 HEADER: ARCHITECTURAL ELEGANCE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5 relative">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Patronage Intelligence</span>
          </div>
          <h1 className="text-4xl font-serif font-black tracking-tight uppercase">Loyalty <span className="text-primary">&</span> Privileges</h1>
          <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
            Manage the elite circle of Glamora patrons. Approve AI-triggered rewards and oversee the ritualistic distribution of membership privileges.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 bg-accent/30 rounded-2xl border border-border flex items-center space-x-6">
            <div className="text-center">
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Active VIPs</p>
              <p className="text-sm font-black">185</p>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="text-center">
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Rewards</p>
              <p className="text-sm font-black">1.2k</p>
            </div>
          </div>
          <button className="btn-primary !px-10 !py-4 shadow-2xl shadow-primary/20 flex items-center space-x-3 group">
            <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">New Campaign</span>
          </button>
        </div>
      </div>

      {/* 👑 MEMBERSHIP TIER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {membershipTiers.map((tier, i) => (
          <motion.div 
            whileHover={{ y: -5 }}
            key={i} 
            className="luxury-card group relative overflow-hidden !p-8 border-primary/10 hover:border-primary/40 transition-all bg-gradient-to-br from-card to-accent/5"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            <div className="flex items-start justify-between mb-8">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner", tier.bg)}>
                <tier.icon className={cn("w-7 h-7", tier.color)} />
              </div>
              <div className="flex items-center space-x-1 text-green-500 text-[10px] font-black">
                <ArrowUpRight className="w-3 h-3" />
                <span>{tier.trend}</span>
              </div>
            </div>
            <h3 className="text-xl font-serif font-black tracking-tight mb-1">{tier.name}</h3>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{tier.count} Elite Patrons</p>
            
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <button className="text-[9px] font-black uppercase tracking-[0.2em] text-primary hover:tracking-[0.3em] transition-all">Review Tier</button>
              <div className="flex -space-x-2">
                {[1,2,3].map(n => (
                  <div key={n} className="w-6 h-6 rounded-full border-2 border-card bg-accent overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${n + i * 5}`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔍 THE APPROVAL ENGINE: CRM SYSTEM */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-xl font-serif font-black uppercase tracking-tighter">Reward Approval Engine</h3>
            <div className="px-3 py-1 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-[9px] font-black uppercase tracking-widest text-primary animate-pulse">{rituals.length} Pending Actions</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find Patron..." 
                className="bg-accent/30 border border-border rounded-xl py-2.5 px-12 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-primary transition-all w-64"
              />
            </div>
            <button className="p-2.5 bg-accent/50 rounded-xl border border-border hover:border-primary transition-all">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="luxury-card !p-0 border-white/5 overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-6 p-6 bg-accent/20 border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">
            <div className="col-span-4">Patron Identity</div>
            <div className="col-span-2 text-center">Trigger Event</div>
            <div className="col-span-3 text-center">Ritual Reward</div>
            <div className="col-span-3 text-right pr-6">Action Protocol</div>
          </div>

          <div className="divide-y divide-white/5">
            <AnimatePresence mode="popLayout">
              {rituals.map((ritual) => (
                <motion.div 
                  key={ritual.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.98, backgroundColor: "rgba(184, 158, 107, 0.05)" }}
                  className="grid grid-cols-12 gap-6 p-8 items-center hover:bg-white/[0.02] transition-colors group relative"
                >
                  {/* Patron Identity */}
                  <div className="col-span-4 flex items-center space-x-5">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-[1.25rem] flex items-center justify-center text-background font-serif font-black text-lg shadow-xl shadow-primary/10 relative z-10">
                        {ritual.initials}
                      </div>
                      <div className="absolute -inset-1 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.25rem]" />
                    </div>
                    <div className="space-y-1.5">
                      <h4 className="text-sm font-black tracking-tight">{ritual.customer}</h4>
                      <div className="flex items-center space-x-3">
                        <span className={cn(
                          "text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                          ritual.status.includes("Platinum") ? "bg-primary/10 text-primary border-primary/20" : "bg-accent text-muted-foreground border-border"
                        )}>
                          {ritual.status}
                        </span>
                        <div className="flex items-center space-x-1 text-[8px] font-bold text-muted-foreground uppercase">
                          <TrendingUp className="w-2.5 h-2.5" />
                          <span>{ritual.engagement} Eng.</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Event */}
                  <div className="col-span-2 text-center">
                    <div className="inline-flex flex-col items-center">
                      <p className="text-[10px] font-black uppercase tracking-tight">{ritual.trigger}</p>
                      <div className="flex items-center space-x-1 mt-1 text-primary/60">
                        <Clock className="w-3 h-3" />
                        <span className="text-[8px] font-bold uppercase tracking-widest italic">Automated</span>
                      </div>
                    </div>
                  </div>

                  {/* Ritual Reward */}
                  <div className="col-span-3">
                    <div className="luxury-card !p-3 !bg-primary/5 border-primary/20 flex items-center justify-center space-x-3 group-hover:border-primary/40 transition-all">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                        <Gift className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <p className="text-[9px] font-black uppercase tracking-widest text-primary">{ritual.category}</p>
                        <p className="text-[11px] font-black tracking-tight text-foreground">{ritual.reward}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Protocol */}
                  <div className="col-span-3 flex items-center justify-end space-x-3 pr-4">
                    <button 
                      onClick={() => handleReject(ritual.id)}
                      className="p-3.5 bg-accent/50 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-2xl border border-border hover:border-red-500/20 transition-all group/reject"
                    >
                      <X className="w-4 h-4 transition-transform group-hover/reject:rotate-90" />
                    </button>
                    <button 
                      disabled={isProcessing === ritual.id}
                      onClick={() => handleApprove(ritual.id)}
                      className={cn(
                        "flex items-center space-x-3 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all relative overflow-hidden group/approve",
                        isProcessing === ritual.id 
                          ? "bg-primary/20 text-primary cursor-wait" 
                          : "bg-primary text-background shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                      )}
                    >
                      <AnimatePresence mode="wait">
                        {isProcessing === ritual.id ? (
                          <motion.div 
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-3 h-3 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                            <span>Processing...</span>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="static"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center space-x-2"
                          >
                            <Send className="w-4 h-4 group-hover/approve:translate-x-1 group-hover/approve:-translate-y-1 transition-transform" />
                            <span>Approve & Send</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {rituals.length === 0 && (
              <div className="py-32 text-center flex flex-col items-center space-y-6">
                <div className="w-20 h-20 bg-accent rounded-[2.5rem] flex items-center justify-center border border-border">
                  <ShieldCheck className="w-10 h-10 text-primary/30" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-serif font-black uppercase tracking-tight">Ritual Queue Empty</h4>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.4em]">All patron rewards have been sanctified.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 📊 FOOTER INTELLIGENCE */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { label: "CRM Automation", value: "94.2%", icon: Zap },
          { label: "Patron Retention", value: "88%", icon: TrendingUp },
          { label: "Elite Satisfaction", value: "4.9/5", icon: Star },
          { label: "Privilege Security", value: "Active", icon: Fingerprint },
        ].map((stat, i) => (
          <div key={i} className="luxury-card !p-6 flex items-center justify-between border-white/5">
            <div>
              <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-lg font-black">{stat.value}</p>
            </div>
            <stat.icon className="w-5 h-5 text-primary/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
