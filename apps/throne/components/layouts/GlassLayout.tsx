// apps/throne/components/layouts/GlassLayout.tsx
'use client';

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassLayoutProps {
    children: ReactNode;
}

export function GlassLayout({ children }: GlassLayoutProps) {
    return (
        <div className="min-h-screen bg-throne-bg-primary p-4 md:p-8">
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    AEGIS
                </h1>
                <p className="text-throne-cyan-400 text-sm md:text-base">
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
    )
}