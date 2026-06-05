"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Menu, 
  X, 
  Search, 
  ShoppingBag, 
  User, 
  ChevronDown,
  Zap,
  LayoutDashboard,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/context/CartContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { totalItems, wishlist } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Reviews", href: "/reviews" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[1000] h-[64px] flex items-center transition-all duration-200",
        scrolled 
          ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" 
          : "bg-background border-b border-transparent"
      )}
    >
      <div className="luxury-container w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-background" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-serif font-black tracking-tighter text-foreground leading-none">GLAMORA</span>
            <span className="text-[7px] uppercase tracking-[0.3em] text-primary font-bold">Salon</span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-1 pr-4 border-r border-border">
            <ThemeToggle />
            <button 
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-all relative group/tooltip"
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                window.dispatchEvent(event);
              }}
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 group-hover/tooltip:translate-y-0 whitespace-nowrap z-[2000]">
                Search Site
              </span>
            </button>
            <Link href="/checkout" className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-all group/tooltip">
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 group-hover/tooltip:translate-y-0 whitespace-nowrap z-[2000]">
                Shopping Bag
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-[8px] font-black rounded-full flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/wishlist" className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-accent transition-all group/tooltip">
              <Heart className={cn("w-4 h-4 text-muted-foreground", wishlist.length > 0 && "fill-primary text-primary")} />
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 group-hover/tooltip:translate-y-0 whitespace-nowrap z-[2000]">
                Your Favorites
              </span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-[8px] font-black rounded-full flex items-center justify-center shadow-lg">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
          <Link href="/admin/login" className="flex items-center space-x-1 text-[10px] font-bold text-muted-foreground hover:text-primary transition-all relative group/tooltip">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Admin</span>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 group-hover/tooltip:translate-y-0 whitespace-nowrap z-[2000]">
              Dashboard
            </span>
          </Link>
          <Link href="/booking" className="btn-primary">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-foreground"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-[64px] left-0 right-0 bg-background border-b border-border p-6 lg:hidden shadow-lg"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-bold text-foreground hover:text-primary transition-all"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col space-y-4">
                <div className="flex items-center justify-between py-1 bg-accent/20 px-3 rounded-xl border border-border/30">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Appearance</span>
                  <ThemeToggle />
                </div>
                <Link href="/booking" className="btn-primary w-full py-3 text-sm" onClick={() => setIsOpen(false)}>
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
