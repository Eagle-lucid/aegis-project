// apps/throne/components/ui/InsightCard.tsx
'use client';

import { ReactNode } from 'react';

interface InsightCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    severity: 'alert' | 'opportunity' | 'info';
}

export function InsightCard({ icon, title, description, severity }: InsightCardProps) {
    const severityStyles = {
        alert: 'border-throne-amber-500/30 bg-throne-amber-500/5',
        opportunity: 'border-throne-cyan-500/30 bg-throne-cyan-500/5',
        info: 'border-throne-emerald-500/30 bg-throne-emerald-500.5',
    };

    const severityTextColors = {
        alert: 'text-throne-amber-400',
        opportunity: 'text-throne-cyan-400',
        info: 'text-throne-emerald-400',
    };

    return (
        <div
            className={`
                ${severityStyles[severity]}
                backdrop-blur-sm border rounded-lg p-4 transition-all
                hover:scale-[1.02] cursor-pointer
            `}
        >
            <div className='flex items-start gap-3'>
                {/* Icon */}
                <div className={`${severityTextColors[severity]} text-2xl mt-1`}>
                    {icon}
                </div>

                {/* Content */}
                <div className='flex-1'>
                    <h3 className={`font-display font-semibold mb-1 ${severityTextColors[severity]}`}>
                        {title}
                    </h3>
                    <p className='text-sm text-gray-400 leading-relaxed'>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}
