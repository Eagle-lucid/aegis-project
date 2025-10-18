// apps/throne/components/ui/ChronicleEntry.tsx
'use client';

interface ChronicleEntryProps {
    type: 'system' | 'sovereign' | 'sentinel';
    message: string;
    timestamp?: string;
};

export function ChronicleEntry({ type, message, timestamp }: ChronicleEntryProps) {
    const typeStyles = {
        system: 'text-gray-400',
        sovereign: 'text-throne-amber-400',
        sentinel: 'text-throne-cyan-400',
    };

    const typeLabels = {
        system: 'SYSTEM',
        sovereign: 'SOVEREIGN',
        sentinel: 'SENTINEL',
    };

    const typeIcons = {
        system: '⚙️',
        sovereign: '👑',
        sentinel: '🛡️',
    };

    return (
      <div className="flex items-start gap-3 py-3 border-b border-throne-bg-tertiary last:border-0">
        {/* Icon */}
        <span className="text-lg mt-0.5">{typeIcons[type]}</span>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-[family-name:var(--font-display)] font-semibold ${typeStyles[type]}`}>
                  [{typeLabels[type]}]  
                </span>
                {timestamp && (
                    <span className="text-xs text-gray-600">{timestamp}</span>
                )}
            </div>
            <p className="font-[family-name:var(--font-inter)] text-sm text-gray-300 leading-relaxed">
                {message}
            </p>
        </div>
      </div>
    );
};