"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  Quote, 
  Heart, 
  Sparkles, 
  Award, 
  User, 
  CheckCircle2, 
  X, 
  Camera, 
  Send,
  Loader2
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { cn } from "@/lib/utils";
import Link from "next/link";

const initialReviews = [
  {
    name: "Charlotte Evans",
    role: "Regular Guest",
    rating: 5,
    date: "2 days ago",
    content: "Absolutely the best bridal makeup experience I've ever had. The attention to detail and the luxury environment is unmatched.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    name: "James Vane",
    role: "Grooming Client",
    rating: 5,
    date: "1 week ago",
    content: "The men's grooming lounge is phenomenal. Precision cutting and a very relaxing atmosphere. Highly recommend the executive pack.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80"
  },
  {
    name: "Olivia Thompson",
    role: "Skin Care Guest",
    rating: 4,
    date: "2 weeks ago",
    content: "The Hydra-Facial left my skin glowing for days. The staff is professional and the London studio is simply beautiful.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  },
  {
    name: "Alexander Reed",
    role: "Bridal Party",
    rating: 5,
    date: "1 month ago",
    content: "We booked the whole bridal suite for my sister's wedding. The team was incredible and managed the large group with absolute grace.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
  },
];

export default function ReviewsPage() {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    content: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate Save Delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newReview = {
      name: formData.name,
      role: "Verified Guest",
      rating: rating,
      date: "Just now",
      content: formData.content,
      image: `https://i.pravatar.cc/150?u=${formData.name}`
    };
    
    setReviewsList([newReview, ...reviewsList]);
    setIsSubmitting(false);
    setIsModalOpen(false);
    setFormData({ name: "", content: "" });
    setRating(5);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-[100px] pb-12 overflow-hidden bg-accent/20 border-b border-border">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale opacity-10" />
        <div className="absolute -top-20 -right-20 p-40 opacity-[0.03] pointer-events-none rotate-12">
          <Quote className="w-96 h-96 text-primary" />
        </div>

        <div className="luxury-container relative z-10 text-center space-y-3">
          <Breadcrumbs />
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-luxury !bg-primary !text-background mx-auto !py-1"
          >
            <Star className="w-3 h-3 mr-2 fill-background" />
            <span>4.9/5 Average Rating</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className=""
          >
            Guest <br /> <span className="text-primary italic">Voices.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed"
          >
            Real experiences from our valued guests. Discover why Glamora is London's most trusted destination for beauty and transformations.
          </motion.p>
        </div>
      </section>

      {/* 2. REVIEWS GRID */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container">
          <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
            {reviewsList.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="luxury-card !p-8 flex flex-col md:flex-row gap-8 items-start group w-full lg:w-[calc(50%-20px)]"
              >
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-primary/10 shadow-sm group-hover:scale-105 transition-transform duration-500">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-serif font-black tracking-tight">{r.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-1">{r.role}</p>
                    </div>
                    <div className="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, star) => (
                        <Star key={star} className={cn("w-3 h-3", star < r.rating ? "fill-primary text-primary" : "text-border")} />
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/5 -z-10" />
                    <p className="text-[12px] md:text-sm text-muted-foreground font-medium leading-relaxed italic">
                      "{r.content}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{r.date}</span>
                    <div className="flex items-center space-x-1 text-green-500">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-[9px] font-black uppercase tracking-widest">Verified Guest</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="section-padding bg-background border-t border-border">
        <div className="luxury-container text-center space-y-8">
          <h2 className="text-4xl font-serif font-black tracking-tighter">Ready for your transformation?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/booking" className="btn-primary px-10 py-5 text-sm font-black uppercase tracking-widest shadow-xl">Book Appointment</Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-outline px-10 py-5 text-sm font-black uppercase tracking-widest"
            >
              Leave a Review
            </button>
          </div>
        </div>
      </section>

      {/* 4. REVIEW MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card w-full max-w-xl border-2 border-primary/20 rounded-[3rem] shadow-premium overflow-hidden"
            >
              <div className="p-10 border-b border-border bg-accent/10 flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-background shadow-xl">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-black tracking-tight">Leave a Review</h3>
                    <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Share your Glamora Experience</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-accent hover:bg-red-500 hover:text-white rounded-full transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="flex flex-col items-center space-y-4 mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Select your rating</p>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button 
                        key={s} 
                        type="button"
                        onClick={() => setRating(s)}
                        className="transition-all hover:scale-125"
                      >
                        <Star className={cn("w-8 h-8", s <= rating ? "fill-primary text-primary" : "text-border")} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-input-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="Enter your full name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="form-input-group">
                  <label className="form-label">Your Review</label>
                  <textarea 
                    required 
                    className="form-input h-32 resize-none" 
                    placeholder="Describe your ritual and the results..." 
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                </div>

                <button 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-5 text-sm font-black uppercase tracking-widest shadow-xl flex items-center justify-center disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Review...</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" /> Publish Ritual Review</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
