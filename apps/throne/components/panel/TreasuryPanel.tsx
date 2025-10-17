//apps/throne/components/panels/TreasuryPanel.tsx
import { GlassPanel } from "@/components/ui/GlassPanel";
import { BudgetBar } from "@/components/ui/BudgetBar";

export function TreasuryPanel() {
    // Hardcoded data (will connect to Supabase later)
    const totalTreasury = 84250;
    const budgetAllocations = [
        {label: 'Marketing', amount: 37913, percentage: 45, color: 'amber' as const},
        {label: 'R&D', amount: 21063, percentage: 25, color: 'cyan' as const},
        {label: 'Infrastructure', amount: 25275, percentage: 30, color: 'emerald' as const},
    ];

    return (
        <GlassPanel className="border-throne-emerald-500/30">
            {/* Header */}
            <div className="mb-6">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-throne-emerald-400 mb-2">
                  Treasury Health
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-gray-500 text-sm">
                  Resource allocation and financial overview
              </p>
            </div>
            
            {/* Total Treasury Display */}
            <div className="mb-8 text-center p-6 bg-throne-bg-secondary rounded-lg border border-throne-emerald-500/20">
                <p className="text-sm text-gray-400 mb-2 font-medium">Total Treasury</p>
                <p className="text-5xl font-[family-name:var(--font-display)] font-bold text-white mb-2">
                    ${totalTreasury.toLocaleString()}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-xs text-throne-emerald-400">
                    💰 Fully capitalized
                </p>
            </div>

            {/* Budget Allocation Bars */}
            <div className="space-y-6">
                <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Budget Allocation
                </h3>

                {budgetAllocations.map((budget) => (
                    <BudgetBar 
                      key={budget.label}
                      label={budget.label}
                      amount={budget.amount}
                      percentage={budget.percentage}
                      color={budget.color}
                    />
                ))}
            </div>
        </GlassPanel>
    )
};