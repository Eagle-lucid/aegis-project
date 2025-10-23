# 🏛️ Throne Architecture

> **Technical deep-dive into how Throne transforms data chaos into sovereign command.**

This document explains the technical decisions, patterns, and architecture that power Project Aegis - Throne.

---

## 📐 System Overview

```
┌─────────────────────────────────────────────────────────┐
│                    User Interface                        │
│         (Next.js App Router + React Components)          │
└──────────────┬──────────────────────────┬────────────────┘
               │                          │
               ↓                          ↓
    ┌──────────────────┐      ┌──────────────────┐
    │  Zustand Store   │      │  Custom Hooks    │
    │ (Global State)   │      │  (useChronicle)  │
    └──────────────────┘      └──────────────────┘
               │                          │
               └──────────┬───────────────┘
                          ↓
              ┌───────────────────────┐
              │   Supabase Client     │
              │  (Real-time + REST)   │
              └───────────┬───────────┘
                          ↓
              ┌───────────────────────┐
              │   Supabase Backend    │
              │  (PostgreSQL + RT)    │
              └───────────────────────┘
```

---

## 🧩 Component Architecture

### Hierarchy & Responsibility

```
app/page.tsx (Throne Room Orchestrator)
├── TreasuryPanel (Financial State)
│   ├── GlassPanel (Container)
│   └── BudgetBar × 3 (Visualizations)
│
├── CommandPanel (Action Dispatcher)
│   └── GlassPanel (Container)
│
├── ChroniclePanel (Event Logger)
│   ├── GlassPanel (Container)
│   └── ChronicleEntry × N (Log Items)
│
└── SentinelPanel (Intelligence Display)
    ├── GlassPanel (Container)
    └── InsightCard × 2 (Insights)
```

### Component Design Patterns

#### 1. **Composition over Configuration**

```typescript
// Reusable glass container
<GlassPanel>
  <CustomContent />
</GlassPanel>

// Not: <GlassPanel type="treasury" config={{...}} />
```

**Why:** Flexibility without prop drilling. Each panel controls its own content.

#### 2. **Controlled Components with Local State**

```typescript
// CommandPanel manages its own execution state
const [isExecuted, setIsExecuted] = useState(false);
const [isProcessing, setIsProcessing] = useState(false);
```

**Why:** Clear ownership. State lives where it's used.

#### 3. **Custom Hooks for Cross-Cutting Concerns**

```typescript
// Chronicle logging abstraction
const { entries, log } = useChronicle();
```

**Why:** Reusable logic. Chronicle can be used anywhere.

---

## 🔄 Data Flow Architecture

### Real-time Treasury Updates

**The Flow:**

```
1. User clicks "Execute Strategic Decree"
2. CommandPanel calls Supabase UPDATE
3. Supabase updates treasury table
4. Real-time subscription fires
5. TreasuryPanel receives payload
6. React state updates
7. UI re-renders with animations
8. Chronicle logs the event
```

**The Code:**

```typescript
// Step 1-3: Command execution
const executeDecree = async () => {
  const { data } = await supabase
    .from("treasury")
    .update({
      marketing: currentMarketing * 0.85,
      rd: currentRD * 1.15,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
};

// Step 4-7: Real-time listener
useEffect(() => {
  const channel = supabase
    .channel("treasury-changes")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "treasury",
      },
      (payload) => {
        setTreasury(payload.new); // Triggers re-render
      }
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}, []);
```

---

## 🗄️ Database Schema

### Treasury Table

```sql
CREATE TABLE treasury (
  id INTEGER PRIMARY KEY,
  total DECIMAL NOT NULL,
  marketing DECIMAL NOT NULL,
  rd DECIMAL NOT NULL,
  infrastructure DECIMAL NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Design Decisions:**

1. **Single Row (id=1)**
   - **Why:** MVP supports one treasury
   - **Future:** Multi-row for multiple realms

2. **Decimal Types**
   - **Why:** Precise financial calculations
   - **Alternative considered:** INTEGER (cents) - rejected for readability

3. **No Foreign Keys (Yet)**
   - **Why:** MVP has no users/auth
   - **Future:** Link to organizations/users

4. **updated_at Timestamp**
   - **Why:** Track last modification
   - **Used for:** Audit trails, conflict resolution

---

## 🎨 State Management Strategy

### Why Zustand + React Hooks?

**Zustand for Global State:**

```typescript
// Decree execution status (needs to be global)
const useDecreeStore = create((set) => ({
  isExecuted: false,
  setExecuted: (value) => set({ isExecuted: value }),
}));
```

**Why Zustand:**

- ✅ Lightweight (1KB)
- ✅ No context providers
- ✅ Perfect for simple global flags
- ✅ TypeScript-friendly

**React Hooks for Local State:**

```typescript
// Treasury data (only TreasuryPanel needs it)
const [treasury, setTreasury] = useState(null);

// Processing animation (only CommandPanel needs it)
const [isProcessing, setIsProcessing] = useState(false);
```

**Why not Redux/Context for everything?**

- ❌ Overkill for MVP scope
- ❌ Unnecessary boilerplate
- ❌ Performance overhead for simple state

---

## 🔐 Security Considerations

### Current State (MVP)

**⚠️ RLS Disabled**

```sql
-- No Row Level Security policies
-- All data publicly readable/writable
```

**Why this is acceptable for MVP:**

- Single-user testing environment
- No sensitive production data
- Faster development iteration

**⚠️ Anon Key Exposed**

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

**Why this is acceptable:**

- Standard Supabase pattern for client-side
- RLS would protect data (not enabled yet)
- No authentication required for demo

### Production Roadmap

**Phase 1: Authentication**

```sql
-- Add user management
CREATE TABLE users (...)
ALTER TABLE treasury ADD COLUMN user_id UUID REFERENCES users(id)
```

**Phase 2: Row Level Security**

```sql
-- Users can only see their own treasuries
ALTER TABLE treasury ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own treasury"
ON treasury FOR SELECT
USING (auth.uid() = user_id);
```

**Phase 3: Action Authorization**

```sql
-- Only treasury owners can execute decrees
CREATE POLICY "Users update own treasury"
ON treasury FOR UPDATE
USING (auth.uid() = user_id);
```

---

## 🎭 Animation Architecture

### Framer Motion Integration

**Why Framer Motion?**

- ✅ Declarative animation syntax
- ✅ Layout animations (auto-calculated)
- ✅ Gesture support (hover, tap, drag)
- ✅ Exit animations

**Animation Patterns:**

#### 1. **Entrance Animations**

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <Panel />
</motion.div>
```

#### 2. **State-based Animations**

```typescript
<motion.button
  animate={{
    scale: isHovered ? 1.05 : 1,
    backgroundColor: isExecuted ? '#10b981' : '#06b6d4'
  }}
/>
```

#### 3. **Layout Animations**

```typescript
<motion.div layout>
  {entries.map(entry => (
    <ChronicleEntry key={entry.id} {...entry} />
  ))}
</motion.div>
```

**Performance Optimization:**

- All animations use `transform` and `opacity` (GPU-accelerated)
- No layout-shifting animations during scroll
- `will-change` CSS hint on animated elements

---

## 🔧 Build & Bundle Strategy

### Next.js App Router

**Why App Router (not Pages Router)?**

- ✅ Server Components by default
- ✅ Better data fetching patterns
- ✅ Layouts and nested routing
- ✅ Future-proof (Next.js direction)

**Current Usage:**

```
app/
├── layout.tsx    # Root layout (metadata, fonts)
└── page.tsx      # Client component (needs hooks)
```

**Future Expansion:**

```
app/
├── (auth)/       # Auth routes
├── dashboard/    # Multi-page dashboard
└── api/          # API routes for webhooks
```

### Code Splitting

**Automatic (Next.js):**

- Each page is a separate bundle
- React components lazy-loaded by default

**Manual (Future):**

```typescript
const SentinelPanel = dynamic(() => import('./SentinelPanel'), {
  loading: () => <Skeleton />
})
```

---

## 🚀 Performance Optimizations

### Current Optimizations

1. **Real-time Subscription Management**

```typescript
// Cleanup on unmount to prevent memory leaks
useEffect(() => {
  const channel = supabase.channel("treasury");
  // ...
  return () => supabase.removeChannel(channel);
}, []);
```

2. **Tailwind CSS Purging**

```javascript
// tailwind.config.ts
content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"];
```

Only includes used classes in production bundle.

3. **Framer Motion Optimization**

```typescript
// Use transforms for smooth 60fps
animate={{ x: 100 }} // GPU-accelerated
// Not: animate={{ marginLeft: 100 }} // Layout recalc
```

### Performance Metrics (Lighthouse)

**Current Scores (MVP on dev hardware):**

- Accessibility: 90/100 ✅
- Best Practices: 96/100 ✅
- SEO: 100/100 ✅
- Performance: 52/100 (hardware-limited)

**Expected Production Scores:**

- Performance: 85-95/100 (on Vercel)

---

## 🧪 Testing Strategy

### Current Approach (Manual Testing)

**Testing Checklist:**

- ✅ Decree execution flow
- ✅ Real-time updates
- ✅ Button state management
- ✅ Chronicle logging
- ✅ Mobile responsiveness
- ✅ Animation smoothness

### Future Testing Roadmap

**Unit Tests (Vitest):**

```typescript
describe("BudgetBar", () => {
  it("calculates percentage correctly", () => {
    // Test logic
  });
});
```

**Integration Tests (Playwright):**

```typescript
test("decree execution updates treasury", async ({ page }) => {
  await page.click('[data-testid="execute-decree"]');
  await expect(page.locator(".treasury-total")).toContainText("...");
});
```

**E2E Tests (Cypress):**

```typescript
describe("Full Throne Flow", () => {
  it("user can execute decree and see results", () => {
    // End-to-end flow
  });
});
```

---

## 🔮 Technical Debt & Future Refactors

### Known Limitations (MVP Scope)

1. **No Error Boundaries**
   - **Impact:** Unhandled errors crash entire app
   - **Priority:** High (Phase 2)

2. **No Loading States for Supabase Calls**
   - **Impact:** Users don't see feedback during slow networks
   - **Priority:** Medium (Phase 2)

3. **Hardcoded Decree Logic**
   - **Impact:** Can't add new commands without code changes
   - **Priority:** High (Phase 3 - Command Builder)

4. **Session-based Chronicle (No Persistence)**
   - **Impact:** Events lost on refresh
   - **Priority:** Medium (Phase 2 - Chronicle DB table)

5. **Static Sentinel Insights**
   - **Impact:** No real intelligence yet
   - **Priority:** High (Phase 2 - AI Integration)

### Planned Refactors

**Phase 2:**

- Extract decree logic to `lib/decrees/`
- Add TypeScript types for all Supabase queries
- Implement error boundaries
- Add loading skeletons

**Phase 3:**

- Migrate Chronicle to database table
- Create decree command registry pattern
- Add decree history/undo functionality

---

## 📚 Key Technical Decisions

### Decision Log

| Decision      | Alternatives Considered        | Why We Chose This               |
| ------------- | ------------------------------ | ------------------------------- |
| Next.js 15    | Vite + React, Remix            | App Router + Vercel integration |
| Supabase      | Firebase, Planetscale          | Real-time + PostgreSQL          |
| Tailwind      | CSS Modules, Styled Components | Utility-first + rapid iteration |
| Framer Motion | React Spring, GSAP             | Declarative + React-first       |
| Zustand       | Redux, Context                 | Lightweight + simple            |
| TypeScript    | JavaScript                     | Type safety + better DX         |

---

## 🎯 Architecture Principles

1. **Composition over Inheritance**
   - Small, reusable components
   - Props and children for flexibility

2. **Colocation**
   - Components near where they're used
   - Hooks in `lib/` when shared

3. **Progressive Enhancement**
   - Works without JS (server-rendered)
   - Enhanced with real-time (if supported)

4. **Optimistic UI**
   - Assume success, rollback on error
   - Instant feedback, background sync

5. **Data Ownership**
   - Each component owns its state
   - Global only when necessary

---

**This architecture is designed for velocity first, scale second.**

The MVP prioritizes shipping and learning. As Throne evolves, the architecture will evolve with it—but the core principles remain: clarity, sovereignty, and command.

🦅👑
