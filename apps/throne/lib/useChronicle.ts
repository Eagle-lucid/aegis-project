// apps/throne/lib/useChronicle.ts
'use client';

import { create } from 'zustand';

export interface ChronicleEntry {
    id: string
    type: 'system' | 'sovereign' | 'sentinel'
    message: string
    timestamp: string
};

interface ChronicleStore {
    entries: ChronicleEntry[]
    addEntry: (entry: Omit<ChronicleEntry, 'id' | 'timestamp'>) => void
    clearEntries: () => void
    initializeEntries: () => void
};

export const useChronicle = create<ChronicleStore>((set) => ({
    // Initial entries (session start) 
    entries: [],

    initializeEntries: () => 
        set({
        entries: [
            {
                id: '1',
                type: 'system',
                message: 'User "Sovereign" assumed the throne. Session initialized with full privileges.',
                timestamp: new Date().toLocaleTimeString(),
              },
              {
                id: '2',
                type: 'sentinel',
                message: 'Counsel provided on treasury drain rate and budget optimization opportunity. Risk assessment: Medium priority.',
                timestamp: new Date().toLocaleTimeString(),
              },
        ]
    }),

    addEntry: (entry) =>
        set((state) => ({
            entries: [
                ...state.entries,
                {
                    ...entry,
                    id: Date.now().toString(),
                    timestamp: new Date().toLocaleTimeString(),
                },
            ],
        })),

        // CLear all entries
        clearEntries: () => set({ entries: [] }),
}));