"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Ticket, 
  Gift, 
  ShieldCheck, 
  Printer, 
  Download,
  CreditCard,
  MapPin,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap,
  Share2,
  Crown,
  User
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import { 
  Instagram, 
  Facebook, 
  Twitter 
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, totalItems, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceScale, setInvoiceScale] = useState(0.7);
  
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.2; // 20% VAT
  
  const discount = useMemo(() => {
    if (promoCode === "GLAMORA10") return subtotal * 0.1;
    if (isFirstTime) return 20; // £20 flat gift for first timers
    return 0;
  }, [promoCode, isFirstTime, subtotal]);

  const total = subtotal + tax + deliveryFee - discount;

  const handlePrint = () => {
    window.print();
  };

  const [isCapturing, setIsCapturing] = useState(false);

  const sanitizeStyles = (doc: Document) => {
    // html2canvas crashes on oklab/oklch colors (Tailwind v4 defaults)
    // We must force them to standard formats during capture
    const allElements = doc.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i] as HTMLElement;
      const style = window.getComputedStyle(el);
      
      // Specifically target problematic properties
      if (style.color.includes('okl') || style.backgroundColor.includes('okl') || style.borderColor.includes('okl')) {
        // Fallback to safe colors for the receipt capture
        if (el.classList.contains('text-primary') || el.classList.contains('bg-primary')) {
          el.style.color = '#C5A059';
          el.style.backgroundColor = el.classList.contains('bg-primary') ? '#C5A059' : '';
        }
        if (el.classList.contains('text-muted-foreground')) el.style.color = '#A0A0A0';
        if (el.classList.contains('bg-background')) el.style.backgroundColor = '#121212';
      }
    }
  };

  const downloadInvoiceAsImage = async () => {
    const element = document.getElementById("invoice-capture");
    if (!element || isCapturing) return;
    
    setIsCapturing(true);
    const originalScale = invoiceScale;
    
    const head = document.head;
    const originalStyles = Array.from(head.querySelectorAll('style, link[rel="stylesheet"]'));
    const safeStyle = document.createElement('style');
    safeStyle.id = 'safe-capture-style';
    safeStyle.innerHTML = `
      * { box-sizing: border-box; -webkit-print-color-adjust: exact; margin: 0; padding: 0; }
      body { background: #0A0A0A !important; font-family: serif; }
      #invoice-capture { 
        background: #0A0A0A !important; 
        color: #FFFFFF !important; 
        display: block !important;
        width: 420px !important;
        border-radius: 3.5rem !important;
        border: 2px solid rgba(197,163,88,0.2) !important;
        overflow: hidden !important;
        position: relative !important;
      }
      .p-12 { padding: 3rem !important; }
      .space-y-10 > * + * { margin-top: 2.5rem !important; }
      .space-y-8 > * + * { margin-top: 2rem !important; }
      .space-y-6 > * + * { margin-top: 1.5rem !important; }
      .space-y-4 > * + * { margin-top: 1rem !important; }
      .space-y-2 > * + * { margin-top: 0.5rem !important; }
      .space-y-1 > * + * { margin-top: 0.25rem !important; }
      .flex { display: flex !important; }
      .flex-col { flex-direction: column !important; }
      .items-center { align-items: center !important; }
      .justify-center { justify-content: center !important; }
      .justify-between { justify-content: space-between !important; }
      .justify-end { justify-content: flex-end !important; }
      .text-center { text-align: center !important; }
      .text-right { text-align: right !important; }
      .grid { display: grid !important; }
      .grid-cols-2 { grid-template-columns: 1fr 1fr !important; }
      .gap-8 { gap: 2rem !important; }
      .gap-5 { gap: 1.25rem !important; }
      .gap-4 { gap: 1rem !important; }
      .gap-3 { gap: 0.75rem !important; }
      .gap-2 { gap: 0.5rem !important; }
      .w-20 { width: 5rem !important; }
      .h-20 { height: 5rem !important; }
      .w-16 { width: 4rem !important; }
      .h-16 { height: 4rem !important; }
      .rounded-full { border-radius: 9999px !important; }
      .rounded-3xl { border-radius: 1.5rem !important; }
      .rounded-2xl { border-radius: 1rem !important; }
      .border { border: 1px solid rgba(255,255,255,0.1) !important; }
      .border-t { border-top: 1px solid rgba(255,255,255,0.1) !important; }
      .border-b { border-bottom: 1px solid rgba(255,255,255,0.1) !important; }
      .text-3xl { font-size: 1.875rem !important; }
      .text-4xl { font-size: 2.25rem !important; }
      .font-black { font-weight: 900 !important; }
      .font-serif { font-family: serif !important; }
      .uppercase { text-transform: uppercase !important; }
      .tracking-tighter { letter-spacing: -0.05em !important; }
      .tracking-widest { letter-spacing: 0.1em !important; }
      .italic { font-style: italic !important; }
    `;
    
    try {
      setInvoiceScale(1);
      await new Promise(r => setTimeout(r, 250));

      originalStyles.forEach(s => s.remove());
      head.appendChild(safeStyle);

      const canvas = await html2canvas(element, {
        backgroundColor: '#0A0A0A',
        scale: 3,
        useCORS: true,
        logging: false
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `Glamora-Receipt-GL98X2P.png`;
      link.click();
    } catch (error) {
      console.error("Download failed", error);
    } finally {
      safeStyle.remove();
      originalStyles.forEach(s => head.appendChild(s));
      setInvoiceScale(originalScale);
      setIsCapturing(false);
    }
  };

  const handleWhatsAppShare = async () => {
    const element = document.getElementById("invoice-capture");
    if (!element || isCapturing) return;

    setIsCapturing(true);
    const originalScale = invoiceScale;

    const head = document.head;
    const originalStyles = Array.from(head.querySelectorAll('style, link[rel="stylesheet"]'));
    const safeStyle = document.createElement('style');
    safeStyle.id = 'safe-share-style';
    safeStyle.innerHTML = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #0A0A0A !important; }
      #invoice-capture { 
        background: #0A0A0A !important; 
        color: #FFFFFF !important; 
        display: block !important;
        width: 420px !important;
        border-radius: 3.5rem !important;
        border: 2px solid rgba(197,163,88,0.2) !important;
      }
      .p-12 { padding: 3rem !important; }
      .space-y-10 > * + * { margin-top: 2.5rem !important; }
      .space-y-6 > * + * { margin-top: 1.5rem !important; }
      .space-y-4 > * + * { margin-top: 1rem !important; }
      .flex { display: flex !important; }
      .grid { display: grid !important; }
      .grid-cols-2 { grid-template-columns: 1fr 1fr !important; }
      .items-center { align-items: center !important; }
      .justify-between { justify-content: space-between !important; }
      .text-center { text-align: center !important; }
      .text-right { text-align: right !important; }
      .font-serif { font-family: serif !important; }
    `;

    try {
      setInvoiceScale(1);
      await new Promise(r => setTimeout(r, 250));

      originalStyles.forEach(s => s.remove());
      head.appendChild(safeStyle);

      const canvas = await html2canvas(element, {
        backgroundColor: '#0A0A0A',
        scale: 2.5,
        useCORS: true
      });
      const dataUrl = canvas.toDataURL("image/png");
      const resp = await fetch(dataUrl);
      const blob = await resp.blob();
      const file = new File([blob], `Glamora-Receipt-GL98X2P.png`, { type: 'image/png' });

      // 🚀 ELITE NATIVE SHARING (Direct Image Send)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'GLAMORA LUXURY RECEIPT',
          });
          return; // Success!
        } catch (shareError) {
          console.error("Native share failed", shareError);
        }
      }

      // 🔄 FALLBACK: Clipboard + Direct WhatsApp
      try {
        if (navigator.clipboard && window.ClipboardItem) {
          const item = new ClipboardItem({ "image/png": blob });
          await navigator.clipboard.write([item]);
        }
      } catch (e) {
        console.warn("Clipboard failed");
      }

      const message = `*✨ GLAMORA BOOKING CONFIRMATION ✨*%0A%0A*Order:* #GL-98X2P%0A%0A_Your luxury receipt image is copied to your clipboard!_%0A%0A*Just PASTE (Ctrl+V) into the chat now.*`;
      window.open(`https://wa.me/?text=${message}`, '_blank');
      
      alert("🚀 WHATSAPP OPENING...\n\nReceipt image copied! Just PASTE (Ctrl+V) in the chat.");
    } catch (error) {
      console.error("Share error:", error);
    } finally {
      safeStyle.remove();
      originalStyles.forEach(s => head.appendChild(s));
      setInvoiceScale(originalScale);
      setIsCapturing(false);
    }
  };


  if (showInvoice) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-start p-4 md:p-10 font-sans relative overflow-y-auto no-scrollbar">
        {/* Cinematic Background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none grayscale bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80')] bg-cover bg-center fixed" />
        
        {/* 🛠️ Professional Action Bar - NOW ABOVE AND CENTERED */}
        <div className="w-full max-w-2xl flex flex-col items-center gap-6 mb-12 relative z-20 print:hidden">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={downloadInvoiceAsImage}
              className="bg-[#C5A358] hover:bg-[#B08E45] text-white px-8 py-4 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" /> SAVE IMAGE
            </button>
            <button 
              onClick={handlePrint}
              className="bg-white text-[#121212] px-8 py-4 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-4 h-4" /> PRINT PDF
            </button>
            <button 
              onClick={handleWhatsAppShare}
              className="bg-white/10 border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-full flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all backdrop-blur-md hover:bg-white/20 active:scale-95"
            >
              <Share2 className="w-4 h-4" /> SHARE NOW
            </button>
          </div>
          
          <div className="flex items-center gap-8">
            {/* Scale Control */}
            <div className="flex items-center bg-white/5 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10 shadow-xl">
              <button onClick={() => setInvoiceScale(prev => Math.max(0.4, prev - 0.1))} className="p-1.5 text-white/50 hover:text-white transition-colors"><Minus className="w-4 h-4" /></button>
              <span className="text-[10px] font-black text-white w-14 text-center tracking-widest">{Math.round(invoiceScale * 100)}%</span>
              <button onClick={() => setInvoiceScale(prev => Math.min(1.5, prev + 0.1))} className="p-1.5 text-white/50 hover:text-white transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
            
            <button 
              onClick={() => setShowInvoice(false)} 
              className="bg-red-500/10 hover:bg-red-500/20 text-red-500 px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-red-500/20 transition-all"
            >
              Close Preview
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: invoiceScale }}
          style={{ 
            transformOrigin: 'top center', 
            backgroundColor: '#0A0A0A', 
            color: '#FFFFFF', 
            borderColor: 'rgba(197,163,88,0.2)',
            boxShadow: '0 50px 100px -20px rgba(0,0,0,1), 0 0 40px rgba(197,163,88,0.05)',
            width: '420px',
            display: 'block',
            padding: '0',
            borderWidth: '2px',
            borderStyle: 'solid'
          }}
          className="rounded-[3.5rem] overflow-hidden relative z-10 mb-20"
          id="invoice-capture"
        >
          {/* ✨ Premium Glow Overlay */}
          <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', backgroundColor: '#C5A358', opacity: '0.03', filter: 'blur(120px)', pointerEvents: 'none', zIndex: '0' }} />
          
          <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: '10' }}>
            {/* 1. Elite Brand Header */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: '16px' }}>
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  background: 'linear-gradient(135deg, #C5A358 0%, #A68A46 100%)',
                  boxShadow: '0 15px 35px rgba(197,163,88,0.3)',
                  position: 'relative'
                }}
              >
                <Crown className="w-10 h-10 text-white" />
                <div style={{ position: 'absolute', inset: '0', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.2)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h1 style={{ fontSize: '30px', fontFamily: 'serif', fontWeight: '900', letterSpacing: '-0.02em', color: '#FFFFFF', margin: '0' }}>GLAMORA</h1>
                <p style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.6em', color: '#C5A358', margin: '0' }}>Sanctuary of Beauty</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', paddingTop: '8px' }}>
                <span style={{ padding: '6px 16px', borderRadius: '9999px', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', backgroundColor: '#1A1A1A', color: '#888', border: '1px solid #222' }}>#GL-98X2P</span>
                <span style={{ padding: '6px 16px', borderRadius: '9999px', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', background: 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)', color: '#FFF', border: '1px solid rgba(255,255,255,0.2)' }}>CONFIRMED</span>
              </div>
            </div>

            {/* Premium Divider */}
            <div style={{ height: '2px', width: '100%', background: 'linear-gradient(90deg, transparent, rgba(197,163,88,0.2), transparent)' }} />

            {/* 2. Client Identity Card */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', paddingLeft: '8px', paddingRight: '8px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
                   <User style={{ width: '14px', height: '14px', marginRight: '8px', opacity: '0.5' }} /> Client
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '900', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '-0.01em', margin: '0' }}>Guest User</p>
                  <p style={{ fontSize: '10px', color: '#444', margin: '0' }}>Session Participant</p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'right' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#666' }}>
                   Session <Clock style={{ width: '14px', height: '14px', marginLeft: '8px', opacity: '0.5' }} />
                </div>
                <div>
                  <p style={{ fontSize: '12px', fontWeight: '900', color: '#FFFFFF', margin: '0' }}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  <p style={{ fontSize: '10px', color: '#C5A358', margin: '0' }}>09:00 - 11:00 AM</p>
                </div>
              </div>
            </div>

            {/* 3. Luxury Line Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
              <p style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.4em', color: '#444', margin: '0' }}>Reserved Rituals</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '16px', overflow: 'hidden', flexShrink: '0', border: '1px solid #222', backgroundColor: '#111', position: 'relative' }}>
                        <img src={item.image} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: '0.9' }} alt={item.name} />
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <h5 style={{ fontSize: '11px', fontWeight: '900', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0' }}>{item.name}</h5>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '8px', fontWeight: '900', padding: '2px 8px', borderRadius: '4px', backgroundColor: 'rgba(197,163,88,0.1)', color: '#C5A358', border: '1px solid rgba(197,163,88,0.2)', textTransform: 'uppercase' }}>{item.type}</span>
                          <span style={{ fontSize: '9px', fontWeight: '900', color: '#666' }}>x{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '12px', fontFamily: 'serif', fontWeight: '900', color: '#FFFFFF', fontStyle: 'italic', margin: '0' }}>£{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Financial Summary Card */}
            <div style={{ borderRadius: '40px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid #1A1A1A', backgroundColor: '#0F0F0F', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '0', right: '0', width: '128px', height: '128px', backgroundColor: '#C5A358', opacity: '0.02', filter: 'blur(80px)' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: '#555' }}>Subtotal</span>
                  <span style={{ color: '#FFFFFF' }}>£{subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  <span style={{ color: '#555' }}>Luxury VAT (20%)</span>
                  <span style={{ color: '#FFFFFF' }}>£{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#C5A358' }}>
                    <span>Reward Adjustment</span>
                    <span>-£{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              
              <div style={{ paddingTop: '32px', borderTop: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.3em', color: '#C5A358', margin: '0' }}>Final Investment</p>
                  <p style={{ fontSize: '8px', color: '#444', textTransform: 'uppercase', margin: '0' }}>Inclusive of all taxes</p>
                </div>
                <span style={{ fontSize: '36px', fontFamily: 'serif', fontWeight: '900', color: '#FFFFFF', letterSpacing: '-0.04em' }}>£{total.toFixed(2)}</span>
              </div>
            </div>

            {/* 5. Payment Integrity */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', paddingLeft: '8px', paddingRight: '8px', paddingTop: '8px' }}>
              <div style={{ padding: '16px', borderRadius: '24px', border: '1px solid #1A1A1A', backgroundColor: '#0F0F0F' }}>
                <p style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', color: '#555', margin: '0' }}>Method</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CreditCard style={{ width: '14px', height: '14px', color: '#C5A358' }} />
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#FFFFFF', textTransform: 'uppercase' }}>Bank Direct</span>
                </div>
              </div>
              <div style={{ padding: '16px', borderRadius: '24px', border: '1px solid #1A1A1A', backgroundColor: '#0F0F0F', textAlign: 'right' }}>
                <p style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px', color: '#555', margin: '0' }}>Security</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '900', color: '#C5A358', textTransform: 'uppercase', fontStyle: 'italic' }}>Verified</span>
                  <ShieldCheck style={{ width: '14px', height: '14px', color: '#C5A358' }} />
                </div>
              </div>
            </div>

            {/* 6. Signature Footer */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px', paddingTop: '24px', borderTop: '1px solid #1A1A1A' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '11px', fontFamily: 'serif', fontWeight: '900', fontStyle: 'italic', color: '#FFFFFF', lineHeight: '1.2', margin: '0' }}>Thank you for choosing Glamora.</p>
                <p style={{ fontSize: '8px', color: '#555', textTransform: 'uppercase', letterSpacing: '0.3em', maxWidth: '240px', marginLeft: 'auto', marginRight: 'auto', lineHeight: '1.4', margin: '0' }}>
                  Your journey to aesthetic perfection has begun. We look forward to welcoming you.
                </p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', opacity: '0.4' }}>
                <Instagram style={{ width: '16px', height: '16px', color: '#FFFFFF' }} />
                <Facebook style={{ width: '16px', height: '16px', color: '#FFFFFF' }} />
                <Twitter style={{ width: '16px', height: '16px', color: '#FFFFFF' }} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.6em', color: '#FFFFFF', margin: '0' }}>GLAMORA.CO.UK</p>
                <div style={{ height: '2px', width: '48px', backgroundColor: '#C5A358', marginLeft: 'auto', marginRight: 'auto', borderRadius: '9999px' }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-[100px] pb-20">
        <div className="luxury-container">
          <div className={cn(
            "grid grid-cols-1 gap-12",
            cart.length > 0 ? "lg:grid-cols-3" : "max-w-3xl mx-auto"
          )}>
            
            {/* Left: Cart Items */}
            <div className={cn(
              "space-y-8",
              cart.length > 0 ? "lg:col-span-2" : "text-center"
            )}>
              <div className={cn(
                "flex items-end justify-between border-b border-border pb-6",
                cart.length === 0 && "justify-center"
              )}>
                <div className={cart.length === 0 ? "text-center" : ""}>
                  <h1 className="text-4xl font-serif font-black tracking-tighter">Your Shopping <span className="text-primary italic">Bag.</span></h1>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-2">{totalItems} items selected</p>
                </div>
                {cart.length > 0 && (
                  <button onClick={clearCart} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:opacity-80 transition-opacity">Clear Bag</button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="luxury-card !p-20 text-center space-y-8 border-dashed border-primary/20 bg-primary/[0.02]">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto shadow-inner">
                    <ShoppingBag className="w-10 h-10 text-primary/40" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-serif font-black">Your bag is empty</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">Discover our curated selection of professional grooming products and premium beauty rituals.</p>
                  </div>
                  <Link href="/products" className="btn-primary inline-flex px-12 py-5 shadow-luxury-gold">Explore Products</Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.id}
                      className="luxury-card !p-6 flex flex-col sm:flex-row items-center gap-8 group"
                    >
                      <div className="w-24 h-24 bg-accent rounded-[1.5rem] overflow-hidden shrink-0 border-2 border-primary/5">
                        <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                      </div>
                      <div className="flex-1 space-y-1 text-center sm:text-left">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">{item.type}</p>
                        <h3 className="text-lg font-serif font-black text-foreground">{item.name}</h3>
                        <p className="text-sm font-black text-primary">£{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center bg-accent rounded-xl border border-border">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:text-primary transition-colors"><Minus className="w-4 h-4" /></button>
                          <span className="w-8 text-center font-black text-xs">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:text-primary transition-colors"><Plus className="w-4 h-4" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="space-y-8">
              {cart.length > 0 && (
                <>
                  <div className="luxury-card !p-10 space-y-8 sticky top-24">
                    <h3 className="text-xl font-serif font-black text-foreground">Order Summary</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-black">£{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="font-black text-green-500">{deliveryFee === 0 ? "FREE" : `£${deliveryFee.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-muted-foreground">Tax (VAT 20%)</span>
                        <span className="font-black">£{tax.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm font-medium text-primary">
                          <span className="flex items-center"><Ticket className="w-4 h-4 mr-2" /> Discount</span>
                          <span className="font-black">-£{discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="pt-6 border-t border-border flex justify-between items-end">
                        <span className="text-sm font-black uppercase tracking-widest">Total</span>
                        <span className="text-3xl font-serif font-black text-primary">£{Math.max(0, total).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Promo Code */}
                    <div className="space-y-4">
                      <div className="relative">
                        <Ticket className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          placeholder="Promo Code" 
                          className="form-input !px-12"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                        />
                      </div>
                    </div>

                    {/* First Time Gift */}
                    {isFirstTime && (
                      <div className="p-6 bg-primary/5 border border-dashed border-primary/30 rounded-2xl flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center shrink-0">
                          <Gift className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-[10px] font-black uppercase tracking-widest">Welcome Gift Applied</h4>
                          <p className="text-[10px] text-muted-foreground mt-1">£20.00 will be deducted from your first ritual as a welcome from Glamora.</p>
                        </div>
                      </div>
                    )}

                    <button 
                      disabled={cart.length === 0}
                      onClick={() => setShowInvoice(true)}
                      className="btn-primary w-full py-5 text-sm font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center group disabled:opacity-50"
                    >
                      Place Order <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </button>

                    <div className="flex flex-col items-center gap-4 text-center">
                      <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest flex items-center">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-500 mr-2" /> SECURE CHECKOUT & ENCRYPTION
                      </p>
                      <div className="flex gap-4 opacity-30 grayscale">
                        <CreditCard className="w-8 h-8" />
                        <Zap className="w-8 h-8" />
                      </div>
                    </div>
                  </div>

                  {/* Next Purchase Code */}
                  <div className="luxury-card !p-8 bg-accent/30 border-primary/20 text-center space-y-4">
                    <div className="inline-flex p-3 bg-primary/20 rounded-full text-primary">
                      <Gift className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-serif font-black uppercase tracking-tight">Your Next Gift</h4>
                    <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">
                      Complete this purchase to receive a special **GOLDEN20** code for 20% off your next grooming session or skincare purchase over £150.
                    </p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
