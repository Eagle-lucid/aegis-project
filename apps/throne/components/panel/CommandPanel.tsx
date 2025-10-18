//apps/throne/components/panels/CommandPanel.tsx
'use client';

import { GlassPanel } from "@/components/ui/GlassPanel";
import { useState } from "react";

export function CommandPanel() {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCommand = () => {
        setIsProcessing(true);
        // Simulate command execution
        setTimeout(() => {
            setIsProcessing(false);
            // In Phase 3, this will trigger real actions
        }, 2000);
    };
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
              disabled={isProcessing}
              className={`
                   w-full py-4 font-[family-name:var(--font-display)]
                   font-bold text-lg rounded-lg transition-all duration-300
                   ${isProcessing ? 
                    'bg-throne-amber-500/50 cursor-not-allowed' :
                    'bg-throne-amber-500 hover:bg-throne-amber-600 hover:shadow-2xl hover:shadow-throne-amber-500/40'
                   }
                   text-throne-bg-primary shadow-lg shadow-throne-amber-500/20
                   transform hover:scale-[1.02] active:scale-[0.98]
                `}
            >
                {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⚙️</span>
                        Processing Decree...
                    </span>
                ): (
                    'DECREE: OPTIMIZE BUDGET'
                )}
            </button>

            {/* Authorization Notice */}
            <p className="font-[family-name:var(--font-inter)] text-xs text-center text-gray-500 mt-4">
              🛡️ Command authorized under sovereign privilege
            </p>
            
        </GlassPanel>
    )
}