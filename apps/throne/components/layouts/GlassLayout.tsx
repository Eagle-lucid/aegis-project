// apps/throne/components/layouts/GlassLayout.tsx
'use client';

import { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface GlassLayoutProps {
    children: ReactNode;
}

export function GlassLayout({ children }: GlassLayoutProps) {
    return (
        <div className="min-h-screen bg-throne-bg-primary p-4 md:p-8">
            {/* Header */}
            <header className="max-w-7xl mx-auto mb-12 text-center">
                <div className="inline-flex items-center gap-3">
                    {/* Logo Icon */}
                    <div className="relative w-10 h-10">
                        <Image
                           src='/logo-light.svg'
                           alt="Aegis shield"
                           width={40}
                           height={40}
                           className="drop-shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                           priority
                        />
                    </div>
                    {/* Title */}
                    <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white tracking-[0.3em] uppercase">
                        AEGIS
                    </h1>
                </div>
                {/* Subtitle */}
                <p className="font-[family-name:var(--font-inter)] text-throne-cyan-400 text-sm md:text-base font-light tracking-widest mt-2">
                    Welcome, Sovereign
                </p>
            </header>

            {/* Main Grid */}
            <motion.div 
              className="max-w-7xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </div>
    );
};