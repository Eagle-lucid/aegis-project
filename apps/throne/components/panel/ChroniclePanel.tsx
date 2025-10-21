//apps/throne/components/panels/ChroniclePanel.tsx
'use client';

import { GlassPanel } from "@/components/ui/GlassPanel";
import { ChronicleEntry } from "@/components/ui/ChronicleEntry";
import { useChronicle } from "@/lib/useChronicle";
import { useEffect, useRef } from "react";

export function ChroniclePanel() {
    const entries = useChronicle((state) => state.entries);
    const initializeEntries = useChronicle((state) => state.initializeEntries)
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize entries on client mount (Prevents hydration mismatch)
    useEffect(() => {
       if (entries.length === 0) {
        initializeEntries()
       }
    }, [entries.length, initializeEntries]);

    // Auto-scroll to bottom when new entry is added
    useEffect(() => {
       if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
       }
    }, [entries]);


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
            <div 
              ref={scrollRef}
              className="space-y-1 max-h-64 overflow-y-auto scroll-smooth">
                {entries.length === 0 ? (
                    <p className="font-[family-name:var(--font-inter)] text-gray-500 text-sm text-center py-8">
                        Initializing chronicle...
                    </p>
                ) : (
                   entries.map((entry) => (
                    <ChronicleEntry
                      key={entry.id}
                      type={entry.type}
                      message={entry.message}
                      timestamp={entry.timestamp}
                    />  
                   ))
                )}
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