"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCart() {
  const { totalItems, cart } = useCart();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isHidden = pathname.includes("/checkout") || pathname.includes("/admin") || totalItems === 0;

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const priceStr = typeof item.price === "number" ? item.price.toString() : (item.price || "0");
    const priceNum = parseFloat(priceStr.replace(/[^\d.]/g, ""));
    return sum + (isNaN(priceNum) ? 0 : priceNum);
  }, 0);

  return (
    <AnimatePresence>
      {!isHidden && (
        <motion.div
          initial={{ scale: 0, opacity: 0, y: 50 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
            transition: { type: "spring", stiffness: 260, damping: 20 }
          }}
          exit={{ scale: 0, opacity: 0, y: 50 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-[110px] right-6 z-[4999] lg:hidden"
        >
          <Link
            href="/checkout"
            className="flex items-center space-x-3 bg-primary text-background px-4 py-3.5 rounded-full shadow-2xl shadow-primary/35 border-2 border-background/20 font-sans font-bold text-xs uppercase tracking-widest"
          >
            <div className="relative">
              <ShoppingBag className="w-4.5 h-4.5 text-background" />
              <span className="absolute -top-2 -right-2 bg-foreground text-background text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md border border-background/10">
                {totalItems}
              </span>
            </div>
            <div className="flex flex-col items-start leading-none pr-1">
              <span className="text-[7px] uppercase tracking-widest opacity-80 font-black">Checkout</span>
              <span className="text-xs font-serif font-black mt-0.5">£{totalPrice}</span>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
