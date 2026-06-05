"use client";

import React, { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Search, 
  Filter, 
  Star, 
  ShoppingBag, 
  ChevronRight, 
  Sparkles, 
  CheckCircle,
  Tag,
  ArrowRight,
  Heart,
  TrendingUp,
  Zap,
  ShoppingBasket,
  Award,
  Gem,
  Crown,
  Gift,
  X,
  Plus,
  Minus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products, Product } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "All" ? true :
                            filter === "Best Sellers" ? p.tags.includes("Best-Seller") :
                            p.category.includes(filter);
      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. COMPACT CINEMATIC HERO */}
      <section className="relative pt-[90px] pb-10 overflow-hidden bg-accent/20 border-b border-border">
        {/* Layered Background Textures */}
        <div className="absolute inset-0 bg-[url('/glamora-salon/images/luxury-products-banner.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40" />
        
        {/* Floating Decorative Elements */}
        <div className="absolute -top-10 -left-10 p-40 opacity-[0.03] pointer-events-none rotate-12">
          <ShoppingBasket className="w-96 h-96 text-primary" />
        </div>
        <div className="absolute top-40 right-20 p-20 opacity-[0.02] pointer-events-none -rotate-12">
          <Crown className="w-64 h-64 text-primary" />
        </div>

        <div className="luxury-container relative z-10">
          <div className="flex flex-col items-center text-center space-y-3 max-w-5xl mx-auto">
            <Breadcrumbs />
            
            <div className="space-y-1">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="badge-luxury !bg-primary !text-background mx-auto !py-0.5 !px-3"
              >
                <Award className="w-2.5 h-2.5 mr-1.5" />
                <span className="text-[8px] uppercase tracking-[0.2em] font-black">Collection 2026</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className=""
              >
                The Beauty <br /> 
                <span className="text-primary italic relative">
                  Collection.
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary/20 rounded-full blur-[1px]" />
                </span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[11px] md:text-xs text-muted-foreground font-medium max-w-xl leading-relaxed"
            >
              Discover the professional products used daily by our Glamora artists. Selected for the best results and healthy skin.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ✨ EXCLUSIVE PROMOS & SEASONAL DEALS SECTOR */}
      <section className="py-12 bg-background border-b border-border overflow-hidden relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="luxury-container space-y-8 relative z-10">
          <div className="flex items-center space-x-3 justify-center">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <h2 className="text-xl font-serif font-black tracking-tight text-center">Exclusive Sanctuary <span className="text-primary italic">Deals & Offers</span></h2>
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { code: "GLAMORA10", title: "10% Storewide Discount", desc: "Enjoy 10% off across all professional products in your shopping bag.", icon: Tag },
              { code: "WELCOME20", title: "Flat £20 Welcome Gift", desc: "For first-time clients. Applied automatically for purchases over £100.", icon: Gift },
              { code: "GOLDEN20", title: "20% Premium Session Offer", desc: "Unlock 20% off all grooming sessions or skincare when spending £150+.", icon: Crown }
            ].map((deal) => (
              <motion.div 
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => handleCopyCode(deal.code)}
                key={deal.code}
                className="luxury-card cursor-pointer group hover:border-primary/40 relative overflow-hidden bg-gradient-to-br from-card to-accent/5 !p-6 flex items-start gap-4 transition-all duration-300"
              >
                <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20 group-hover:bg-primary group-hover:text-background transition-all duration-300 shrink-0">
                  <deal.icon className="w-5 h-5" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-wider text-foreground">{deal.title}</h3>
                    <span className="text-[8px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 tracking-wider">CLICK TO COPY</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">{deal.desc}</p>
                  <div className="pt-2 flex items-center justify-between border-t border-border/50">
                    <span className="text-[9px] font-black uppercase tracking-widest text-primary font-mono bg-accent/50 px-2.5 py-1 rounded border border-border">{deal.code}</span>
                    <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider group-hover:text-primary transition-colors">Apply Coupon →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER BAR - Enhanced Density */}
      <section className="py-8 bg-card border-b border-border sticky top-[64px] z-40 shadow-sm">
        <div className="luxury-container flex flex-col md:flex-row items-center gap-6">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search our collection..." 
              className="w-full bg-accent/10 border-2 border-primary/30 rounded-[1.5rem] py-4 px-14 text-xs font-bold focus:bg-background focus:border-primary transition-all outline-none shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {["All", "Best Sellers", "Skin Care", "Grooming", "Bridal Care", "Hair Styling"].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-3 rounded-[1.2rem] text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap",
                  filter === cat ? "bg-primary border-primary text-background shadow-lg shadow-primary/20" : "bg-card border-border text-foreground hover:border-primary/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUCT GRID */}
      <section className="section-padding bg-accent/5">
        <div className="luxury-container">
          <div className="flex flex-wrap justify-center gap-8">
            <AnimatePresence>
              {filteredProducts.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i % 8) * 0.05 }}
                  onClick={() => { setSelectedProduct(p); setQuantity(1); }}
                  className="luxury-card group !p-0 w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-22px)] lg:w-[calc(25%-24px)] cursor-pointer"
                >
                  <div 
                    className="relative aspect-square overflow-hidden bg-accent"
                  >
                    <img 
                      src={p.image} 
                      alt={p.name} 
                      className="w-full h-full object-cover md:group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <span className="badge-luxury !bg-background/95 backdrop-blur-md border-none shadow-md !py-1.5 !px-4">
                        {p.category}
                      </span>
                    </div>
                    {p.tags.includes("Best-Seller") && (
                      <div className="absolute top-4 right-4 z-20">
                        <span className="badge-luxury !bg-gradient-to-r !from-amber-500 !to-yellow-400 !text-black border-none shadow-md !py-1.5 !px-4 flex items-center font-black">
                          <Crown className="w-3 h-3 mr-1.5 fill-black" /> BEST SELLER
                        </span>
                      </div>
                    )}
                    {/* Interactive Overlay */}
                    <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/20 transition-all duration-500 flex items-end justify-end md:items-center md:justify-center p-3 pointer-events-none">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(p, 'product');
                        }}
                        className={cn(
                          "pointer-events-auto opacity-100 md:opacity-0 md:group-hover:opacity-100 scale-100 md:scale-90 md:group-hover:scale-100 transition-all duration-500 p-2.5 md:p-4 rounded-full md:rounded-2xl shadow-md md:shadow-2xl z-30 bg-background/90 text-primary md:bg-background"
                        )}
                      >
                        <Heart className={cn("w-4.5 h-4.5 md:w-6 md:h-6", isInWishlist(p.id) && "fill-current")} />
                      </button>
                    </div>
                    {/* Add to Cart Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full md:group-hover:translate-y-0 transition-transform duration-700 bg-gradient-to-t from-black/80 via-black/40 to-transparent hidden md:flex items-end z-30">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(p, 'product');
                        }}
                        className="btn-primary w-full py-4 shadow-xl border-none"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" /> Add to Bag
                      </button>
                    </div>
                  </div>
                  
                  <div 
                    className="p-6 space-y-4"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-sm font-black text-foreground leading-tight group-hover:text-primary transition-colors tracking-tight uppercase line-clamp-2">{p.name}</h3>
                      <p className="text-lg font-serif font-black text-primary">{p.price}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center space-x-1.5">
                        <div className="flex items-center space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("w-2.5 h-2.5", i < Math.floor(p.rating) ? "fill-primary text-primary" : "text-border")} />
                          ))}
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground">{p.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-green-500">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span className="text-[9px] font-black uppercase tracking-widest">In Stock</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. PREMIUM CTA */}
      <section className="section-padding bg-background border-t border-border">
        <div className="luxury-container">
          <div className="luxury-card !bg-primary p-16 rounded-[3rem] text-background flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative group">
            <div className="absolute -top-10 -right-10 p-20 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
              <Zap className="w-96 h-96" />
            </div>
            <div className="relative z-10 text-center lg:text-left space-y-4 max-w-2xl">
              <div className="badge-luxury bg-background/20 text-background border-none inline-flex mb-2">Concierge Advice</div>
              <h2 className="text-background !text-4xl md:text-5xl font-serif font-black tracking-tighter">Need an expert opinion?</h2>
              <p className="text-background/80 text-base font-medium leading-relaxed">Our Glamora specialists are available for online help to help you find the perfect product for your skin and hair type.</p>
            </div>
            <div className="relative z-10 flex gap-4 shrink-0">
              <Link href="/contact" className="btn-primary bg-background text-primary px-12 py-5 border-none hover:scale-105 transition-all text-sm font-black uppercase tracking-widest shadow-2xl">Talk to Expert</Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* 🛍️ Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-background/85 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-[2.5rem] shadow-premium overflow-hidden z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto no-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2.5 bg-accent hover:bg-red-500 hover:text-white rounded-full transition-all z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left: Product Image */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-inherit relative bg-accent">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-6 left-6">
                  <span className="badge-luxury !bg-background/95 backdrop-blur-md border-none shadow-md !py-1.5 !px-4">
                    {selectedProduct.category}
                  </span>
                </div>
              </div>

              {/* Right: Info & Description */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-6">
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-2 text-[8px] font-black uppercase tracking-widest text-primary">
                    <Gem className="w-3.5 h-3.5" />
                    <span>SKU: {selectedProduct.sku}</span>
                  </div>
                  <h2 className="text-2xl font-serif font-black tracking-tight leading-tight uppercase text-foreground">{selectedProduct.name}</h2>
                  
                  {/* Ratings */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={cn("w-3.5 h-3.5", i < Math.floor(selectedProduct.rating) ? "fill-primary text-primary" : "text-border")} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-foreground">{selectedProduct.rating} ({selectedProduct.reviewsCount} reviews)</span>
                  </div>

                  <p className="text-2xl font-serif font-black text-primary italic pt-2">{selectedProduct.price}</p>
                  
                  {/* Description */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">About the Product</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{selectedProduct.desc}</p>
                  </div>

                  {/* Highlights / Benefits */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary">Ideal For</p>
                      <p className="text-xs font-bold text-foreground">All Skin & Hair Types</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-primary">Quality Standard</p>
                      <p className="text-xs font-bold text-foreground">Clinically Certified</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    {/* Stock Status */}
                    <div className="flex items-center space-x-2 text-green-500">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">In Stock & Ready</span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center bg-accent rounded-xl border border-border">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:text-primary transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="w-8 text-center font-black text-xs">{quantity}</span>
                      <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:text-primary transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button 
                      onClick={() => {
                        for(let i=0; i<quantity; i++) {
                          addToCart(selectedProduct, 'product');
                        }
                        setSelectedProduct(null);
                      }}
                      className="btn-primary flex-1 py-4.5 text-xs font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Bag
                    </button>
                    <button 
                      onClick={() => {
                        toggleWishlist(selectedProduct, 'product');
                      }}
                      className={cn(
                        "p-4 rounded-xl border transition-all duration-300",
                        isInWishlist(selectedProduct.id) ? "bg-primary text-background border-primary" : "border-border hover:border-primary/40 text-primary"
                      )}
                    >
                      <Heart className={cn("w-5 h-5", isInWishlist(selectedProduct.id) && "fill-current")} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
