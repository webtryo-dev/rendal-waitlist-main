export function Logo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/logo-rendal.png"
      width={size}
      height={size}
      alt="Rendal logo"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}

export function LogoMark({
  withWordmark = true,
  size = 30,
}: {
  withWordmark?: boolean;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Logo size={size} />
      {withWordmark && (
        <span className="font-display text-[17px] font-semibold tracking-tight text-foreground">
          Rendal
        </span>
      )}
    </span>
  );
}
