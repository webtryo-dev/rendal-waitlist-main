import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function BackToHome() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft size={14} /> Back to home
    </Link>
  );
}
