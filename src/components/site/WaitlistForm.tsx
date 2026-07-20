import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Check, Loader2 } from "lucide-react";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Enter your email")
  .max(255, "Email is too long")
  .email("That doesn't look like a valid email");

export function WaitlistForm({
  sourcePage,
  compact = false,
  id,
}: {
  sourcePage: string;
  compact?: boolean;
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setStatus("error");
      setMessage(parsed.error.issues[0]?.message ?? "Invalid email");
      return;
    }
    setStatus("loading");
    try {
      const { error } = await supabase
        .from("waitlist_signups")
        .insert({ email: parsed.data.toLowerCase(), source_page: sourcePage });
      if (error) {
        if (error.code === "23505") {
          setStatus("success");
          setMessage("You're already on the list — we'll be in touch.");
          return;
        }
        throw error;
      }
      setStatus("success");
      setEmail("");
      setMessage("You're on the list. We'll email you when Rendal is ready.");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Something went wrong. Try again in a moment.");
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className="panel flex items-center gap-3 rounded-xl px-5 py-4 text-sm text-foreground"
        role="status"
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary/15 text-secondary">
          <Check size={16} />
        </span>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={onSubmit}
      className={`flex w-full flex-col gap-2 ${compact ? "" : "sm:flex-row"}`}
      noValidate
    >
      <label className="sr-only" htmlFor={`${id ?? "waitlist"}-email`}>
        Email
      </label>
      <input
        id={`${id ?? "waitlist"}-email`}
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        placeholder="you@yourstore.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        className="w-full flex-1 rounded-md border border-input bg-card px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-secondary focus:ring-2 focus:ring-secondary/45"
        aria-invalid={status === "error"}
        aria-describedby={
          status === "error" && message ? `${id ?? "waitlist"}-email-error` : undefined
        }
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-accent inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Joining
          </>
        ) : (
          <>
            Join the waitlist <ArrowRight size={16} />
          </>
        )}
      </button>
      {status === "error" && message && (
        <div
          id={`${id ?? "waitlist"}-email-error`}
          className="mt-1 text-xs text-destructive sm:basis-full"
        >
          {message}
        </div>
      )}
    </form>
  );
}
