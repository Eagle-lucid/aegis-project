//apps/throne/components/panels/TreasuryPanel.tsx
import { GlassPanel } from "@/components/ui/GlassPanel";

export function TreasuryPanel() {
    return (
        <GlassPanel className="border-throne-emerald-500/30">
            <h2 className="text-xl font-bold text-throne-emerald-400 mb-4">
                Treasury Health
            </h2>

            <p className="text-gray-400 text-sm">
                Resource allocation will appear here
            </p>
        </GlassPanel>
    )
};