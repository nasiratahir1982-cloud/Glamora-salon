"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Search, 
  Calendar, 
  User, 
  LayoutGrid,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Collection", href: "/products", icon: LayoutGrid },
  { name: "Rituals", href: "/booking", icon: Calendar },
  { name: "Admin", href: "/admin", icon: User },
];

export const MobileBottomNav = ({ onSearch, onNotifications }: { onSearch: () => void, onNotifications: () => void }) => {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-8 left-6 right-6 z-[150]">
      <div className="bg-background/70 backdrop-blur-3xl border border-border rounded-[2.5rem] p-4 shadow-tesla flex items-center justify-around relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-500",
                isActive ? "text-primary scale-110" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-7 h-7" />
              {isActive && (
                <motion.div
                  layoutId="mobileNavActive"
                  className="absolute inset-0 bg-primary/10 rounded-2xl -z-10"
                />
              )}
            </Link>
          );
        })}
        
        {/* Action Button: Search */}
        <button 
          onClick={onSearch}
          className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl text-muted-foreground hover:text-primary transition-all"
        >
          <Search className="w-7 h-7" />
        </button>

        {/* Action Button: Notifications */}
        <button 
          onClick={onNotifications}
          className="relative flex flex-col items-center justify-center w-14 h-14 rounded-2xl text-muted-foreground hover:text-primary transition-all"
        >
          <Bell className="w-7 h-7" />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background animate-pulse" />
        </button>
      </div>
    </nav>
  );
};
