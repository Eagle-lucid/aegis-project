// apps/throne/app/page.tsx
import { GlassLayout } from "@/components/layouts/GlassLayout";
import { SentinelPanel } from "@/components/panel/SentinelPanel";
import { TreasuryPanel } from "@/components/panel/TreasuryPanel";
import { CommandPanel } from "@/components/panel/CommandPanel";
import { ChroniclePanel } from "@/components/panel/ChroniclePanel";

export default function ThronePage() {
    return (
      <div>
        <GlassLayout>
            {/* Sentinel */}
            <SentinelPanel />

            {/* Treasury + Command (Side by Side on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TreasuryPanel />
                <CommandPanel />
            </div>

            {/* Chronicle */}
            <ChroniclePanel />
        </GlassLayout>
      </div>
    )
}