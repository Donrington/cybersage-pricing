'use client';

import { useEffect, useState } from 'react';
import { Preloader } from '@/components/Preloader';
import { CustomCursor } from '@/components/CustomCursor';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { MarqueeStrip } from '@/components/MarqueeStrip';
import { PricingSection } from '@/components/PricingSection';
import { ProcessSection } from '@/components/ProcessSection';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';

export default function PricingPage() {
  const [loaded, setLoaded] = useState(false);
  const [currency, setCurrency] = useState<'ngn' | 'usd'>('ngn');

  // Scroll progress bar
  useEffect(() => {
    if (!loaded) return;
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      bar.style.width = `${scrolled * 100}%`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loaded]);

  // Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;
    let lenis: import('lenis').default | null = null;
    let rafId = 0;

    const initLenis = async () => {
      const { default: Lenis } = await import('lenis');
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });

      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    initLenis().catch(console.warn);

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, [loaded]);

  return (
    <>
      <CustomCursor />
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navbar />

        <main>
          <HeroSection currency={currency} onToggle={setCurrency} />
          <MarqueeStrip />
          <PricingSection currency={currency} />
          <ProcessSection />
        </main>

        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
