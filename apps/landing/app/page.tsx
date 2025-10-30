
// apps/landing/app/page.tsx
import GlassNav from '@/components/ui/GlassNav';
import Hero from '@/components/sections/Hero';

export default function LandingPage() {
  return (
    <>
      <GlassNav />
      <Hero />

      {/* Placeholder sections for nav scroll */}
      <section 
        id="transformation" 
        className="min-h-screen flex items-center justify-center bg-[#0D1117]"
      >
        <h2 
          className="text-4xl font-bold text-white font-[family-name(--font-display)]"
        >
          Transformation
        </h2>
      </section>

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