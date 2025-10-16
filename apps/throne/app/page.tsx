// apps/throne/app/page.tsx
import { GlassLayout } from "@/components/layouts/GlassLayout";
import { SentinelPanel } from "@/components/panels/SentinelPanel";
import { TreasuryPanel } from "@/components/panels/TreasuryPanel";
import { CommandPanel } from "@/components/panels/CommandPanel";
import { ChroniclePanel } from "@/components/panels/ChroniclePanel";

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