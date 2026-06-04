"use client";

import React, { useState } from "react";
import { 
  Bell, 
  X, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  User, 
  Sparkles,
  ArrowRight,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

const initialNotifications = [
  { id: 1, title: "Ritual Confirmed", desc: "Your Royal Bridal Suite session is set for Monday at 10:30 AM.", time: "2m ago", type: "success", read: false, icon: Calendar },
  { id: 2, title: "Expert Insight", desc: "Elena G. has updated your service details.", time: "1h ago", type: "info", read: false, icon: Sparkles },
  { id: 3, title: "Updates", desc: "New protocols have been added for the studio.", time: "4h ago", type: "warning", read: true, icon: AlertTriangle },
  { id: 4, title: "Profile Authorization", desc: "Your identity has been verified by the Glamora Institution.", time: "1d ago", type: "success", read: true, icon: User },
];

export const NotificationCenter = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[190]" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="fixed top-32 right-6 md:right-12 z-[200] w-[450px] max-w-[calc(100vw-48px)] bg-card border-2 border-primary/20 rounded-[3rem] shadow-tesla overflow-hidden"
          >
            <div className="p-10 border-b border-border flex items-center justify-between bg-accent/20">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Bell className="w-8 h-8 text-primary" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-[8px] font-black rounded-full flex items-center justify-center border-2 border-card animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-black text-foreground">Intelligence Center</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-1">Real-time Studio Updates</p>
                </div>
              </div>
              <button 
                onClick={markAllRead}
                className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
              >
                Clear Intel
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
              {notifications.length > 0 ? (
                <div className="divide-y-2 divide-border">
                  {notifications.map((n) => (
                    <motion.div 
                      layout
                      key={n.id} 
                      className={cn(
                        "p-10 flex space-x-6 group transition-all relative",
                        !n.read ? "bg-primary/5" : "hover:bg-accent/10"
                      )}
                    >
                      {!n.read && <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-full shadow-[0_0_15px_rgba(184,134,43,1)]" />}
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                        n.type === 'success' ? "bg-green-500/10 text-green-500" : 
                        n.type === 'warning' ? "bg-yellow-500/10 text-yellow-500" : 
                        "bg-primary/10 text-primary"
                      )}>
                        <n.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-black text-foreground leading-none">{n.title}</h4>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase">{n.time}</span>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground leading-relaxed pr-6">{n.desc}</p>
                        {!n.read && (
                          <button className="flex items-center text-[9px] font-black uppercase tracking-widest text-primary mt-4 group/btn">
                            Acknowledge <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                          </button>
                        )}
                      </div>
                      <button 
                        onClick={() => deleteNotification(n.id)}
                        className="absolute top-8 right-8 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-20 text-center space-y-6">
                  <div className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                    <Info className="w-10 h-10 text-muted-foreground opacity-20" />
                  </div>
                  <p className="text-[12px] font-black uppercase tracking-widest text-muted-foreground">The studio is currently quiet.</p>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-border bg-accent/10">
              <Link 
                href="/admin/notifications" 
                onClick={onClose}
                className="w-full py-5 border-2 border-primary/20 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:bg-primary hover:text-background transition-all shadow-lg"
              >
                View Archival History
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
