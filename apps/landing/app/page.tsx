
// apps/landing/app/page.tsx
import GlassNav from '@/components/ui/GlassNav';
import Hero from '@/components/sections/Hero';
import BeforeAfterBridge from '@/components/sections/BeforeAfterBridge';

export default function LandingPage() {
  return (
    <>
      <GlassNav />
      <Hero />
      <BeforeAfterBridge />

      {/* Placeholder sections for nav scroll */}

      <section 
        id="orbit" 
        className="min-h-screen flex items-center justify-center bg-black/5"
      >
        <h2 
          className="text-4xl font-bold text-white font-[family-name(--font-display)]"
        >
          Command Orbit
        </h2>
      </section>

      <section 
        id="insight" 
        className="min-h-screen flex items-center justify-center bg-black"
      >
        <h2 
          className="text-4xl font-bold text-white font-[family-name(--font-display)]"
        >
          Intelligence
        </h2>
      </section>
    </>
  );
}