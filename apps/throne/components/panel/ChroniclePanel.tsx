//apps/throne/components/panels/ChroniclePanel.tsx
import { GlassPanel } from "@/components/ui/GlassPanel";

export function ChroniclePanel() {
    return (
        <GlassPanel>
            <h2 className="text-xl font=bold text-white mb-4">
                The Realm Chronicle
            </h2>
            <p className="text-gray-400 text-sm">
               Activity log will appear here
            </p>
        </GlassPanel>
    )
}