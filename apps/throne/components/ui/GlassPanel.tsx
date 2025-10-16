// apps/throne/components/ui/GlassPanel.tsx
'use client';

import { ReactNode } from "react";

interface GlassPanelProps {
    children: ReactNode;
    className?: string;
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
    return (
        <div
            className={`
                bg-throne-glass-bg 
                backdrop-blur-md 
                border 
                border-throne-glass-border 
                rounded-lg 
                p-6
                shadow-lg
                ${className}
            `}
        >
           {children}
        </div>
    );
}