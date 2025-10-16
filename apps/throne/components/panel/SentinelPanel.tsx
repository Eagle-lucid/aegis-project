// apps/throne/components/panels/SentinelPanel.tsx
import { GlassPanel } from "@/components/ui/GlassPanel";

export function SentinelPanel() {
    return (
        <GlassPanel className="border-throne-cyan-500/30">
            <h2 className="text-xl font-bold text-throne-cyan-400 mb-4">
                The Sentinel&apos;s Counsel
            </h2>
            <p className="text-gray-400 text-sm">
                AI insights and risk alerts will appear here
            </p>
        </GlassPanel>
    )
}