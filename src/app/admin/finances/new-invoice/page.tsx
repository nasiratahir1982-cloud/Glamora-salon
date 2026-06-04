"use client";

import React, { useState, useMemo } from "react";
import { 
  Plus, 
  Trash2, 
  Printer, 
  ChevronLeft, 
  User, 
  Scissors, 
  ShoppingBag, 
  Receipt, 
  Sparkles,
  Award,
  CheckCircle,
  Clock,
  ArrowRight,
  X,
  Search,
  Star,
  Instagram,
  Facebook,
  Globe,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { products, services } from "@/lib/mockData";

interface InvoiceItem {
  id: string;
  type: 'service' | 'product';
  description: string;
  quantity: number;
  price: number;
  image?: string;
  tags?: string[];
}

export default function NewInvoicePage() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { 
      id: Math.random().toString(), 
      type: 'service', 
      description: 'Master Stylist Haircut', 
      quantity: 1, 
      price: 85, 
      image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80",
      tags: ["Master Level", "Eco-Friendly"]
    }
  ]);
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("+44 7700 900123");
  const [paymentMethod, setPaymentMethod] = useState("UK Bank Transfer");
  const [discount, setDiscount] = useState(0);
  const [taxRate] = useState(20); // 20% UK VAT
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [itemSearch, setItemSearch] = useState("");

  const subtotal = useMemo(() => items.reduce((acc, item) => acc + (item.price * item.quantity), 0), [items]);
  const taxAmount = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate]);
  const total = useMemo(() => subtotal + taxAmount - discount, [subtotal, taxAmount, discount]);

  const allOfferings = [
    ...services.map(s => ({ ...s, type: 'service' as const })),
    ...products.map(p => ({ ...p, type: 'product' as const, price: parseFloat(p.price.replace('£', '')) }))
  ];

  const filteredOfferings = allOfferings.filter(o => 
    o.name.toLowerCase().includes(itemSearch.toLowerCase())
  );

  const addItemFromSelection = (offering: any) => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(),
      type: offering.type,
      description: offering.name,
      quantity: 1,
      price: offering.price,
      image: offering.image,
      tags: offering.type === 'service' ? ["Premium Ritual", "Handcrafted"] : ["Organic", "Gold Standard"]
    };
    setItems([...items, newItem]);
    setItemSearch("");
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    setItems(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
        <div className="flex items-center space-x-4">
          <Link href="/admin/finances" className="p-3 bg-accent/50 hover:bg-primary hover:text-background rounded-2xl transition-all group">
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="space-y-1">
            <h2 className="text-2xl font-serif font-black tracking-tight">Generate Receipt</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Crafting a cinematic billing experience</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsPreviewOpen(true)}
            className="btn-primary px-8 flex items-center shadow-xl shadow-primary/20"
          >
            <Sparkles className="w-4 h-4 mr-2" /> Preview Luxury Receipt
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🟡 LEFT: BUILDER */}
        <div className="lg:col-span-2 space-y-8">
          <div className="luxury-card !p-8">
            <div className="flex items-center space-x-3 mb-8">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-serif font-black">Guest Profile</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-input-group">
                <label className="form-label">Guest Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ali B" 
                  className="form-input"
                  value={customer}
                  onChange={(e) => setCustomer(e.target.value)}
                />
              </div>
              <div className="form-input-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-input-group">
                <label className="form-label">Payment Status</label>
                <select className="form-input" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option>UK Bank Transfer</option>
                  <option>Card Payment</option>
                  <option>Cash</option>
                </select>
              </div>
            </div>
          </div>

          <div className="luxury-card !p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif font-black flex items-center">
                <ShoppingBag className="w-5 h-5 text-primary mr-3" /> Items Breakdown
              </h3>
            </div>
            
            <div className="mb-6 relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Quick add product or service..." 
                  className="w-full bg-accent/20 border-2 border-primary/20 rounded-2xl py-4 px-12 text-xs font-bold focus:bg-background focus:border-primary transition-all outline-none"
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                />
              </div>
              <AnimatePresence>
                {itemSearch && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-premium z-50 overflow-hidden max-h-64 overflow-y-auto">
                    {filteredOfferings.map((offering: any) => (
                      <button key={offering.id} onClick={() => addItemFromSelection(offering)} className="w-full flex items-center justify-between p-4 hover:bg-accent/50 border-b border-border last:border-0 group">
                        <div className="flex items-center space-x-4">
                          <img src={offering.image} className="w-10 h-10 object-cover rounded-lg" />
                          <div className="text-left">
                            <p className="text-xs font-bold">{offering.name}</p>
                            <p className="text-[9px] text-primary font-bold uppercase">{offering.type}</p>
                          </div>
                        </div>
                        <span className="text-xs font-black">£{offering.price}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-5 bg-accent/5 border border-border rounded-2xl group">
                  <img src={item.image} className="w-16 h-16 object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all" />
                  <div className="flex-1">
                    <p className="text-xs font-bold">{item.description}</p>
                    <div className="flex gap-1.5 mt-2">
                      {item.tags?.map(t => <span key={t} className="px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-bold uppercase rounded-md">{t}</span>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[9px] text-muted-foreground font-black uppercase">Qty: {item.quantity}</p>
                      <p className="text-xs font-black">£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🔵 RIGHT: SUMMARY */}
        <div className="space-y-8">
          <div className="luxury-card !p-8">
            <h3 className="text-xl font-serif font-black mb-8">Settlement</h3>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex justify-between">
                <span className="text-muted-foreground uppercase text-[10px] tracking-widest">Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground uppercase text-[10px] tracking-widest">VAT (20%)</span>
                <span>£{taxAmount.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="font-serif font-black text-lg">Total</span>
                <span className="font-serif font-black text-3xl text-primary">£{total.toFixed(2)}</span>
              </div>
            </div>
            <button onClick={() => setIsPreviewOpen(true)} className="btn-primary w-full mt-8 py-4 text-xs font-black uppercase tracking-widest">Generate Preview</button>
          </div>
        </div>
      </div>

      {/* 🧾 CINEMATIC RECEIPT PREVIEW */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[6000] flex items-center justify-center p-4 bg-background/95 backdrop-blur-2xl overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-[#0D0D0D] w-full max-w-[450px] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden my-8"
            >
              {/* Receipt Content */}
              <div className="p-8 lg:p-12 space-y-10 text-white font-sans relative">
                {/* 1. Brand Logo */}
                <div className="flex flex-col items-center space-y-6 pt-4">
                  <div className="w-20 h-20 bg-primary rounded-[2.5rem] flex items-center justify-center shadow-[0_0_40px_rgba(197,164,126,0.3)] rotate-6">
                    <Sparkles className="text-background w-10 h-10" />
                  </div>
                  <div className="text-center">
                    <h1 className="text-3xl font-serif font-black tracking-tighter text-white">GLAMORA</h1>
                    <p className="text-[10px] text-primary font-black uppercase tracking-[0.5em] mt-2">Glamora Studio London</p>
                  </div>
                </div>

                {/* 2. Status Badges */}
                <div className="flex items-center justify-center gap-3">
                  <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary">#GLM-{Math.floor(Math.random() * 100000)}</span>
                  </div>
                  <div className="px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full flex items-center space-x-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-green-500">Confirmed</span>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {/* 3. Customer & Details Grid */}
                <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase tracking-widest">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-primary">
                      <User className="w-3.5 h-3.5" />
                      <span>Customer</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-white">{customer || "James Vane"}</p>
                      <p className="text-muted-foreground">{phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-primary">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Studio Arrival</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-white">{new Date().toLocaleDateString('en-GB')}</p>
                      <p className="text-muted-foreground">09:00 - 11:00</p>
                    </div>
                  </div>
                </div>

                {/* 4. Items Breakdown */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-primary">
                    <span>Items Breakdown</span>
                    <span>{items.length} Products/Services</span>
                  </div>
                  <div className="space-y-6">
                    {items.map((item, i) => (
                      <div key={i} className="flex gap-5 group">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                          <img src={item.image} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-black tracking-tight text-white uppercase">{item.description}</p>
                            <p className="text-xs font-black text-white">£{item.price.toFixed(2)}</p>
                          </div>
                          <p className="text-[9px] text-muted-foreground font-bold">x{item.quantity} • £{item.price.toFixed(2)} / EA</p>
                          <div className="flex gap-2">
                            {item.tags?.map(t => (
                              <span key={t} className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Financial Box */}
                <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 space-y-4">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="text-white">£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-green-500">
                    <span>Service Fee</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                    <span>Estimated VAT (20%)</span>
                    <span className="text-white">£{taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-widest text-white">Total Amount</span>
                    <span className="text-3xl font-serif font-black text-white">£{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* 6. Payment Method */}
                <div className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Payment Method</p>
                      <p className="text-[10px] font-black text-white uppercase">{paymentMethod}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
                    <p className="text-[10px] font-black text-amber-400 uppercase">Verification Pending</p>
                  </div>
                </div>

                {/* 7. Footer Thank You */}
                <div className="text-center space-y-6 pt-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Thank you for your trust</p>
                    <p className="text-[9px] text-muted-foreground font-medium italic leading-relaxed uppercase">
                      Crafted with passion and excellence in mind.<br/>Your bespoke reservation is now being processed.
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all cursor-pointer"><Instagram className="w-4 h-4" /></div>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all cursor-pointer"><Facebook className="w-4 h-4" /></div>
                    <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-all cursor-pointer"><Globe className="w-4 h-4" /></div>
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/20">www.glamora.co.uk</p>
                </div>
              </div>

              {/* Close Button & Print Option */}
              <div className="absolute top-6 right-6 flex space-x-2">
                <button onClick={() => window.print()} className="p-3 bg-white/10 hover:bg-primary text-white rounded-2xl transition-all"><Printer className="w-5 h-5" /></button>
                <button onClick={() => setIsPreviewOpen(false)} className="p-3 bg-white/10 hover:bg-red-500 text-white rounded-2xl transition-all"><X className="w-5 h-5" /></button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #printable-invoice, #printable-invoice * { visibility: visible; }
          #printable-invoice {
            position: absolute !important; left: 0 !important; top: 0 !important;
            width: 100% !important; background: #0D0D0D !important; color: white !important;
            padding: 40px !important; border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
