# 🛠️ Throne Development Guide

> **For builders who extend, maintain, and evolve the throne room.**

This guide covers local development, code patterns, and how to add new features to Throne.

---

## 🚀 Local Development Setup

### Prerequisites

```bash
# Required versions
node --version  # v18.0.0 or higher
npm --version   # v9.0.0 or higher
```

### Initial Setup

1. **Clone and install**

```bash
git clone <your-repo-url>
cd aegis
npm install
```

2. **Environment configuration**

```bash
# Create apps/throne/.env.local
cp apps/throne/.env.example apps/throne/.env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

3. **Database setup**
   Run the SQL from `README.md` in your Supabase SQL Editor.

4. **Start development server**

```bash
npm run dev
# or
pnpm dev --filter throne
```

5. **Open Throne**
   Navigate to `http://localhost:3000`

---

## 📁 Code Organization

### File Structure Conventions

```
apps/throne/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (metadata, global setup)
│   ├── page.tsx            # Main throne room page
│   └── globals.css         # Global styles + Tailwind
│
├── components/             # React components
│   ├── layouts/            # Layout components
│   │   └── GlassLayout.tsx # Reusable glass container
│   │
│   ├── panels/             # Main throne panels
│   │   ├── TreasuryPanel.tsx
│   │   ├── CommandPanel.tsx
│   │   ├── ChroniclePanel.tsx
│   │   └── SentinelPanel.tsx
│   │
│   └── ui/                 # Reusable UI components
│       ├── BudgetBar.tsx
│       ├── ChronicleEntry.tsx
│       ├── InsightCard.tsx
│       └── GlassPanel.tsx
│
├── lib/                    # Utilities and hooks
│   ├── supabase.ts         # Supabase client
│   ├── useChronicle.ts     # Chronicle hook
│   └── utils.ts            # Helper functions
│
└── public/                 # Static assets
    └── logo.svg            # (to be added)
```

### Naming Conventions

**Files:**

- Components: `PascalCase.tsx` (e.g., `TreasuryPanel.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useChronicle.ts`)
- Utils: `camelCase.ts` (e.g., `utils.ts`)

**Components:**

- Panels: `[Name]Panel` (e.g., `TreasuryPanel`)
- UI elements: `[Function][Type]` (e.g., `BudgetBar`, `InsightCard`)

**Functions:**

- Event handlers: `handle[Action]` (e.g., `handleExecuteDecree`)
- Fetchers: `fetch[Resource]` (e.g., `fetchTreasury`)
- Utilities: `[verb][Noun]` (e.g., `formatCurrency`)

---

## 🎨 Code Style Guide

### TypeScript Patterns

**Props Interface:**

```typescript
interface BudgetBarProps {
  label: string;
  amount: number;
  total: number;
  color: "cyan" | "amber" | "emerald";
}

export default function BudgetBar({
  label,
  amount,
  total,
  color,
}: BudgetBarProps) {
  // Component logic
}
```

**State Typing:**

```typescript
const [treasury, setTreasury] = useState<Treasury | null>(null);
const [isProcessing, setIsProcessing] = useState<boolean>(false);
```

**Async Functions:**

```typescript
const executeDecree = async (): Promise<void> => {
  try {
    const { data, error } = await supabase.from('treasury').update(...)
    if (error) throw error
  } catch (error) {
    console.error('Decree execution failed:', error)
  }
}
```

### Component Structure

**Standard pattern:**

```typescript
'use client' // If using hooks/interactivity

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ComponentProps {
  // Props here
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks
  const [state, setState] = useState()

  // 2. Effects
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    }
  }, [])

  // 3. Handlers
  const handleAction = () => {
    // Logic
  }

  // 4. Render
  return (
    <motion.div>
      {/* JSX */}
    </motion.div>
  )
}
```

### Tailwind CSS Patterns

**Consistent spacing:**

```tsx
// Use consistent spacing scale: 2, 4, 6, 8, 12, 16, 24, 32
<div className="p-6 space-y-4">
  <div className="mb-8">...</div>
</div>
```

**Glassmorphism pattern:**

```tsx
className = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl";
```

**Responsive design:**

```tsx
// Mobile-first approach
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
```

---

## 🔧 Common Development Tasks

### Adding a New Panel

1. **Create the component**

```bash
touch apps/throne/components/panels/NewPanel.tsx
```

2. **Panel structure**

```typescript
'use client'

import GlassPanel from '../ui/GlassPanel'

export default function NewPanel() {
  return (
    <GlassPanel>
      <div className="space-y-4">
        <h2 className="text-2xl font-display font-bold text-white">
          Panel Title
        </h2>
        {/* Panel content */}
      </div>
    </GlassPanel>
  )
}
```

3. **Add to throne room**

```typescript
// In app/page.tsx
import NewPanel from '@/components/panels/NewPanel'

export default function Home() {
  return (
    <main>
      {/* Existing panels */}
      <NewPanel />
    </main>
  )
}
```

---

### Adding a New Command (Decree)

**Current implementation (hardcoded):**

```typescript
const executeDecree = async () => {
  const newMarketing = treasury.marketing * 0.85;
  const newRD = treasury.rd * 1.15;

  await supabase
    .from("treasury")
    .update({ marketing: newMarketing, rd: newRD })
    .eq("id", 1);
};
```

**Future pattern (extensible):**

1. **Create decree definition**

```typescript
// lib/decrees/reallocateFunds.ts
export const reallocateFundsDecree = {
  id: "reallocate-funds",
  title: "Reallocate Funds",
  description: "Move 15% from Marketing to R&D",
  execute: async (treasury: Treasury) => {
    return {
      marketing: treasury.marketing * 0.85,
      rd: treasury.rd * 1.15,
    };
  },
};
```

2. **Create decree registry**

```typescript
// lib/decrees/index.ts
import { reallocateFundsDecree } from "./reallocateFunds";

export const DECREES = {
  REALLOCATE_FUNDS: reallocateFundsDecree,
  // Add more decrees here
};
```

3. **Use in CommandPanel**

```typescript
import { DECREES } from "@/lib/decrees";

const executeDecree = async () => {
  const updates = await DECREES.REALLOCATE_FUNDS.execute(treasury);
  await supabase.from("treasury").update(updates).eq("id", 1);
};
```

---

### Adding Real-time Subscriptions

**Pattern for new tables:**

```typescript
useEffect(() => {
  const channel = supabase
    .channel("your-table-changes")
    .on(
      "postgres_changes",
      {
        event: "*", // or 'INSERT', 'UPDATE', 'DELETE'
        schema: "public",
        table: "your_table",
      },
      (payload) => {
        console.log("Change received:", payload);
        // Update state
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
```

---

### Adding Chronicle Events

**Using the useChronicle hook:**

```typescript
import { useChronicle } from "@/lib/useChronicle";

function YourComponent() {
  const { log } = useChronicle();

  const handleAction = () => {
    // Your logic
    log("Action completed successfully");
  };
}
```

**Chronicle event types:**

```typescript
// Standard events
log("Strategic decree initiated");
log("Treasury reallocation complete");
log("Sentinel alert acknowledged");

// Use sovereign language, not technical jargon
log("Command executed"); // ✅ Good
log("Function called"); // ❌ Too technical
```

---

## 🎨 Design System

### Color Palette

```typescript
// Defined in tailwind.config.ts
const colors = {
  cyan: {
    500: "#06b6d4", // Primary actions, opportunities
  },
  amber: {
    500: "#f59e0b", // Warnings, alerts
  },
  emerald: {
    500: "#10b981", // Success, growth
  },
  slate: {
    900: "#0f172a", // Dark backgrounds
  },
};
```

### Typography

```typescript
// Font families (layout.tsx)
font-sans   // Inter - body text
font-display // Cinzel - headings, sovereign tone

// Usage
<h1 className="font-display">Throne Room</h1>
<p className="font-sans">Body text here</p>
```

### Spacing Scale

```typescript
// Consistent spacing
2  → 0.5rem → 8px   // Tight spacing
4  → 1rem   → 16px  // Standard spacing
6  → 1.5rem → 24px  // Panel padding
8  → 2rem   → 32px  // Section spacing
12 → 3rem   → 48px  // Large gaps
```

---

## 🧪 Testing Workflow

### Manual Testing Checklist

**Before committing:**

- [ ] All panels render without errors
- [ ] Decree execution works end-to-end
- [ ] Real-time updates trigger correctly
- [ ] Chronicle logs events properly
- [ ] Animations are smooth (no jank)
- [ ] Mobile view works (DevTools responsive mode)
- [ ] No console errors or warnings
- [ ] TypeScript compiles without errors

**Test commands:**

```bash
# Type check
npm run build

# Lint
npm run lint

# Check for console.logs
grep -r "console.log" apps/throne/components
```

### Browser Testing

**DevTools checklist:**

1. Open DevTools (F12)
2. Check Console (no errors)
3. Check Network (Supabase calls succeed)
4. Check Performance (60fps animations)
5. Test mobile view (responsive breakpoints)

---

## 🐛 Debugging Guide

### Common Issues

**1. Real-time updates not working**

```typescript
// Check: Is real-time enabled in Supabase?
ALTER PUBLICATION supabase_realtime ADD TABLE treasury;

// Check: Is subscription cleanup working?
useEffect(() => {
  const channel = supabase.channel('...')
  // ...
  return () => supabase.removeChannel(channel) // Must cleanup
}, [])
```

**2. Decree button stays in processing state**

```typescript
// Add error handling
try {
  setIsProcessing(true);
  await executeDecree();
} catch (error) {
  console.error(error);
} finally {
  setIsProcessing(false); // Always reset
}
```

**3. TypeScript errors in Supabase queries**

```typescript
// Define types for database tables
interface Treasury {
  id: number;
  total: number;
  marketing: number;
  rd: number;
  infrastructure: number;
  updated_at: string;
}

const { data } = (await supabase.from("treasury").select("*").single()) as {
  data: Treasury | null;
};
```

**4. Animations janky/slow**

```typescript
// Use GPU-accelerated properties only
✅ transform, opacity, filter
❌ width, height, margin, padding

// Good
<motion.div animate={{ x: 100, opacity: 1 }} />

// Bad
<motion.div animate={{ marginLeft: 100 }} />
```

---

## 🔄 Git Workflow

### Branch Strategy

```bash
# Main branches
main         # Production-ready code
dev          # Development branch (your current branch)

# Feature branches (future)
feature/multi-decree
feature/sentinel-ai
fix/chronicle-scroll
```

### Commit Message Format

```bash
# Pattern: type(scope): description

# Types
feat     # New feature
fix      # Bug fix
polish   # UI/UX improvements
refactor # Code restructuring
docs     # Documentation
test     # Testing
chore    # Maintenance

# Examples
git commit -m "feat(commands): add multiple decree support"
git commit -m "fix(treasury): prevent negative values"
git commit -m "polish(chronicle): improve scroll animation"
git commit -m "docs(readme): add deployment section"
```

### Daily Workflow

```bash
# Start of day
git pull origin dev

# Work on features
git add .
git commit -m "feat(panel): add new insights panel"

# End of day
git push origin dev
```

---

## 📦 Dependencies Management

### Adding New Dependencies

```bash
# Navigate to throne app
cd apps/throne

# Add dependency
npm install package-name

# Add dev dependency
npm install -D package-name

# Update package.json
npm install
```

### Current Dependencies

**Core:**

- next: ^15.0.0
- react: ^19.0.0
- typescript: ^5.0.0

**UI/Animation:**

- tailwindcss: ^3.4.0
- framer-motion: ^11.0.0

**Data:**

- @supabase/supabase-js: ^2.39.0
- zustand: ^4.5.0

### Updating Dependencies

```bash
# Check outdated
npm outdated

# Update specific package
npm update package-name

# Update all (carefully)
npm update
```

---

## 🚀 Build & Deploy

### Local Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables

**Required for production:**

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
```

**Never commit:**

- `.env.local`
- `.env.production`
- Any file with secrets

---

## 📚 Learning Resources

### Key Technologies

**Next.js 15:**

- [App Router Documentation](https://nextjs.org/docs/app)
- [Server vs Client Components](https://nextjs.org/docs/app/building-your-application/rendering)

**Supabase:**

- [Real-time Documentation](https://supabase.com/docs/guides/realtime)
- [JavaScript Client](https://supabase.com/docs/reference/javascript)

**Framer Motion:**

- [Animation Guide](https://www.framer.com/motion/)
- [Examples](https://www.framer.com/motion/examples/)

**Tailwind CSS:**

- [Documentation](https://tailwindcss.com/docs)
- [Glassmorphism Generator](https://ui.glass/generator/)

---

## 🎯 Best Practices

### Performance

1. **Minimize re-renders**

```typescript
// Use useMemo for expensive calculations
const percentage = useMemo(() => (amount / total) * 100, [amount, total]);
```

2. **Cleanup subscriptions**

```typescript
// Always cleanup in useEffect
return () => supabase.removeChannel(channel);
```

3. **Optimize images**

```typescript
// Use Next.js Image component
import Image from 'next/image'
<Image src="/logo.svg" width={40} height={40} alt="Aegis" />
```

### Security

1. **Never expose secrets**

```typescript
// ❌ Don't do this
const SECRET_KEY = "abc123";

// ✅ Use environment variables
const key = process.env.SECRET_KEY;
```

2. **Validate inputs**

```typescript
// Validate before Supabase queries
if (amount < 0) {
  throw new Error("Amount cannot be negative");
}
```

3. **Handle errors gracefully**

```typescript
try {
  await riskyOperation();
} catch (error) {
  console.error("Operation failed:", error);
  // Show user-friendly message
}
```

### Accessibility

1. **Semantic HTML**

```tsx
<button>Execute</button>  // ✅ Not <div onClick>
<nav>...</nav>            // ✅ Not <div className="nav">
```

2. **ARIA labels**

```tsx
<button aria-label="Execute strategic decree">Execute</button>
```

3. **Keyboard navigation**

```tsx
// Test: Can you navigate with Tab key?
// Test: Can you activate with Enter/Space?
```

---

## 🤝 Contributing Guidelines

### Code Review Checklist

**Before submitting:**

- [ ] Code follows style guide
- [ ] TypeScript types are correct
- [ ] No console.logs in production code
- [ ] Tested on mobile view
- [ ] No accessibility issues
- [ ] Commit messages are descriptive

### Pull Request Template (Future)

```markdown
## What does this PR do?

Brief description

## Screenshots

[If UI changes]

## Testing

How to test this change

## Checklist

- [ ] Tested locally
- [ ] TypeScript passes
- [ ] No console errors
- [ ] Mobile responsive
```

---

## 🆘 Getting Help

### Debug Checklist

1. Check browser console for errors
2. Check Network tab for failed requests
3. Check Supabase logs for database errors
4. Verify environment variables are set
5. Try clearing node_modules and reinstalling

### Common Solutions

**"Module not found"**

```bash
rm -rf node_modules package-lock.json
npm install
```

**"Supabase connection failed"**

- Check .env.local file exists
- Verify credentials are correct
- Check Supabase project is active

**"Build fails"**

```bash
npm run lint  # Check for errors
npm run build # See full error message
```

---

**Remember: You're not just writing code. You're building a throne.** 🦅👑

Every component, every function, every line—it should feel sovereign, not administrative.

Quality over speed. Clarity over cleverness. Command over chaos.
