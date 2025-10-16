//apps/throne/components/panels/CommandPanel.tsx
import { GlassPanel } from "@/components/ui/GlassPanel";

export function CommandPanel() {
    return (
        <GlassPanel className="border-throne-amber-500/30">
            <h2 className="text-xl font-bold text-throne-amber-400 mb-4">
                Command Console
            </h2>
            <p className="text-gray-400 text-sm">
                Decree button will appear here
            </p>
        </GlassPanel>
    )
}