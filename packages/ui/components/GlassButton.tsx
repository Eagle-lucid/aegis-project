// packages/ui/components/GlassButton.tsx
'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function GlassButton({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    ...props
}: GlassButtonProps) {
    const baseClasses = `
      relative overflow-hidden rounded-xl font-medium transition-all
      duration-300 backdrop-blur-xk border disable:opacity-50 disable:cursor-not-allowed
    `;

    const variantClasses = {
        primary: `
          bg-gradient-to-r from-emerald-500 to-cyan-500
          hover:from-emerald-600 hover:to-cyan-600
          border-transparent text-white
          shadow-[0_0_20px_rgba(16,185,129,0.3)]
          hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]
        `,
        secondary: `
          bg-white/10 hover:bg-white/20
          border-white/20 text-white
        `,
        outline: `
          bg-transparent hover:bg-white/5
          border-cyan-500/50 text-cyan-400
          hover:border-cyan hover:text-cyan-300
        `,
    };

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <motion.button
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           className={`
               ${baseClasses}
               ${variantClasses[variant]}
               ${sizeClasses[size]}
               ${className}
            `}
            {...props}
        >
            {children}
        </motion.button>
    );
}