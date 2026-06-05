"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight,
  Sparkles,
  Zap,
  Star,
  Award,
  Scissors,
  X,
  Minus,
  Plus,
  Gem,
  CheckCircle
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { products as productsData, Product } from "@/lib/mockData";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart, isInWishlist } = useCart();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const products = wishlist.filter((item) => item.type === "product");
  const services = wishlist.filter((item) => item.type === "service");

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative pt-[100px] pb-12 overflow-hidden bg-accent/20 border-b border-border text-center">
        <div className="absolute inset-0 bg-[url('/glamora-salon/images/luxury-gold-abstract.png')] bg-cover bg-center opacity-30" />
        <div className="absolute -top-20 -right-20 p-40 opacity-[0.03] pointer-events-none rotate-45">
          <Heart className="w-96 h-96 text-primary" />
        </div>

        <div className="luxury-container relative z-10 space-y-4">
          <div className="space-y-3 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="badge-luxury !bg-primary !text-background mx-auto !py-1"
            >
              <Heart className="w-3 h-3 mr-2 fill-background" />
              <span>{wishlist.length} Saved Items</span>
            </motion.div>
            <h1 className="text-4xl font-serif font-black tracking-tighter">Your <span className="text-primary italic">Favorites.</span></h1>
            <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">A curated collection of your beloved rituals and products</p>
          </div>
        </div>
      </section>

      {/* 2. WISHLIST CONTENT */}
      <section className="section-padding">
        <div className="luxury-container">

          {wishlist.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="luxury-card !p-24 text-center space-y-8 border-dashed border-primary/20 bg-primary/[0.02] max-w-4xl mx-auto"
            >
              <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto opacity-30">
                <Star className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-serif font-black uppercase tracking-tight">Nothing here yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm mx-auto">Start exploring our collection and heart the products or rituals you love to see them here.</p>
              </div>
              <div className="flex justify-center gap-4">
                <Link href="/products" className="btn-primary inline-flex px-10 py-4 shadow-luxury-gold">Products</Link>
                <Link href="/services" className="btn-primary bg-background text-primary border-primary/20 hover:border-primary inline-flex px-10 py-4">Rituals</Link>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-16">
              {/* PRODUCTS SECTION */}
              {products.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-black tracking-tight text-foreground flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-primary rounded-full animate-pulse" />
                    <span>Saved Products</span>
                    <span className="text-xs font-sans text-muted-foreground font-semibold">({products.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                      {products.map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          onClick={() => {
                            const fullProduct = productsData.find((p) => p.id === item.id);
                            if (fullProduct) {
                              setSelectedProduct(fullProduct);
                              setQuantity(1);
                            }
                          }}
                          className="luxury-card !p-0 group overflow-hidden cursor-pointer"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-accent">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700" 
                            />
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleWishlist(item, item.type);
                              }}
                              className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl shadow-xl hover:scale-110 transition-all z-20"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="absolute top-4 left-4">
                              <span className="badge-luxury !bg-primary !text-background !py-1 !px-4">{item.type}</span>
                            </div>
                          </div>

                          <div className="p-8 space-y-6">
                            <div className="space-y-1">
                              <h3 className="text-lg font-serif font-black text-foreground group-hover:text-primary transition-colors tracking-tight uppercase leading-tight">{item.name}</h3>
                              <p className="text-[10px] font-black text-primary tracking-widest uppercase">Expert Selection</p>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border/50">
                              <p className="text-2xl font-serif font-black text-foreground">£{item.price.toFixed(2)}</p>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(item, item.type);
                                }}
                                className="p-4 bg-primary/10 text-primary rounded-2xl hover:bg-primary hover:text-background transition-all shadow-sm"
                              >
                                <ShoppingBag className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* SERVICES SECTION */}
              {services.length > 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-serif font-black tracking-tight text-foreground flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-primary rounded-full animate-pulse" />
                    <span>Saved Rituals & Services</span>
                    <span className="text-xs font-sans text-muted-foreground font-semibold">({services.length})</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                      {services.map((item) => (
                        <motion.div
                          layout
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          className="luxury-card !p-8 group relative border border-primary/10 bg-accent/20 hover:border-primary/30 hover:shadow-luxury-gold transition-all duration-300 rounded-[2rem] flex flex-col justify-between min-h-[220px]"
                        >
                          <div>
                            <div className="flex items-start justify-between mb-4">
                              <div className="w-12 h-12 bg-primary/10 border border-primary/20 text-primary rounded-2xl flex items-center justify-center">
                                <Scissors className="w-6 h-6" />
                              </div>
                              <button 
                                onClick={() => toggleWishlist(item, item.type)}
                                className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all focus:outline-none"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <div className="space-y-1">
                              <span className="badge-luxury !bg-primary/20 !text-primary !py-0.5 !px-2.5 text-[9px] uppercase tracking-wider font-bold">Service</span>
                              <h3 className="text-lg font-serif font-black text-foreground group-hover:text-primary transition-colors tracking-tight uppercase leading-tight mt-2">
                                {item.name}
                              </h3>
                              <p className="text-[10px] font-black text-primary tracking-widest uppercase">Expert Ritual Selection</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-6 mt-6 border-t border-border/50">
                            <p className="text-2xl font-serif font-black text-foreground">£{item.price.toFixed(2)}</p>
                            <button 
                              onClick={() => addToCart(item, item.type)}
                              className="btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-luxury-gold"
                            >
                              <ShoppingBag className="w-4 h-4" />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Recommended Section */}
      <section className="section-padding bg-accent/5 border-t border-border">
        <div className="luxury-container">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-serif font-black">Inspired by <span className="text-primary italic">Favorites.</span></h2>
              <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Recommended for your collection</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="luxury-card !bg-primary p-12 rounded-[3rem] text-background flex flex-col justify-between h-full relative overflow-hidden group">
               <Zap className="absolute -bottom-10 -right-10 w-64 h-64 opacity-10 group-hover:rotate-12 transition-transform duration-1000" />
               <div className="space-y-4">
                 <h3 className="text-3xl font-serif font-black text-background uppercase tracking-tight">Need expert advice?</h3>
                 <p className="text-background/80 text-sm font-medium leading-relaxed">Our Glamora stylists can help you refine your favorites list and find the perfect match for your hair and skin type.</p>
               </div>
               <Link href="/contact" className="btn-primary bg-background text-primary px-8 py-4 border-none mt-8 inline-flex self-start">Talk to Expert</Link>
            </div>
            <div className="luxury-card !bg-accent/40 p-12 rounded-[3rem] border-primary/20 flex flex-col justify-between h-full relative overflow-hidden group">
               <Award className="absolute -bottom-10 -right-10 w-64 h-64 opacity-5 group-hover:-rotate-12 transition-transform duration-1000 text-primary" />
               <div className="space-y-4">
                 <h3 className="text-3xl font-serif font-black uppercase tracking-tight">Member Rewards</h3>
                 <p className="text-muted-foreground text-sm font-medium leading-relaxed">Saving favorites earns you **GLAMORA POINTS**. Reach 500 points for a complimentary £50 ritual credit.</p>
               </div>
               <Link href="/reviews" className="text-primary font-black uppercase tracking-widest text-[10px] mt-8 flex items-center group">
                 View Your Points <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-all" />
               </Link>
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
