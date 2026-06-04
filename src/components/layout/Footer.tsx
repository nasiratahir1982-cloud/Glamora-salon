"use client";

import React from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/glamora_london", color: "hover:text-[#E4405F]" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/glamora_london", color: "hover:text-[#1DA1F2]" },
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/glamorasalon", color: "hover:text-[#1877F2]" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/glamora-london", color: "hover:text-[#0A66C2]" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Our Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Admin Portal", href: "/admin/login" },
];

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border pt-8 pb-4">
      <div className="luxury-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-background" />
              </div>
              <span className="text-lg font-serif font-black tracking-tighter text-foreground">GLAMORA</span>
            </Link>
            <p className="text-[10px] text-muted-foreground leading-relaxed max-w-xs">
              London's top salon for bridal makeup, hair styling, and premium grooming.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn("text-muted-foreground transition-all duration-300 hover:scale-125", social.color)}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary">Links</h4>
            <div className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary">Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[10px] text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span>London, UK</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-muted-foreground">
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>+44 (0) 20 7946 0123</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary">Newsletter</h4>
            <form className="flex space-x-1" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email" className="flex-1 bg-accent border border-border rounded-md px-2 py-1 text-[9px] font-bold outline-none" />
              <button className="bg-primary text-background p-1.5 rounded-md"><Zap className="w-3.5 h-3.5" /></button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">
            © 2026 GLAMORA SALON.
          </p>
          <div className="flex space-x-4">
            {["Privacy", "Terms", "Accessibility"].map(l => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest hover:text-primary transition-all">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
