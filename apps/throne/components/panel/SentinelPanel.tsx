// apps/throne/components/panels/SentinelPanel.tsx
import { GlassPanel } from "@/components/ui/GlassPanel";
import { InsightCard } from "@/components/ui/InsightCard";

export function SentinelPanel() {
    return (
        <GlassPanel className="border-throne-cyan-500/30">
            {/* Header */}
            <div className='mb-6'>
                <h2 className="text-2xl font-[family-name:var(--font-display)] font-bold text-throne-cyan-400 mb-2">
                    The Sentinel&apos;s Counsel
                </h2>
                <p className="font-[family-name:var(--font-inter)] text-gray-500 text-sm">
                    AI-Powered insights and strategic recommendations
                </p>
            </div>
            {/* Insight Cards */}
            <div className="space-y-4">
                {/* Alert Insight */}
                <InsightCard
                  icon='⚠️'
                  title='Treasury Drain Rate Increased'
                  description='Treasury usage up 15% this month. Primary cause: Infrastructure costs rising faster than projected. Consider reviewing cloud spending and vendor contracts.'
                  severity='alert' 
                />

                {/* Opportunity Insight */}
                <InsightCard
                  icon="💎"
                  title="Budget Optimization Opportunity"
                  description="Marketing budget shows $5,000 surplus this quarter. Reallocating to R&D would align with Q3 strategic goals and extend runway by 2 months."
                  severity="opportunity"
                />
            </div>
        </GlassPanel>
    );
};