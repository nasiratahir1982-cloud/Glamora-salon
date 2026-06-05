"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  Scissors,
  ShieldCheck,
  Zap,
  ArrowRight,
  Star,
  Gem,
  Award,
  Info,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

const services = [
  { id: "s1", name: "Full Bridal Makeup", time: "4 Hours", durationMinutes: 240, price: "£850", icon: Sparkles, color: "text-primary" },
  { id: "s2", name: "Bridal Hair Styling", time: "3 Hours", durationMinutes: 180, price: "£450", icon: Gem, color: "text-primary" },
  { id: "s3", name: "Maid of Honor Special", time: "2 Hours", durationMinutes: 120, price: "£250", icon: Heart, color: "text-primary" },
  { id: "s4", name: "Signature Haircut", time: "1.5 Hours", durationMinutes: 90, price: "£120", icon: Scissors, color: "text-blue-500" },
  { id: "s5", name: "Beard Sculpture", time: "1 Hour", durationMinutes: 60, price: "£80", icon: Scissors, color: "text-blue-400" },
  { id: "s6", name: "Executive Pack", time: "1.5 Hours", durationMinutes: 90, price: "£180", icon: Scissors, color: "text-blue-500" },
  { id: "s7", name: "Hydrating Facial", time: "1 Hour", durationMinutes: 60, price: "£180", icon: ShieldCheck, color: "text-green-500" },
  { id: "s8", name: "Anti-Aging Therapy", time: "1.5 Hours", durationMinutes: 90, price: "£220", icon: Star, color: "text-green-400" },
  { id: "s9", name: "Quick Glow Refresh", time: "0.5 Hours", durationMinutes: 30, price: "£90", icon: Sparkles, color: "text-green-300" },
];

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const preSelectedService = searchParams.get("service");
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");

  useEffect(() => {
    if (preSelectedService) {
      const foundService = services.find(item => item.name.toLowerCase() === preSelectedService.toLowerCase());
      if (foundService) {
        setSelectedServiceId(foundService.id);
        setStep(2); // Automatically move to Date & Time
      }
    }
  }, [preSelectedService]);

  const selectedService = useMemo(() => 
    services.find(item => item.id === selectedServiceId), 
  [selectedServiceId]);

  useEffect(() => {
    if (step === 4 && selectedService && selectedDate && selectedTime) {
      try {
        const saved = localStorage.getItem('glamora-appointments');
        const appointmentsList = saved ? JSON.parse(saved) : [
          { id: "A-1024", guest: "Elena Gilbert", service: "Bridal Makeup", time: "10:30 AM", date: "2026-05-12", status: "Confirmed", staff: "Elena G." },
          { id: "A-1025", guest: "Marcus Vane", service: "Men's Haircut", time: "11:15 AM", date: "2026-05-12", status: "In Progress", staff: "Marcus V." },
          { id: "A-1026", guest: "Sophia Loren", service: "Skin Care Spa", time: "01:45 PM", date: "2026-05-12", status: "Pending", staff: "Sarah J." },
          { id: "A-1027", guest: "Arthur Shelby", service: "Hair Colour", time: "03:30 PM", date: "2026-05-13", status: "Confirmed", staff: "Elena G." },
        ];

        const bookingDate = `2026-06-${selectedDate < 10 ? '0' + selectedDate : selectedDate}`;
        
        // Avoid duplicate saving
        const exists = appointmentsList.some((a: any) => 
          a.guest === guestName && 
          a.service === selectedService.name && 
          a.date === bookingDate && 
          a.time === selectedTime
        );

        if (!exists) {
          const newBooking = {
            id: `A-${Math.floor(1000 + Math.random() * 9000)}`,
            guest: guestName || "Guest User",
            service: selectedService.name,
            time: selectedTime,
            date: bookingDate,
            status: "Pending",
            staff: "Sarah J."
          };
          appointmentsList.unshift(newBooking);
          localStorage.setItem('glamora-appointments', JSON.stringify(appointmentsList));
        }
      } catch (e) {
        console.error("Error saving booking on step 4:", e);
      }
    }
  }, [step, selectedService, selectedDate, selectedTime, guestName]);

  const availableSlots = useMemo(() => {
    if (!selectedService) return [];
    
    const slots = [];
    const startTime = 9; // 9 AM
    const endTime = 17; // 5 PM (Closing)
    const durationHours = selectedService.durationMinutes / 60;

    // Logic: If service > 3 hours, only show early morning slots
    if (selectedService.durationMinutes >= 180) {
      slots.push("09:00", "10:00");
    } else {
      // Normal slots every 90 mins
      for (let hour = startTime; hour + durationHours <= endTime; hour += 1.5) {
        const h = Math.floor(hour);
        const m = (hour % 1) * 60 === 30 ? "30" : "00";
        slots.push(`${h < 10 ? '0' + h : h}:${m}`);
      }
    }
    return slots;
  }, [selectedService]);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  // Calendar logic: Start from tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. LUXURY STEP PROGRESS */}
      <section className="pt-[100px] pb-12 bg-accent/20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/glamora-salon/images/luxury-gold-abstract.png')] bg-cover bg-center opacity-30" />
        <div className="absolute top-0 left-0 p-40 opacity-[0.02] pointer-events-none">
          <CalendarIcon className="w-96 h-96" />
        </div>
        <div className="luxury-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="space-y-4">
              <div className="badge-luxury">
                <Award className="w-3 h-3" />
                <span>Premium Appointment Portal</span>
              </div>
              <h1 className="leading-tight">
                Book Your <br /> <span className="text-primary italic">Visit.</span>
              </h1>
              <p className="text-sm text-muted-foreground font-medium max-w-md">
                Experience world-class beauty services at Glamora. Please note all bookings require at least <span className="text-primary font-bold">24 hours</span> notice.
              </p>
            </div>
            
            {/* Step Indicators */}
            <div className="flex items-center justify-center space-x-1 sm:space-x-4 shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
              {[1, 2, 3, 4].map(stepNum => (
                <div key={stepNum} className="flex items-center">
                  <div className={cn(
                    "w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-serif font-black text-[9px] sm:text-xs transition-all duration-500 border shadow-sm shrink-0",
                    step === stepNum ? "bg-primary border-primary text-background scale-105 sm:scale-110" : 
                    step > stepNum ? "bg-green-500 border-green-500 text-white" : "bg-card border-border text-muted-foreground"
                  )}>
                    {step > stepNum ? <CheckCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> : stepNum}
                  </div>
                  {stepNum < 4 && <div className={cn("w-4 sm:w-12 h-0.5 sm:h-1 mx-0.5 sm:mx-2 rounded-full transition-all duration-700 shrink-0", step > stepNum ? "bg-green-500" : "bg-border/30")} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BOOKING WORKFLOW */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container max-w-4xl">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end pb-4 border-b border-border/50">
                  <h2 className="text-2xl font-serif font-black">1. Choose Service</h2>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Step 1 of 4</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((ritual) => (
                    <button
                      key={ritual.id}
                      onClick={() => { setSelectedServiceId(ritual.id); setSelectedTime(null); }}
                      className={cn(
                        "luxury-card text-left flex items-start space-x-6 group transition-all duration-500 border-2 !p-8 relative overflow-hidden",
                        selectedServiceId === ritual.id ? "border-primary bg-primary/5 shadow-premium scale-[1.02]" : "border-primary/10 bg-card hover:border-primary/30 hover:-translate-y-1"
                      )}
                    >
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500", ritual.color, "bg-accent/40 group-hover:scale-110")}>
                        <ritual.icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1 pr-4">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h3 className="text-base font-black uppercase tracking-tight text-foreground leading-tight">{ritual.name}</h3>
                          <p className="text-lg font-serif font-black text-primary shrink-0">
                            {ritual.price}
                          </p>
                        </div>
                        <p className="text-[11px] text-muted-foreground font-medium mb-4 leading-relaxed line-clamp-1">
                          Expert care in our professional Glamora studio.
                        </p>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                            <Clock className="w-4 h-4 mr-2 text-primary opacity-70" /> {ritual.time}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end pb-4 border-b border-border/50">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif font-black">2. Date & Time</h2>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Working Hours: 9 AM - 5 PM</p>
                  </div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Step 2 of 4</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="luxury-card !p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        <h4 className="text-xs font-black uppercase tracking-widest">Select Date</h4>
                      </div>
                      <span className="text-[9px] font-bold text-primary uppercase">Tomorrow & Beyond</span>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, idx) => <div key={`${d}-${idx}`} className="text-[9px] font-black text-muted-foreground py-2">{d}</div>)}
                      {/* Blank spaces for current month padding (mock) */}
                      {Array.from({ length: 3 }).map((_, i) => <div key={i} />)}
                      {Array.from({ length: 28 }).map((_, i) => {
                        const day = i + 1;
                        const isPast = day <= today.getDate();
                        return (
                          <button 
                            key={i} 
                            disabled={isPast}
                            onClick={() => setSelectedDate(day)}
                            className={cn(
                              "aspect-square rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                              selectedDate === day ? "bg-primary text-background shadow-md" : 
                              isPast ? "opacity-20 cursor-not-allowed" : "hover:bg-accent"
                            )}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="luxury-card !p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-primary" />
                        <h4 className="text-xs font-black uppercase tracking-widest">Available Slots</h4>
                      </div>
                    </div>
                    {availableSlots.length > 0 ? (
                      <div className="grid grid-cols-3 gap-3">
                        {availableSlots.map(t => (
                          <button 
                            key={t} 
                            onClick={() => setSelectedTime(t)}
                            className={cn(
                              "py-3 rounded-xl border text-[10px] font-bold transition-all",
                              selectedTime === t ? "bg-primary border-primary text-background shadow-md" : "border-border hover:border-primary/40"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 space-y-4">
                        <Info className="w-8 h-8 text-primary/40 mx-auto" />
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Select a service to view timings</p>
                      </div>
                    )}
                    {selectedService && selectedService.durationMinutes >= 180 && (
                      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-start space-x-3">
                        <Sparkles className="w-4 h-4 text-primary shrink-0" />
                        <p className="text-[9px] text-primary font-bold leading-relaxed uppercase tracking-tight">
                          Note: Full-day services only start in the morning to ensure completion before 5 PM.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end pb-4 border-b border-border/50">
                  <h2 className="text-2xl font-serif font-black">3. Guest Details</h2>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Step 3 of 4</p>
                </div>
                <div className="luxury-card !p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="form-input-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Elena Gilbert" 
                        value={guestName} 
                        onChange={(e) => setGuestName(e.target.value)} 
                        required 
                      />
                    </div>
                    <div className="form-input-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        className="form-input" 
                        placeholder="e.g. +44 7800 000000" 
                        value={guestPhone} 
                        onChange={(e) => setGuestPhone(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="form-input-group">
                    <label className="form-label">Special Requests</label>
                    <textarea 
                      className="form-input h-24 resize-none" 
                      placeholder="Any specific requirements?" 
                      value={specialRequests} 
                      onChange={(e) => setSpecialRequests(e.target.value)} 
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 luxury-card relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-20 opacity-[0.03] group-hover:rotate-12 transition-transform pointer-events-none">
                  <Gem className="w-64 h-64 text-primary" />
                </div>
                <div className="w-20 h-20 bg-green-500 text-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-black mb-4">Request Received!</h2>
                <div className="bg-accent/30 p-6 rounded-2xl max-w-sm mx-auto mb-10 text-left border border-border">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/50">
                    <span className="text-[9px] font-bold uppercase text-muted-foreground">Reservation Details</span>
                    <span className="text-[9px] font-bold uppercase text-primary">Pre-Authorized</span>
                  </div>
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-foreground flex justify-between">
                      <span>Service:</span> <span>{selectedService?.name}</span>
                    </p>
                    <p className="text-xs font-bold text-foreground flex justify-between">
                      <span>Date & Time:</span> <span>June {selectedDate}, 2026 at {selectedTime}</span>
                    </p>
                    <p className="text-xs font-bold text-foreground flex justify-between">
                      <span>Amount:</span> <span className="text-primary font-serif font-black">{selectedService?.price}</span>
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground max-w-md mx-auto mb-10 font-medium leading-relaxed">
                  Your selection is ready. Please go to the **Checkout** to finish your booking along with any products.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      if (selectedService && selectedDate && selectedTime) {
                        localStorage.setItem('glamora-temp-guest', JSON.stringify({
                          name: guestName,
                          phone: guestPhone,
                          notes: specialRequests
                        }));
                        addToCart({
                          id: `${selectedService.id}-${selectedDate}-${selectedTime}`,
                          name: `${selectedService.name} (Session)`,
                          price: selectedService.price,
                          image: "/glamora-salon/images/luxury-services-banner.png",
                          date: `2026-06-${selectedDate < 10 ? '0' + selectedDate : selectedDate}`,
                          time: selectedTime
                        }, 'service');
                        router.push('/checkout');
                      }
                    }}
                    className="btn-primary px-10 py-4 shadow-xl flex items-center justify-center group"
                  >
                    Go to Checkout <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <Link href="/" className="btn-outline px-10 py-4 text-[10px] font-black uppercase tracking-widest border-primary/20">Keep Browsing</Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {step < 4 && (
            <div className="mt-12 flex items-center justify-between pt-8 border-t border-border">
              <button 
                onClick={prevStep}
                disabled={step === 1}
                className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary disabled:opacity-30 transition-all group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Go Back</span>
              </button>
              <button 
                onClick={nextStep}
                disabled={(step === 1 && !selectedServiceId) || (step === 2 && (!selectedDate || !selectedTime)) || (step === 3 && (!guestName.trim() || !guestPhone.trim()))}
                className="btn-primary px-10 group shadow-md"
              >
                {step === 3 ? "Confirm Booking" : "Next Step"} 
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. LUXURY PROMISE */}
      <section className="section-padding bg-background border-y border-border relative overflow-hidden">
        <div className="luxury-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "24-Hour Notice", icon: Clock, desc: "We require a full day's notice to prepare your personalized experience." },
              { title: "Working Day", icon: Sparkles, desc: "Our Glamora experts are available between 9:00 AM and 5:00 PM." },
              { title: "Secure Spot", icon: ShieldCheck, desc: "Your booking is protected by our professional scheduling system." },
            ].map((p, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto border border-primary/20">
                  <p.icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-black uppercase tracking-tight">{p.title}</h4>
                <p className="text-[10px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Sparkles className="w-12 h-12 text-primary animate-pulse" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
