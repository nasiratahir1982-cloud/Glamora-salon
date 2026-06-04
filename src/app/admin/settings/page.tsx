"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Lock, 
  User, 
  Sparkles,
  CheckCircle,
  Save,
  Moon,
  Sun,
  Palette,
  AlertTriangle
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export default function SettingsManagement() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("General");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Notification States
  const [alerts, setAlerts] = useState({
    booking: true,
    stock: true,
    review: true,
    login: false,
  });

  const toggleAlert = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1200);
  };

  // Security States
  const [security, setSecurity] = useState({
    enforceStrong: true,
    expiryDays: 90,
    twoFactor: true,
  });

  const toggleSecurity = (key: 'enforceStrong' | 'twoFactor') => {
    setSecurity(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { name: "General", icon: Sparkles, desc: "Business info & theme" },
    { name: "Security", icon: Shield, desc: "Passwords & access" },
    { name: "System", icon: Database, desc: "Technical settings" },
    { name: "Alerts", icon: Bell, desc: "Email & notifications" },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* 1. SIMPLE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">System Settings</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Configure your salon's digital experience</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            "btn-primary px-10 flex items-center transition-all min-w-[160px] justify-center",
            showSuccess && "bg-green-600 border-green-600"
          )}
        >
          {isSaving ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
              <Settings className="w-4 h-4" />
            </motion.div>
          ) : showSuccess ? (
            <><CheckCircle className="w-4 h-4 mr-2" /> Saved</>
          ) : (
            <><Save className="w-4 h-4 mr-2" /> Save Changes</>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <aside className="space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all group",
                activeTab === tab.name 
                  ? "bg-primary border-primary text-background shadow-md" 
                  : "bg-card border-border text-foreground hover:border-primary/20"
              )}
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                  activeTab === tab.name ? "bg-background/20" : "bg-primary/10 text-primary"
                )}>
                  <tab.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-tight leading-none">{tab.name}</p>
                  <p className={cn(
                    "text-[8px] uppercase tracking-widest mt-1.5 font-bold",
                    activeTab === tab.name ? "text-background/60" : "text-muted-foreground"
                  )}>{tab.desc}</p>
                </div>
              </div>
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* 🟢 GENERAL TAB */}
          {activeTab === "General" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="luxury-card !p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Globe className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-serif font-black">Business Identity</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-input-group">
                    <label className="form-label">Salon Name</label>
                    <input type="text" className="form-input" defaultValue="GLAMORA Salon" />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Support Email</label>
                    <input type="email" className="form-input" defaultValue="hello@glamora.co.uk" />
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Default Currency</label>
                    <select className="form-input">
                      <option>British Pound (£)</option>
                      <option>US Dollar ($)</option>
                      <option>Euro (€)</option>
                    </select>
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Timezone</label>
                    <select className="form-input">
                      <option>UTC+0 (London)</option>
                      <option>UTC-5 (New York)</option>
                      <option>UTC+1 (Paris)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="luxury-card !p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Palette className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-serif font-black">Appearance</h3>
                </div>
                <div className="bg-accent/20 p-6 rounded-2xl border border-border flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                      {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-tight">System Theme</p>
                      <p className="text-[10px] text-muted-foreground mt-1 font-medium">Switch between light and dark modes.</p>
                    </div>
                  </div>
                  <div className="flex bg-background p-1.5 rounded-xl border border-border">
                    <button onClick={() => setTheme('light')} className={cn("px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", theme === 'light' ? "bg-primary text-background shadow-sm" : "text-muted-foreground hover:text-primary")}>Light Mode</button>
                    <button onClick={() => setTheme('dark')} className={cn("px-6 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all", theme === 'dark' ? "bg-primary text-background shadow-sm" : "text-muted-foreground hover:text-primary")}>Dark Mode</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 🟡 SECURITY TAB */}
          {activeTab === "Security" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="luxury-card !p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Lock className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-serif font-black">Password Policy</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-accent/20 rounded-xl border border-border">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest">Enforce Strong Passwords</p>
                      <p className="text-[9px] text-muted-foreground font-medium mt-1">Require uppercase, numbers, and symbols.</p>
                    </div>
                    <button 
                      onClick={() => toggleSecurity('enforceStrong')}
                      className={cn(
                        "w-12 h-6 rounded-full relative transition-all duration-300",
                        security.enforceStrong ? "bg-primary" : "bg-accent border border-border"
                      )}
                    >
                      <motion.div 
                        animate={{ x: security.enforceStrong ? 24 : 4 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={cn(
                          "absolute top-1 w-4 h-4 rounded-full shadow-sm transition-colors",
                          security.enforceStrong ? "bg-background" : "bg-muted-foreground"
                        )} 
                      />
                    </button>
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Password Expiry (Days)</label>
                    <input 
                      type="number" 
                      className="form-input" 
                      value={security.expiryDays} 
                      onChange={(e) => setSecurity({...security, expiryDays: parseInt(e.target.value) || 0})}
                    />
                  </div>
                </div>
              </div>

              <div className="luxury-card !p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Shield className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-serif font-black">Two-Factor Authentication</h3>
                </div>
                <div className="flex items-center justify-between p-6 bg-primary/5 rounded-2xl border border-primary/20">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                      security.twoFactor ? "bg-primary/20 text-primary" : "bg-accent text-muted-foreground"
                    )}>
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold tracking-tight uppercase">
                        2FA is currently <span className={security.twoFactor ? "text-primary" : "text-muted-foreground"}>
                          {security.twoFactor ? "Enabled" : "Disabled"}
                        </span>
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1 font-medium">Your account is protected with an extra layer of security.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSecurity('twoFactor')}
                    className={cn(
                      "btn-outline !py-2 !px-6 text-[9px] transition-all",
                      !security.twoFactor && "bg-primary text-background border-primary"
                    )}
                  >
                    {security.twoFactor ? "Disable 2FA" : "Enable 2FA"}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 🔵 SYSTEM TAB */}
          {activeTab === "System" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="luxury-card !p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Database className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-serif font-black">Data Management</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-border rounded-2xl bg-accent/10">
                    <p className="text-xs font-black uppercase tracking-tight">Full System Backup</p>
                    <p className="text-[9px] text-muted-foreground mt-1 mb-4">Last backup: 2 hours ago (Cloud)</p>
                    <button 
                      onClick={() => {
                        const btn = document.activeElement as HTMLButtonElement;
                        btn.innerText = "Backing up...";
                        btn.disabled = true;
                        setTimeout(() => {
                          btn.innerText = "Backup Complete";
                          setTimeout(() => {
                            btn.innerText = "Create New Backup";
                            btn.disabled = false;
                          }, 2000);
                        }, 2000);
                      }}
                      className="btn-primary w-full py-3 text-[10px] disabled:opacity-50"
                    >
                      Create New Backup
                    </button>
                  </div>
                  <div className="p-6 border border-border rounded-2xl bg-accent/10">
                    <p className="text-xs font-black uppercase tracking-tight">Clear System Cache</p>
                    <p className="text-[9px] text-muted-foreground mt-1 mb-4">Clears static assets and temp data.</p>
                    <button 
                      onClick={() => {
                        const btn = document.activeElement as HTMLButtonElement;
                        btn.innerText = "Flushing...";
                        btn.disabled = true;
                        setTimeout(() => {
                          btn.innerText = "Cache Cleared";
                          setTimeout(() => {
                            btn.innerText = "Flush Cache";
                            btn.disabled = false;
                          }, 2000);
                        }, 1500);
                      }}
                      className="btn-outline w-full py-3 text-[10px] disabled:opacity-50"
                    >
                      Flush Cache
                    </button>
                  </div>
                </div>
              </div>

              <div className="luxury-card !p-8 border-red-500/10">
                <div className="flex items-center space-x-3 mb-8">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h3 className="text-xl font-serif font-black text-red-500">Maintenance Mode</h3>
                </div>
                <div className="bg-red-500/5 p-6 rounded-2xl border border-red-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-sm font-black uppercase tracking-tight text-red-500">System Shutdown</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-medium">Temporarily disable the public website for updates.</p>
                  </div>
                  <button 
                    onClick={() => {
                      const btn = document.activeElement as HTMLButtonElement;
                      const isActive = btn.innerText === "Disable Maintenance";
                      btn.innerText = isActive ? "Enabling..." : "Disabling...";
                      btn.disabled = true;
                      setTimeout(() => {
                        btn.innerText = isActive ? "Enable Maintenance" : "Disable Maintenance";
                        btn.className = isActive 
                          ? "btn-primary bg-red-500 border-red-500 hover:bg-red-600 px-8 py-3 text-[10px]" 
                          : "btn-primary bg-primary border-primary hover:bg-primary/80 px-8 py-3 text-[10px]";
                        btn.disabled = false;
                      }, 1000);
                    }}
                    className="btn-primary bg-red-500 border-red-500 hover:bg-red-600 px-8 py-3 text-[10px]"
                  >
                    Enable Maintenance
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 🔴 ALERTS TAB */}
          {activeTab === "Alerts" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="luxury-card !p-8">
                <div className="flex items-center space-x-3 mb-8">
                  <Bell className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-serif font-black">Notifications</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { id: 'booking', label: "New Booking Alert", desc: "Notify admin when a new appointment is scheduled." },
                    { id: 'stock', label: "Low Stock Warning", desc: "Notify when inventory items fall below 10 units." },
                    { id: 'review', label: "Customer Review", desc: "Notify when a new feedback is received." },
                    { id: 'login', label: "Staff Login", desc: "Notify admin when staff members sign in." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-accent/20 rounded-xl border border-border">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest">{item.label}</p>
                        <p className="text-[9px] text-muted-foreground font-medium mt-1">{item.desc}</p>
                      </div>
                      <button 
                        onClick={() => toggleAlert(item.id as keyof typeof alerts)}
                        className={cn(
                          "w-12 h-6 rounded-full relative transition-all duration-300",
                          alerts[item.id as keyof typeof alerts] ? "bg-primary" : "bg-accent border border-border"
                        )}
                      >
                        <motion.div 
                          animate={{ x: alerts[item.id as keyof typeof alerts] ? 24 : 4 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={cn(
                            "absolute top-1 w-4 h-4 rounded-full shadow-sm transition-colors",
                            alerts[item.id as keyof typeof alerts] ? "bg-background" : "bg-muted-foreground"
                          )} 
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
