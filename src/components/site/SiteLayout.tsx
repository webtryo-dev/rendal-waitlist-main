import { useEffect, useRef, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { NeuralNoise } from "@/components/ui/neural-noise";

export function SiteLayout({ children }: { children: ReactNode }) {
  // Respect prefers-reduced-motion: keep the background video on its first
  // frame instead of playing.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <div className="relative isolate flex min-h-screen flex-col bg-background text-foreground">
      {/* Site-wide backdrop: video + scrim + pointer-reactive glow, fixed to
          the viewport so every page and section sits over it. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover opacity-40"
          src="/videobg.mp4"
          autoPlay
          muted
          loop
          playsInline
          tabIndex={-1}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/85" />
        <NeuralNoise className="opacity-55 mix-blend-screen" />
      </div>

      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
