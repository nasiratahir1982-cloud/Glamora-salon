"use client";

import * as React from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative group/toggle">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden"
        aria-label="Toggle theme"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover/toggle:opacity-100 transition-opacity duration-500" />
        
        <AnimatePresence mode="wait">
          {theme === "dark" ? (
            <motion.div
              key="dark"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="text-primary flex flex-col items-center"
            >
              <Sun className="w-6 h-6" />
              <span className="text-[8px] uppercase tracking-widest mt-1 font-bold">Royal</span>
            </motion.div>
          ) : (
            <motion.div
              key="light"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="text-primary flex flex-col items-center"
            >
              <Moon className="w-6 h-6" />
              <span className="text-[8px] uppercase tracking-widest mt-1 font-bold">Luxe</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decorative Sparkle */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-4 h-4 text-primary" />
        </motion.div>
      </button>

      {/* Tooltip Label */}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover/toggle:opacity-100 pointer-events-none transition-all duration-300 translate-y-1 group-hover/toggle:translate-y-0 whitespace-nowrap z-[2000] shadow-sm">
        Switch Mode
      </span>
    </div>
  );
}
