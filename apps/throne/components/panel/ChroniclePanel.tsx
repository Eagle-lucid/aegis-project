//apps/throne/components/panels/ChroniclePanel.tsx
import { GlassPanel } from "@/components/ui/GlassPanel";
import { ChronicleEntry } from "@/components/ui/ChronicleEntry";

export function ChroniclePanel() {
    const entries = [
        {
            type: 'system' as const,
            message: 'User "Sovereign assumed the throne. Session initialized with full privileges."',
            timestamp: '2m ago'
        },
        {
            type: 'sentinel' as const,
            message: 'Counsel provided on treasury drain rate and budget optimization opportunity. Risk assessment: Medium priority.',
            timestamp: '1m ago',
        },
        {
            type: 'sovereign' as const,
            message: '$5,000 budget reallocation decree prepared. Awaiting sovereign authorization to execute.',
            timestamp: '30s ago',
        },
        {
            type: 'sentinel' as const,
            message: 'Command authorization verified. Standing by for decree execution.',
            timestamp: 'Just now', 
        },
    ];


    return (
        <GlassPanel>
            {/* Header */}
            <div className="mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white mb-2">
                    The Realm Chronicle
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-gray-500 text-sm">
                   Narrative log of all throne activities and decisions
                </p>
            </div>

            {/* Chronicle Entries */}
            <div className="space-y-1 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-throne-bg-tertiary scrollbar-track-transparent">
                {entries.map((entry, index) => (
                    <ChronicleEntry 
                      key={index}
                      type={entry.type}
                      message={entry.message}
                      timestamp={entry.timestamp}
                    />
                ))}
            </div>
            
            {/* Footer Stat */}
            <div className="mt-4 pt-4 border-t border-throne-bg-tertiary text-center">
                <p className="font-[family-name:var(--font-inter)] text-xs text-gray-500">
                📊 {entries.length} events logged in current session
                </p>
            </div>
        </GlassPanel>
    );
};