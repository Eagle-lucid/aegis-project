// cspell:disable
//apps/throne/components/panels/CommandPanel.tsx
'use client';

import { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { treasuryOps } from "@/lib/supabase";
import { useChronicle } from "@/lib/useChronicle";

export function CommandPanel() {
    const addEntry = useChronicle((state) => state.addEntry);
    const [isProcessing, setIsProcessing] = useState(false);
    const [executed, setExecuted] = useState(false);
    const [canExecute, setCanExecute] = useState(true);
    const [clickAttempted, setClickAttemted] = useState(false);

    const handleCommand = async () => {
        if (!canExecute) {
            setClickAttemted(true)
            setTimeout(() => setClickAttemted(false), 2000)
            return
        }

        setIsProcessing(true)

        // Log: Decree initiated
        addEntry({
            type: 'sovereign',
            message: '$5,000  budget reallocation decree initiated. Executing command...',
        })

        try {
            // Execute the decree
            await treasuryOps.optimizeBudget()

            // Simulate processing time for effect
            await new Promise(resolve => setTimeout(resolve, 1500))

            // Log: Success
            addEntry({
                type: 'sentinel',
                message: 'Budget optimization decree executed successfully. Marketing: -$5,000 → R&D: +$5,000. Runway extended by 2 months.',
            })

            setExecuted(true)
            setCanExecute(false)

        } catch (error) {
            console.error('Decree execution failed:', error)

            // Log: Failure
            addEntry({
                type: 'system',
                message: 'Decree execution failed. Error logged for sovereign review.',
            })

            alert('Failed to excute decree. Check console.')
        } finally {
            setIsProcessing(false)
        }
    }
    return (
        <GlassPanel className="border-throne-amber-500/30">
            {/* Header */}
            <div className="mb-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-throne-amber-400 mb-4">
                    Command Console
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-gray-500 text-sm">
                    Issue sovereign decrees and strategic commands
                </p>
            </div>

            {/* Active Command Card */}
            <div className="mb-6 p-4 bg-throne-bg-secondary rounded-lg border border-throne-amber-500/20">
                <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                        <h3 className="font-[family-name:var(--font-display)] font-semibold text-white mb-1">
                            Budget Optimization
                        </h3>
                        <p className="font-[family-name:var(--font-inter)] text-sm text-gray-400">
                            Reallocate $5,000 from marketing surplus to R&D
                        </p>
                    </div>
                </div>

                {/* Impact Preview */}
                <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-gray-500">
                        <span>Expected Impact:</span>
                        <span className="text-throne-emerald-400">+2 months runway</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>Risk Level:</span>
                        <span className="text-throne-cyan-400">Low</span>
                    </div>
                </div>
            </div>

            {/* Decree Button */}
            <button
              onClick={handleCommand}
              className={`
                   w-full py-4 font-[family-name:var(--font-display)]
                   font-bold text-lg rounded-lg transition-all duration-300
                   ${executed ? 
                    'bg-throne-emerald-500 cursor-default' : isProcessing ?
                    'bg-throne-amber-500/50 cursor-not-allowed' :
                    !canExecute ?
                    'bg-gray-600 cursor-not-allowed' :
                    'bg-throne-amber-500 hover:bg-throne-amber-600 hover:shadow-2xl hover:shadow-throne-amber-500/40'
                   }
                   text-throne-bg-primary shadow-lg shadow-throne-amber-500/20
                   transform hover:scale-[1.02] active:scale-[0.98]
                   ${clickAttempted ? 'animate-shake border-4 border-red-500' : ''}
                   text-throne-bg-primary shadow-lg shadow-throne-amber-500/20
                `}
            >
                {executed ? (
                  <span className="flex items-center justify-center gap-2">
                    ✓ Decree Executed Successfully
                  </span>
                ) : isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚙️</span>
                    Processing Decree...
                  </span>
                ) : !canExecute ? (
                  <span className="flex items-center justify-center gap-2">
                    🚫 Decree Already Executed
                  </span>
                ) : (
                  'DECREE: OPTIMIZE BUDGET'
                )}
            </button>

            {/* Better feedback below button */}
            {(clickAttempted || (!canExecute && !isProcessing)) && (
              <p className="mt-2 text-xs text-center text-red-400">
                ⚠️ This decree has already been executed in this session
              </p>
            )}

            {/* Authorization Notice */}
            <p className="font-[family-name:var(--font-inter)] text-xs text-center text-gray-500 mt-4">
              🛡️ Command authorized under sovereign privilege
            </p>
            
        </GlassPanel>
    );
};