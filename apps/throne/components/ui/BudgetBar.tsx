// apps/throne/components/ui/BudgetBar.tsx
'use client';


interface BudgetBarProps {
    label: string;
    amount: number;
    percentage: number;
    color: 'cyan' | 'amber' | 'emerald';
};

export function BudgetBar({ label, amount, percentage, color }: BudgetBarProps) {
    const colorClasses = {
        cyan: 'bg-throne-cyan-500',
        amber: 'bg-throne-amber-500',
        emerald: 'bg-throne-emerald-500',
    };

    const textColorClasses = {
        cyan: 'text-throne-cyan-400',
        amber: 'text-throne-amber-400',
        emerald: 'text-throne-emerald-400',
    };

    return (
        <div className="space-y-2">
          {/* Label and Amount */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300 font-medium">{label}</span>
            <span className={`font-display font-semibold ${textColorClasses[color]}`}>
                ${amount.toLocaleString()}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 bg-throne-bg-tertiary rounded-full overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 ${colorClasses[color]} rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* percentage */}
          <div className="flex justify-end">
            <span className="text-sm text-gray-500 transition-all duration-500">{percentage}%</span>
          </div>
        </div>
    )
}