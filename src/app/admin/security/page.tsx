"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Smartphone, 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  Clock, 
  Globe, 
  Smartphone as DeviceIcon,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  ShieldAlert,
  Zap,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const activityLogs = [
  { id: 1, action: "Admin Login", device: "MacBook Pro M3", location: "New York, USA", time: "2m ago", ip: "192.168.1.1" },
  { id: 2, action: "2FA Verification", device: "iPhone 15 Pro", location: "New York, USA", time: "15m ago", ip: "192.168.1.5" },
  { id: 3, action: "Settings Update", device: "Admin Computer", location: "New York, USA", time: "4h ago", ip: "10.0.0.45" },
];

export default function SecurityCenter() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  return (
    <div className="space-y-8 pb-10">
      {/* 1. SIMPLE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-black tracking-tight">Security Center</h2>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Manage your account security and sessions</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="px-3 py-1.5 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">System Secure</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN SECURITY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Two-Factor Authentication */}
        <div className="lg:col-span-2 luxury-card group">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-black">Two-Factor Security</h3>
                <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">Extra layer of protection</p>
              </div>
            </div>
            <button 
              onClick={() => setShow2FAModal(true)}
              className={cn(
                "btn-primary",
                is2FAEnabled ? "bg-green-500 border-green-500 hover:bg-green-600" : ""
              )}
            >
              {is2FAEnabled ? "Enabled" : "Enable 2FA"}
            </button>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            Add an extra layer of security to your account. When enabled, you will need to enter a 6-digit code from your mobile device to log in.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-accent/20 border border-border rounded-xl flex items-center space-x-4">
              <Key className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-black uppercase tracking-tight">Authenticator App</p>
                <p className="text-[9px] font-bold text-muted-foreground">Google, Authy, or Microsoft</p>
              </div>
            </div>
            <div className="p-4 bg-accent/20 border border-border rounded-xl flex items-center space-x-4">
              <Lock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs font-black uppercase tracking-tight">Recovery Codes</p>
                <p className="text-[9px] font-bold text-muted-foreground">8-Digit Backup Tokens</p>
              </div>
            </div>
          </div>
        </div>

        {/* Password Strength */}
        <div className="luxury-card flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-black">Password Health</h3>
            <p className="text-[11px] text-muted-foreground">Last updated 32 days ago. We suggest updating it every 90 days.</p>
          </div>
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2">
              <span>Security Score</span>
              <span className="text-green-500">92%</span>
            </div>
            <div className="w-full h-1.5 bg-accent rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: '92%' }} />
            </div>
            <button className="btn-outline w-full mt-6 text-[9px] py-3">Change Password</button>
          </div>
        </div>
      </div>

      {/* 3. ACTIVE SESSIONS TABLE */}
      <div className="luxury-card !p-0 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-accent/10 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-serif font-black">Active Login Sessions</h4>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Real-time monitoring</p>
          </div>
          <button className="btn-outline text-[9px] px-4 py-2">Logout All Devices</button>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4">Device Info</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">IP Address</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-accent/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-primary">
                        <DeviceIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold">{log.device}</p>
                        <p className="text-[9px] text-muted-foreground uppercase tracking-widest">{log.action}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-3.5 h-3.5 text-primary" />
                      <span className="font-bold">{log.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-muted-foreground">{log.ip}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-bold">{log.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/10">
                      <ShieldAlert className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2FA Modal */}
      <AnimatePresence>
        {show2FAModal && (
          <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card w-full max-w-md rounded-3xl p-10 relative border border-border shadow-premium text-center"
            >
              <div className="w-16 h-16 bg-primary text-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-black mb-3">Setup 2FA</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-10">
                Scan the QR code with your authenticator app (Google Authenticator or Authy) to link your account.
              </p>
              
              <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto mb-10 border border-border">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=GLAMORA-SECURITY" alt="QR Code" className="w-full h-full" />
              </div>

              <div className="space-y-4">
                <div className="form-input-group !mb-0">
                  <label className="form-label">6-Digit Code</label>
                  <input type="text" maxLength={6} className="form-input text-center text-3xl font-black tracking-widest py-4" placeholder="000000" />
                </div>
                <div className="flex items-center justify-center space-x-4 pt-6">
                  <button onClick={() => setShow2FAModal(false)} className="btn-outline">Cancel</button>
                  <button onClick={() => { setIs2FAEnabled(true); setShow2FAModal(false); }} className="btn-primary px-10">Verify & Enable</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
