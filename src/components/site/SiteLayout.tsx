import { useEffect, useRef, type ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { NeuralNoise } from "@/components/ui/neural-noise";

export function SiteLayout({ children }: { children: ReactNode }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React doesn't reliably mirror the `muted` prop onto the DOM node, and
    // mobile browsers (notably iOS Safari) block autoplay unless the element
    // is genuinely muted at play() time — so set it imperatively.
    video.muted = true;

    // Respect prefers-reduced-motion: hold the first frame instead of playing.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    // Some mobile browsers ignore the `autoPlay` attribute and only start
    // playback from a scripted play() call.
    const play = () => {
      void video.play().catch(() => {});
    };
    play();

    // Fallback loop: native `loop` can stutter or leave the last frame frozen,
    // so restart from the top whenever playback reaches the end.
    const handleEnded = () => {
      video.currentTime = 0;
      play();
    };
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
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
          preload="auto"
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
