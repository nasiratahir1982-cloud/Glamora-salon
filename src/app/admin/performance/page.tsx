"use client";

import React, { useState, useEffect } from "react";
import { 
  Clock, 
  Activity, 
  TrendingUp, 
  Percent, 
  Users, 
  Layers,
  ChevronDown,
  Info,
  RefreshCw,
  Sliders,
  Laptop,
  Smartphone,
  Tablet,
  CheckCircle,
  HelpCircle,
  BarChart3,
  Zap,
  Sparkles,
  X
} from "lucide-react";
import { 
  ComposedChart,
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Area
} from 'recharts';
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Data for "Load Time vs Bounce Rate"
const loadTimeData = [
  { name: '0.5s', pageViews: 12000, bounceRate: 15 },
  { name: '1.0s', pageViews: 24000, bounceRate: 18 },
  { name: '1.5s', pageViews: 32000, bounceRate: 22 },
  { name: '2.0s', pageViews: 45000, bounceRate: 28 }, // Median Peak
  { name: '2.5s', pageViews: 28000, bounceRate: 35 },
  { name: '3.0s', pageViews: 18000, bounceRate: 42 },
  { name: '4.0s', pageViews: 11000, bounceRate: 51 },
  { name: '5.0s', pageViews: 7500, bounceRate: 60 },
  { name: '6.0s', pageViews: 4500, bounceRate: 68 },
  { name: '8.0s', pageViews: 2500, bounceRate: 75 },
  { name: '10.0s', pageViews: 1200, bounceRate: 85 },
  { name: '12.5s', pageViews: 800, bounceRate: 89 },
  { name: '15.0s', pageViews: 400, bounceRate: 92 },
  { name: '17.5s', pageViews: 200, bounceRate: 95 },
  { name: '20.0s', pageViews: 100, bounceRate: 98 },
];

// Mock Data for "Start Render vs Bounce Rate"
const startRenderData = [
  { name: '0.2s', pageViews: 15000, bounceRate: 14 },
  { name: '0.4s', pageViews: 28000, bounceRate: 16 },
  { name: '0.6s', pageViews: 38000, bounceRate: 19 },
  { name: '0.8s', pageViews: 42000, bounceRate: 24 },
  { name: '1.0s', pageViews: 31000, bounceRate: 30 }, // Median Peak
  { name: '1.2s', pageViews: 21000, bounceRate: 38 },
  { name: '1.5s', pageViews: 15000, bounceRate: 45 },
  { name: '2.0s', pageViews: 9000, bounceRate: 54 },
  { name: '2.5s', pageViews: 5000, bounceRate: 62 },
  { name: '3.0s', pageViews: 3000, bounceRate: 70 },
  { name: '3.5s', pageViews: 1800, bounceRate: 78 },
  { name: '4.0s', pageViews: 1000, bounceRate: 83 },
  { name: '4.5s', pageViews: 600, bounceRate: 88 },
  { name: '5.0s', pageViews: 300, bounceRate: 93 },
];

// Historical Performance Vitals Trend
const historyTrendData = [
  { name: 'May 28', loadTime: 0.78, bounce: 41.2 },
  { name: 'May 29', loadTime: 0.75, bounce: 40.9 },
  { name: 'May 30', loadTime: 0.72, bounce: 40.7 },
  { name: 'May 31', loadTime: 0.74, bounce: 40.8 },
  { name: 'Jun 01', loadTime: 0.70, bounce: 40.6 },
  { name: 'Jun 02', loadTime: 0.69, bounce: 40.3 },
  { name: 'Jun 03', loadTime: 0.68, bounce: 40.1 },
];

export default function PerformanceDashboard() {
  const [deviceFilter, setDeviceFilter] = useState<"all" | "desktop" | "mobile">("all");
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "24h">("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Stat definitions matching user request
  const stats = [
    { 
      id: "loadTime",
      title: "Page Load (LUX)", 
      value: "0.7s", 
      trend: "-12.5%", 
      isPositive: true,
      desc: "Median time taken for the page to fully load in the visitor's browser.",
      color: "from-amber-500/20 to-primary/10",
      textColor: "text-primary",
      icon: Clock
    },
    { 
      id: "pageViews",
      title: "Page Views (LUX)", 
      value: "2.7M", 
      trend: "+8.4%", 
      isPositive: true,
      desc: "Total number of pages tracked and loaded by visitors.",
      color: "from-blue-500/20 to-indigo-500/10",
      textColor: "text-blue-400",
      icon: Layers
    },
    { 
      id: "bounceRate",
      title: "Bounce Rate (LUX)", 
      value: "40.6%", 
      trend: "-2.1%", 
      isPositive: true,
      desc: "Percentage of visitors who navigate away after viewing only one page.",
      color: "from-rose-500/20 to-orange-500/10",
      textColor: "text-rose-400",
      icon: Percent
    },
    { 
      id: "sessions",
      title: "Sessions (LUX)", 
      value: "479K", 
      trend: "+14.2%", 
      isPositive: true,
      desc: "A session is the period of time a user is actively engaged with the website.",
      color: "from-green-500/20 to-emerald-500/10",
      textColor: "text-green-400",
      icon: Users
    },
    { 
      id: "sessionLength",
      title: "Session Length (LUX)", 
      value: "17 min", 
      trend: "+5.1%", 
      isPositive: true,
      desc: "The average duration of an active user session on the site.",
      color: "from-purple-500/20 to-violet-500/10",
      textColor: "text-purple-400",
      icon: Activity
    },
    { 
      id: "pvsPerSession",
      title: "PVs Per Session (LUX)", 
      value: "2.0 pvs", 
      trend: "+1.2%", 
      isPositive: true,
      desc: "Average number of page views recorded per session.",
      color: "from-cyan-500/20 to-teal-500/10",
      textColor: "text-cyan-400",
      icon: BarChart3
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* 🎭 HEADER: LUXURY ARCHITECTURAL HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5 relative">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Web Diagnostics & Performance</span>
          </div>
          <h1 className="text-4xl font-serif font-black tracking-tight uppercase">
            Real User <span className="text-primary italic">Monitoring.</span>
          </h1>
          <p className="text-xs text-muted-foreground max-w-lg leading-relaxed font-medium">
            Live Web Vitals, speed indexes, and visitor satisfaction tracking. Optimizing speed directly lowers bounce rates.
          </p>
        </div>

        {/* Global Filter Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Time Picker */}
          <div className="flex bg-card p-1 rounded-xl border border-border">
            {[
              { label: "24H", value: "24h" },
              { label: "7 Days", value: "7d" },
              { label: "30 Days", value: "30d" }
            ].map(range => (
              <button
                key={range.value}
                onClick={() => setActiveRange(range.value as any)}
                className={cn(
                  "px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all",
                  activeRange === range.value ? "bg-primary text-background shadow-md" : "text-muted-foreground hover:text-primary"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Refresh Action */}
          <button 
            onClick={refreshData}
            disabled={isRefreshing}
            className="p-3 bg-card border border-border rounded-xl hover:border-primary/50 text-muted-foreground hover:text-primary transition-all flex items-center justify-center shrink-0 disabled:opacity-50"
            aria-label="Refresh statistics"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin text-primary")} />
          </button>
        </div>
      </div>

      {/* 📊 SUMMARY VITAL CARDS: STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => setSelectedStat(stat.id)}
            key={stat.id}
            className="luxury-card !p-5 relative cursor-pointer overflow-hidden group bg-gradient-to-br from-card to-accent/5 hover:border-primary/40 transition-all duration-300"
          >
            <div className={cn("absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br", stat.color)} />
            
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2.5 rounded-xl bg-accent border border-border group-hover:border-primary/20 group-hover:text-primary transition-all")}>
                <stat.icon className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                {stat.trend}
              </span>
            </div>
            
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">{stat.title}</p>
              <h3 className={cn("text-2xl font-serif font-black tracking-tight", stat.textColor)}>{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 📈 DUAL CHART SECTION: CORE PERFORMANCE GRAPHS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Graph 1: Load Time vs Bounce Rate */}
        <div className="luxury-card !p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-black tracking-tight">Load Time vs Bounce Rate</h3>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Core Web Vitals Correlation</p>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                <span className="text-[9px] font-black text-primary uppercase tracking-widest">Median Load: 0.7s</span>
              </div>
            </div>

            <div className="h-[280px] w-full mt-4">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={loadTimeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--muted-foreground)" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="var(--muted-foreground)" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="var(--muted-foreground)" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(val) => `${val}%`}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '16px', fontSize: '10px' }}
                      labelStyle={{ fontWeight: 'black', color: 'var(--primary)' }}
                    />
                    {/* Background Glow Area */}
                    <defs>
                      <linearGradient id="glowViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Bar 
                      yAxisId="left"
                      dataKey="pageViews" 
                      fill="var(--primary)" 
                      opacity={0.35}
                      radius={[4, 4, 0, 0]} 
                      name="Page Views"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="bounceRate" 
                      stroke="#f43f5e" 
                      strokeWidth={3}
                      dot={{ r: 3, stroke: '#f43f5e', strokeWidth: 1, fill: '#0a0a0a' }}
                      activeDot={{ r: 5, fill: '#f43f5e' }}
                      name="Bounce Rate"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 text-[10px] text-muted-foreground font-medium">
            <span>X-Axis: Load Speed Interval (Seconds)</span>
            <span className="text-rose-400 font-bold">Line: Bounce Probability (%)</span>
          </div>
        </div>

        {/* Graph 2: Start Render vs Bounce Rate */}
        <div className="luxury-card !p-8 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
          
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-serif font-black tracking-tight">Start Render vs Bounce Rate</h3>
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">First Contentful Paint Correlation</p>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Median Render: 1.0s</span>
              </div>
            </div>

            <div className="h-[280px] w-full mt-4">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={startRenderData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--muted-foreground)" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      yAxisId="left"
                      stroke="var(--muted-foreground)" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      stroke="var(--muted-foreground)" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(val) => `${val}%`}
                    />
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '16px', fontSize: '10px' }}
                      labelStyle={{ fontWeight: 'black', color: 'var(--primary)' }}
                    />
                    <Bar 
                      yAxisId="left"
                      dataKey="pageViews" 
                      fill="var(--primary)" 
                      opacity={0.35}
                      radius={[4, 4, 0, 0]} 
                      name="Page Views"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="bounceRate" 
                      stroke="#f43f5e" 
                      strokeWidth={3}
                      dot={{ r: 3, stroke: '#f43f5e', strokeWidth: 1, fill: '#0a0a0a' }}
                      activeDot={{ r: 5, fill: '#f43f5e' }}
                      name="Bounce Rate"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 text-[10px] text-muted-foreground font-medium">
            <span>X-Axis: Visual Render Interval (Seconds)</span>
            <span className="text-rose-400 font-bold">Line: Bounce Probability (%)</span>
          </div>
        </div>

      </div>

      {/* 🛠️ ADDITIONAL INSIGHTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Device Distribution */}
        <div className="luxury-card !p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h4 className="font-serif font-black text-base">Device Optimization</h4>
            <Sliders className="w-4 h-4 text-primary" />
          </div>
          <div className="space-y-4">
            {[
              { name: "Desktop Sessions", value: "62%", desc: "Avg Load: 0.6s", icon: Laptop, color: "text-primary" },
              { name: "Mobile Phones", value: "31%", desc: "Avg Load: 0.9s", icon: Smartphone, color: "text-blue-400" },
              { name: "Tablets & IPads", value: "7%", desc: "Avg Load: 0.8s", icon: Tablet, color: "text-purple-400" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-accent/20 border border-border rounded-xl hover:border-primary/20 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-card flex items-center justify-center border border-border">
                    <item.icon className={cn("w-4 h-4", item.color)} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-tight">{item.name}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-black">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Web Vitals Audit */}
        <div className="luxury-card !p-8 space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h4 className="font-serif font-black text-base">Google Core Web Vitals Status</h4>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "LCP (Largest Contentful Paint)", status: "Good", value: "1.2s", target: "< 2.5s", color: "bg-green-500/10 text-green-500 border-green-500/20" },
              { title: "FID (First Input Delay)", status: "Good", value: "14ms", target: "< 100ms", color: "bg-green-500/10 text-green-500 border-green-500/20" },
              { title: "CLS (Cumulative Layout Shift)", status: "Good", value: "0.02", target: "< 0.1", color: "bg-green-500/10 text-green-500 border-green-500/20" }
            ].map((vital, i) => (
              <div key={i} className={cn("p-5 rounded-2xl border flex flex-col justify-between space-y-4", vital.color)}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider">{vital.status}</span>
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold opacity-80 uppercase tracking-tight">{vital.title}</p>
                  <p className="text-2xl font-serif font-black mt-2">{vital.value}</p>
                </div>
                <div className="text-[9px] opacity-70 border-t border-current/10 pt-2 flex justify-between">
                  <span>Target Range</span>
                  <span>{vital.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🎭 POPUP DETAIL MODAL: ON CLICK VITAL DETAILS */}
      <AnimatePresence>
        {selectedStat && (() => {
          const matchedStat = stats.find(s => s.id === selectedStat);
          if (!matchedStat) return null;
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card w-full max-w-lg rounded-3xl p-8 relative border border-border shadow-premium"
              >
                {/* Accent glow background */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                      <matchedStat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-primary">Technical Audit</span>
                      <h3 className="text-xl font-serif font-black tracking-tight">{matchedStat.title}</h3>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedStat(null)}
                    className="p-1.5 rounded-full border border-border hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Explanation */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {matchedStat.desc}
                </p>

                {/* historical chart */}
                <div className="bg-accent/20 border border-border p-5 rounded-2xl space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-foreground">7-Day Diagnostic Trend</h4>
                  <div className="h-[120px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={historyTrendData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                        <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={8} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--muted-foreground)" fontSize={8} tickLine={false} axisLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '12px', fontSize: '9px' }}
                        />
                        <Area type="monotone" dataKey={selectedStat === "bounceRate" ? "bounce" : "loadTime"} fill="var(--primary)" stroke="var(--primary)" fillOpacity={0.1} strokeWidth={2} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t border-border">
                  <button 
                    onClick={() => setSelectedStat(null)}
                    className="btn-primary !py-3 !px-8 text-[10px] uppercase font-black tracking-widest"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

    </div>
  );
}
