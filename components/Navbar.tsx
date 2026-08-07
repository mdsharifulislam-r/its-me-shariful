"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "work", label: "WORK" },
  { id: "about", label: "ABOUT" },
  { id: "experience", label: "EXPERIENCE" },
  { id: "contact", label: "CONTACT" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<string>("work");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Trigger active change when section crosses the middle portion of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveTab(id);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex justify-center w-full max-w-max px-4">
      <nav className="flex items-center gap-1 px-2 py-1.5 bg-[#f6f6f6]/85 backdrop-blur-md border border-neutral-200/50 rounded-full shadow-lg transition-all duration-300">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "relative px-5 py-2 text-xs font-bold tracking-widest transition-colors duration-300 rounded-full select-none cursor-pointer font-mono",
                isActive ? "text-white" : "text-neutral-500 hover:text-neutral-900"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="activeNavBackground"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-neutral-950 rounded-full -z-10"
                />
              )}
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
