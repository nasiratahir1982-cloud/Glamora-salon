"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Send,
  Gem,
  Award,
  Crown,
  Compass,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API Call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. CINEMATIC HERO - Matching About Style */}
      <section className="relative pt-[100px] pb-12 overflow-hidden bg-accent/20 border-b border-border text-center">
        <div className="absolute inset-0 bg-[url('/images/luxury-salon-entrance.png')] bg-cover bg-center grayscale opacity-15" />
        <div className="absolute -top-20 -right-20 p-40 opacity-[0.03] pointer-events-none rotate-45">
          <Compass className="w-96 h-96 text-primary" />
        </div>

        <div className="luxury-container relative z-10 space-y-4">
          <Breadcrumbs />
          <div className="space-y-3 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-luxury !bg-primary !text-background mx-auto !py-1"
            >
              <Award className="w-3 h-3 mr-2" />
              <span>Our Team</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className=""
            >
              Get in <br /> <span className="text-primary italic">Touch.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm md:text-base text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed"
            >
              Whether you're planning a wedding, a group event, or just want to ask about our Glamora services, our team is here to help you.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <div className="space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter leading-tight">Our Glamora <br /><span className="text-primary italic">Studio.</span></h2>
                <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                  Visit us for a consultation or a session. We are located in the heart of London's most prestigious district.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Phone, title: "Call Us", detail: "+44 (0) 20 7946 0123", desc: "Available 9am - 5pm" },
                  { icon: Mail, title: "Email Us", detail: "hello@glamora.co.uk", desc: "Response within 2 hours" },
                  { icon: MapPin, title: "Visit Us", detail: "45 Glamora Square, London", desc: "View on Google Maps" },
                  { icon: Clock, title: "Hours", detail: "9:00 AM - 5:00 PM", desc: "Monday to Sunday" },
                ].map((item, i) => (
                  <div key={i} className="luxury-card !p-8 space-y-4 group">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{item.title}</h3>
                      <p className="text-base font-black text-foreground">{item.detail}</p>
                      <p className="text-[10px] text-muted-foreground font-medium mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="luxury-card !p-12 shadow-premium relative overflow-hidden bg-background">
               <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
                <Send className="w-48 h-48 text-primary" />
              </div>
              <div className="relative z-10 space-y-8">
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div 
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-8"
                    >
                      <div className="space-y-2">
                        <h3 className="text-3xl font-serif font-black tracking-tight">Send a Message</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Contact Form</p>
                      </div>
                      
                      <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="form-input-group">
                            <label className="form-label">First Name</label>
                            <input 
                              type="text" 
                              name="firstName"
                              required
                              className="form-input" 
                              placeholder=" " 
                              value={formData.firstName}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="form-input-group">
                            <label className="form-label">Last Name</label>
                            <input 
                              type="text" 
                              name="lastName"
                              required
                              className="form-input" 
                              placeholder=" " 
                              value={formData.lastName}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="form-input-group">
                          <label className="form-label">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            required
                            className="form-input" 
                            placeholder=" " 
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-input-group">
                          <label className="form-label">Message</label>
                          <textarea 
                            name="message"
                            required
                            className="form-input h-32 resize-none" 
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <button 
                          disabled={isSubmitting}
                          className="btn-primary w-full py-5 text-sm shadow-xl group uppercase tracking-widest font-black flex items-center justify-center disabled:opacity-50"
                        >
                          {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                          ) : (
                            <>Send Message <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" /></>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center space-y-6 py-12"
                    >
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 shadow-premium">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-serif font-black tracking-tight">Message Sent</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Inquiry Received</p>
                      </div>
                      <p className="text-sm text-muted-foreground font-medium max-w-xs mx-auto">
                        Your inquiry has been delivered to our concierge. We will respond within 2 hours.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="btn-outline px-10 py-3 text-[10px] uppercase font-black tracking-widest"
                      >
                        Send Another
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
