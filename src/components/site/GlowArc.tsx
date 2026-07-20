export function GlowArc({ className = "" }: { className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} aria-hidden>
      <div className="h-px w-full bg-border" />
    </div>
  );
}
