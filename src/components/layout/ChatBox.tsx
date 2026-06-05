"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Zap,
  User
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! Welcome to Glamora. How can we help you today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Check for new booking confirmation messages
  useEffect(() => {
    const checkNewBookings = () => {
      try {
        const savedApps = localStorage.getItem('glamora-appointments');
        if (savedApps) {
          const appointmentsList = JSON.parse(savedApps);
          if (appointmentsList && appointmentsList.length > 0) {
            const latestBooking = appointmentsList[0]; // First item is the newest
            const lastNotifiedId = localStorage.getItem('glamora-last-notified-booking');
            
            // If the latest booking ID doesn't match the last one we notified, and it is a newly booked appointment
            if (latestBooking.id !== lastNotifiedId && !["A-1024", "A-1025", "A-1026", "A-1027"].includes(latestBooking.id)) {
              const confirmationText = `✨ Booking Confirmed! ✨\n\nDear ${latestBooking.guest}, we have successfully registered your session for "${latestBooking.service}" on ${latestBooking.date} at ${latestBooking.time}.\n\nYour Booking ID is: ${latestBooking.id}\n\nOur concierge team will follow up if any adjustments are needed. Thank you for choosing Glamora!`;
              
              const newMsg: Message = {
                id: `confirm-${latestBooking.id}`,
                sender: "bot",
                text: confirmationText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              };
              
              setMessages(prev => {
                if (prev.some(m => m.id === newMsg.id)) return prev;
                return [...prev, newMsg];
              });
              
              localStorage.setItem('glamora-last-notified-booking', latestBooking.id);
              
              // Automatically open the chat window to notify the user
              setIsOpen(true);
            }
          }
        }
      } catch (e) {
        console.error("Error checking bookings in ChatBox:", e);
      }
    };

    // Check on mount
    checkNewBookings();

    // Check periodically to capture booking completions
    const interval = setInterval(checkNewBookings, 3000);
    return () => clearInterval(interval);
  }, []);

  const getBotResponse = (input: string): string => {
    const text = input.toLowerCase();
    if (text.includes("bridal") || text.includes("package") || text.includes("shadi") || text.includes("marriage")) {
      return "We offer premium Bridal Packages (Silver, Gold, Platinum) starting from £150, which include hair styling, makeup, and skin care. Would you like us to send you the full catalog?";
    }
    if (text.includes("book") || text.includes("appointment") || text.includes("timing") || text.includes("reserve")) {
      return "You can book your slot instantly via our Booking Page or call us directly at +44 780 123456 to schedule your session.";
    }
    if (text.includes("price") || text.includes("rate") || text.includes("cost") || text.includes("charge")) {
      return "Our salon services start from just £20. You can check the full pricing list on our Services page!";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey") || text.includes("salam")) {
      return "Hello! How can I assist you with your beauty and salon styling query today?";
    }
    return "Thank you for contacting Glamora. Your message has been received, and our concierge team will respond to you shortly! You can also reach us at +44 780 123456.";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const currentInput = message;
    setMessage("");
    setIsTyping(true);

    // Simulate concierge typing
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: getBotResponse(currentInput),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

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
            <div className="h-[300px] p-6 overflow-y-auto no-scrollbar space-y-4 bg-accent/10 flex flex-col">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex flex-col space-y-1 max-w-[80%]",
                    msg.sender === "user" ? "self-end items-end" : "self-start items-start"
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {msg.sender === "bot" && (
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center shrink-0 border border-primary/20">
                        <Zap className="w-4 h-4" />
                      </div>
                    )}
                    <div 
                      className={cn(
                        "p-4 rounded-2xl border shadow-sm text-xs font-medium leading-relaxed",
                        msg.sender === "user" 
                          ? "bg-primary text-background rounded-tr-none border-primary" 
                          : "bg-card text-foreground rounded-tl-none border-border"
                      )}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                  <span className="text-[8px] font-bold text-muted-foreground uppercase px-2">{msg.time}</span>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start space-x-2 self-start max-w-[80%]">
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
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border">
              <div className="flex items-center space-x-2 mb-3 px-2">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">End-to-end encrypted</span>
              </div>
              <form 
                className="flex items-center space-x-2"
                onSubmit={handleSend}
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
