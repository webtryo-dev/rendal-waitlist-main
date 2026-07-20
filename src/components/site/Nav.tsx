import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/pricing", label: "Pricing" },
  { to: "/help", label: "FAQ" },
] as const;

function scrollToWaitlist() {
  if (typeof document === "undefined") return false;
  const el = document.getElementById("waitlist");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = el.querySelector("input[type=email]") as HTMLInputElement | null;
    input?.focus({ preventScroll: true });
    return true;
  }
  return false;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpen = useRef(false);

  // Elevate the nav once the page scrolls: transparent over the hero video,
  // blurred surface with a border everywhere else.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus management: into the panel on open, back to the toggle on close.
  useEffect(() => {
    if (open) {
      firstLinkRef.current?.focus();
      wasOpen.current = true;
    } else if (wasOpen.current) {
      toggleRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  // Close on Escape while the panel is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className={`nav-in sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-border bg-background/80 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:grid-cols-3 sm:px-8">
        <div className="flex min-w-0 items-center">
          <Link to="/" className="flex items-center">
            <LogoMark />
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-8 text-sm text-muted-foreground sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link
            to="/"
            hash="waitlist"
            onClick={(e) => {
              if (
                typeof window !== "undefined" &&
                window.location.pathname === "/" &&
                scrollToWaitlist()
              ) {
                e.preventDefault();
              }
            }}
            className="btn-cta hidden rounded-md px-4 py-2 text-sm font-medium sm:inline-flex"
          >
            Get early access
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu-panel"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground sm:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu-panel" className="mobile-panel sm:hidden" data-open={open} inert={!open}>
        <div className="border-t border-border bg-transparent px-5 pb-5 pt-3">
          <nav className="flex flex-col gap-1 text-base">
            {links.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                ref={i === 0 ? firstLinkRef : undefined}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="waitlist"
              onClick={(e) => {
                setOpen(false);
                if (typeof window !== "undefined" && window.location.pathname === "/") {
                  setTimeout(scrollToWaitlist, 30);
                  e.preventDefault();
                }
              }}
              className="btn-cta mt-2 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium"
            >
              Get early access
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
