"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  User,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-12 right-6 z-[5000] print-hidden">
      {/* Floating Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 bg-primary text-background rounded-2xl flex items-center justify-center shadow-luxury-gold transition-all duration-500 hover:scale-110 active:scale-95 group/tooltip",
          isOpen ? "rotate-90 opacity-0 pointer-events-none" : "rotate-0 opacity-100"
        )}
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-10 right-0 px-2 py-1 bg-foreground text-background text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 -translate-y-1 group-hover/tooltip:translate-y-0 whitespace-nowrap z-[2000]">
          Chat with Us
        </span>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-0 right-0 w-[350px] bg-card border border-border rounded-[2rem] shadow-premium overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary p-6 text-background flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-background/20 rounded-xl flex items-center justify-center relative">
                  <Sparkles className="w-5 h-5" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-black tracking-tight">Glamora Concierge</h4>
                  <div className="flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-80">Always Active</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-background/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-[300px] p-6 overflow-y-auto no-scrollbar space-y-4 bg-accent/10">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 border border-primary/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="bg-card p-4 rounded-2xl rounded-tl-none border border-border shadow-sm">
                  <p className="text-xs font-medium leading-relaxed">
                    Hi! Welcome to Glamora. How can we help you today?
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="bg-primary text-background p-4 rounded-2xl rounded-tr-none shadow-md">
                  <p className="text-xs font-medium">I'd like to ask about bridal packages.</p>
                </div>
                <span className="text-[8px] font-bold text-muted-foreground uppercase">Read 12:04 PM</span>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 border border-primary/20">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="bg-card p-4 rounded-2xl rounded-tl-none border border-border shadow-sm">
                  <div className="flex items-center space-x-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
              <div className="flex items-center space-x-2 mb-3 px-2">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">End-to-end encrypted</span>
              </div>
              <form 
                className="flex items-center space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setMessage("");
                }}
              >
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..." 
                  className="flex-1 bg-accent/30 border border-border rounded-xl px-4 py-2.5 text-xs font-medium focus:bg-background focus:border-primary outline-none transition-all"
                />
                <button 
                  type="submit"
                  className="w-10 h-10 bg-primary text-background rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
