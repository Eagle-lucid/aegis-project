// packages/ui/styles/glass.ts
export const glassClasses = {
    panel: `
      relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl
      border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
    `,

    nav: `
      fixed top-0 left-0 right-0 z-50 bg-black/20
      backdrop-blur-xl border-b border-white/10
    `,

    card: `
      rounded-xl bg-white/5 backdrop-blur-lg border
      border-white/10 hover:bg-white/10 transition-all duration-300
    `,

    input: `
      w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-xl 
      border border-white/20 text-white placeholder:text-white/50
      focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20
    `,
};

export const glowClasses = {
    emerald: 'shadow-[0_0_20px_rgba(16,185,129,0.3)]',
    cyan: 'shadow-[0_0_20px_rgba(6,182,212,0.3)]',
    amber: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
    violet: 'shadow-[0_0_20px_rgba(139,92,246,0.3)]',
};