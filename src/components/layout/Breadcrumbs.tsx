"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  return (
    <nav aria-label="Breadcrumb" className="mb-12">
      <ol className="flex items-center space-x-4">
        <li>
          <Link 
            href="/" 
            className="flex items-center text-muted-foreground hover:text-primary transition-all group"
            data-tooltip="Home Sanctuary"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === pathSegments.length - 1;
          const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

          return (
            <React.Fragment key={href}>
              <li className="text-border">
                <ChevronRight className="w-4 h-4" />
              </li>
              <li>
                {isLast ? (
                  <span className="text-sm font-black uppercase tracking-widest text-primary">
                    {label}
                  </span>
                ) : (
                  <Link 
                    href={href}
                    className="text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
