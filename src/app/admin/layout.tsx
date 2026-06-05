"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Scissors, 
  Package, 
  Settings, 
  Bell, 
  Search,
  Menu,
  X,
  LogOut,
  Sparkles,
  User,
  Shield,
  ChevronLeft,
  ChevronRight,
  Zap,
  ShieldCheck,
  Globe,
  TrendingUp,
  Contact2,
  BarChart3,
  Crown,
  PoundSterling,
  Mail,
  ShoppingBag
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Our Team", href: "/admin/staff", icon: Users },
  { name: "Customers", href: "/admin/customers", icon: Contact2 },
  { name: "Appointments", href: "/admin/appointments", icon: Calendar },
  { name: "Product Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Inventory", href: "/admin/inventory", icon: Package },
  { name: "Services", href: "/admin/services", icon: Scissors },
  { name: "Finances", href: "/admin/finances", icon: TrendingUp },
  { name: "Loyalty", href: "/admin/loyalty", icon: Crown },
  { name: "Payroll", href: "/admin/payroll", icon: PoundSterling },
  { name: "Security", href: "/admin/security", icon: ShieldCheck },
  { name: "Performance", href: "/admin/performance", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAdminProfileOpen, setIsAdminProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const cleanPathname = pathname.replace(/\/$/, "");

  // Auth Guard Logic
  useEffect(() => {
    if (cleanPathname.endsWith("/admin/login")) {
      setIsAuthenticated(true);
      return;
    }
    
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isAdminLoggedIn");
      if (loggedIn !== "true") {
        window.location.replace("/glamora-salon/admin/login/");
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [cleanPathname]);

  const handleSignOut = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.removeItem("isAdminLoggedIn");
    }
    setIsAuthenticated(false);
    window.location.replace("/glamora-salon/admin/login/");
  };

  // 🛡️ ISOLATE LOGIN PAGE FROM DASHBOARD UI
  if (cleanPathname.endsWith("/admin/login")) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // Prevent flash of admin portal before auth check
  if (!isAuthenticated) {
    return (
      <div className="h-screen w-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-background text-foreground flex overflow-hidden relative">
      {/* Backdrop overlay for mobile sidebar */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* 1. COMPACT SIDEBAR */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-card border-r border-border transition-all duration-300 shadow-sm lg:static",
          isSidebarOpen ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="h-full flex flex-col pt-6 pb-8">
          {/* Brand Identity */}
          <div className="flex items-center justify-between px-6 mb-12 h-12 overflow-hidden bg-primary/5 py-10 border-b border-primary/10">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <Sparkles className="text-background w-6 h-6" />
              </div>
              {(isSidebarOpen || isMobileOpen) && (
                <div className="ml-4 flex flex-col">
                  <span className="text-lg font-serif font-black tracking-tighter leading-none text-foreground">GLAMORA</span>
                  <span className="text-[9px] uppercase tracking-[0.4em] text-primary font-black mt-1.5">Management</span>
                </div>
              )}
            </div>
            {isMobileOpen && (
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 hover:bg-accent rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "sidebar-link group flex items-center px-4 py-3 rounded-2xl transition-all relative overflow-hidden",
                    isActive 
                      ? "bg-primary text-background shadow-xl shadow-primary/20 font-black" 
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <link.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", isActive ? "text-background" : "text-muted-foreground group-hover:text-primary")} />
                  {(isSidebarOpen || isMobileOpen) && (
                    <span className="truncate ml-4 text-[10px] uppercase font-black tracking-[0.15em]">{link.name}</span>
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="sidebar-active"
                      className="absolute left-0 w-1 h-6 bg-background rounded-r-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="p-4 space-y-2 border-t border-border bg-accent/5">
            <Link 
              href="/"
              className="w-full text-primary hover:bg-primary hover:text-background border border-primary/20 flex items-center px-4 py-3 rounded-2xl transition-all group"
            >
              <Globe className="w-5 h-5 shrink-0 transition-transform group-hover:rotate-12" />
              {(isSidebarOpen || isMobileOpen) && <span className="ml-4 font-black text-[10px] uppercase tracking-widest">Live Website</span>}
            </Link>
            <button 
              onClick={handleSignOut}
              className="w-full text-red-500 hover:bg-red-500 hover:text-white border border-red-500/10 flex items-center px-4 py-3 rounded-2xl transition-all group"
            >
              <LogOut className="w-5 h-5 shrink-0 transition-transform group-hover:-translate-x-1" />
              {(isSidebarOpen || isMobileOpen) && <span className="ml-4 font-black text-[10px] uppercase tracking-widest">Sign Out</span>}
            </button>
          </div>
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-12 w-6 h-6 bg-card border border-border rounded-full hidden lg:flex items-center justify-center shadow-sm hover:bg-accent transition-all z-50"
        >
          {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </aside>

      {/* 2. MAIN OPERATION AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* Compact Topbar */}
        <header className="h-[70px] bg-card border-b border-border flex items-center justify-between px-4 sm:px-8 shrink-0 relative z-40">
          <div className="flex items-center space-x-4 sm:space-x-6 flex-1">
            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 hover:bg-accent rounded-xl text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="max-w-md w-full relative hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search team, appointments, or products..." 
                className="w-full bg-accent/50 border border-primary/30 rounded-xl py-2 px-10 text-xs font-bold focus:outline-none focus:border-primary focus:bg-background transition-all shadow-sm"
              />
            </div>
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline group"
            >
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Website</span>
            </Link>
          </div>

          <div className="flex items-center space-x-5">
            <ThemeToggle />
            <div className="h-6 w-px bg-border mx-2" />
            <button className="relative p-2 text-muted-foreground hover:text-primary transition-all group/tooltip">
              <Bell className="w-5 h-5" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 group-hover/tooltip:translate-y-0 whitespace-nowrap z-[2000]">
                Activity Hub
              </span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-card" />
            </button>
            
            {/* 👤 ADMIN ACCOUNT SECTION */}
            <div 
              onClick={() => setIsAdminProfileOpen(!isAdminProfileOpen)}
              className="flex items-center space-x-3 cursor-pointer group pl-2 transition-all hover:opacity-80"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">James Vane</p>
                <p className="text-[9px] text-primary font-bold uppercase tracking-widest mt-1">Admin Account</p>
              </div>
              <div className={cn(
                "w-9 h-9 bg-accent rounded-lg flex items-center justify-center border transition-all",
                isAdminProfileOpen ? "border-primary ring-2 ring-primary/20" : "border-border group-hover:border-primary"
              )}>
                <User className={cn("w-5 h-5", isAdminProfileOpen ? "text-primary" : "text-muted-foreground")} />
              </div>
            </div>

            {/* 🛡️ ADMIN QUICK PROFILE DROPDOWN */}
            <AnimatePresence>
              {isAdminProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsAdminProfileOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-[80px] right-8 w-72 bg-card border border-border rounded-[2rem] shadow-premium z-50 overflow-hidden"
                  >
                    <div className="p-6 bg-accent/30 border-b border-border">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                          <ShieldCheck className="text-background w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-serif font-black tracking-tight">James Vane</h4>
                          <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest">Super Administrator</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-1">
                      <div className="p-3 hover:bg-accent rounded-xl transition-all cursor-pointer group">
                        <div className="flex items-center space-x-3 text-xs font-bold">
                          <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          <span>admin@glamora.uk</span>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-accent rounded-xl transition-all cursor-pointer group">
                        <div className="flex items-center space-x-3 text-xs font-bold">
                          <Zap className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                          <span>Active Session • NYC</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-2">
                      <Link 
                        href="/admin/security" 
                        onClick={() => setIsAdminProfileOpen(false)}
                        className="w-full py-3 bg-primary/10 hover:bg-primary text-primary hover:text-background rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center transition-all"
                      >
                        <Shield className="w-3.5 h-3.5 mr-2" />
                        Security Settings
                      </Link>
                      <button 
                        onClick={() => {
                          setIsAdminProfileOpen(false);
                          handleSignOut();
                        }}
                        className="w-full mt-2 py-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center transition-all"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 no-scrollbar bg-accent/10">
          <div className="max-w-screen-2xl mx-auto w-full space-y-8 flex flex-col">
            <div className="mb-2 sm:mb-6 w-full">
              <Breadcrumbs />
            </div>
            <div className="flex-1 w-full">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
