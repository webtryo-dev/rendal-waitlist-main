import type { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="font-mono-brand text-[11px] font-medium uppercase tracking-[0.2em] text-secondary">
      {children}
    </div>
  );
}
