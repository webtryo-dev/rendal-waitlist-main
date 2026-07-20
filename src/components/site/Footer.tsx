import { Link } from "@tanstack/react-router";
import { Twitter, Linkedin, Github } from "lucide-react";
import { LogoMark } from "./Logo";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3 sm:px-8">
        <div className="min-w-0">
          <LogoMark />
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            An AI co-founder that lives inside your Shopify admin. Approval-gated, model-agnostic.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="font-mono-brand text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Product
          </div>
          <Link to="/" className="text-foreground/80 transition-colors hover:text-foreground">
            Home
          </Link>
          <Link
            to="/pricing"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link to="/help" className="text-foreground/80 transition-colors hover:text-foreground">
            Help & FAQ
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <div className="font-mono-brand text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Legal
          </div>
          <Link
            to="/privacy"
            className="text-foreground/80 transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link to="/terms" className="text-foreground/80 transition-colors hover:text-foreground">
            Terms
          </Link>

          <div className="mt-5 flex items-center gap-2">
            {/* TODO: add real social URLs */}
            <a
              href="#"
              aria-label="Twitter"
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-secondary/60 hover:text-foreground"
            >
              <Twitter size={16} />
            </a>
            {/* TODO: add real social URLs */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-secondary/60 hover:text-foreground"
            >
              <Linkedin size={16} />
            </a>
            {/* TODO: add real social URLs */}
            <a
              href="#"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-secondary/60 hover:text-foreground"
            >
              <Github size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-8">
          <div>© 2026 Rendal. All rights reserved.</div>
          <div className="font-mono-brand">help@rendal.io</div>
        </div>
      </div>
    </footer>
  );
}
