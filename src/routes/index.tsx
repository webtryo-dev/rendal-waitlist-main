import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section, SectionLabel } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { WaitlistForm } from "@/components/site/WaitlistForm";
import { ChatMockup } from "@/components/site/ChatMockup";
import { Logo } from "@/components/site/Logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, GitBranch, ShieldCheck, Command, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const features = [
  {
    icon: GitBranch,
    label: "One chat, three models",
    body: "Ask a question with Claude, then switch to GPT for a plan, then Gemini for a rewrite — all in the same conversation. Pick the right brain for the job without losing context.",
  },
  {
    icon: ShieldCheck,
    label: "Nothing saves without your nod",
    body: "Rendal can edit products, inventory, shipping, discounts, even theme code — but every change lands in a review card first. Approve it, tweak it, or throw it out.",
  },
  {
    icon: Command,
    label: "Your own skills, on demand",
    body: "Upload instruction files your team uses — restock playbooks, tone-of-voice guides, seasonal checklists — and trigger them by typing “/”. Rendal follows them like a teammate who read the docs.",
  },
] as const;

type Teaser = { name: string; price: string; note: string; highlight?: boolean };
const teasers: Teaser[] = [
  { name: "Starter", price: "$19.99", note: "For solo merchants trying it out." },
  {
    name: "Growth",
    price: "$49.99",
    note: "Full model switching across Claude, GPT, and Gemini.",
    highlight: true,
  },
  { name: "Scale", price: "$149.99", note: "Adds premium models for heavier work." },
  { name: "Founder", price: "$299.99", note: "Flagship models, highest included usage." },
];

// Most decision-relevant questions, copied verbatim from the existing
// faqs arrays in help.tsx and pricing.tsx.
const homeFaqs = [
  {
    q: "What is Rendal, exactly?",
    a: "Rendal is an AI co-founder that lives inside your Shopify admin as an embedded chat. You can ask it to do things — update a product, adjust inventory, tweak a discount, edit theme code — and it will propose the change as a reviewable card. Nothing hits your store until you approve it.",
  },
  {
    q: "How exactly does the approval step work?",
    a: "Anytime Rendal wants to write to your store, it shows you a compact diff: which record, which fields, what's changing, and why. You can approve it, edit the proposed change first, or discard it. Read-only requests (\"how many orders did we ship last week?\") don't need approval.",
  },
  {
    q: "Which AI models can I actually pick from?",
    a: "Rendal supports Anthropic's Claude, OpenAI's GPT, and Google's Gemini families. Which specific models are available depends on your plan — Starter unlocks the standard tier, higher plans progressively unlock premium and flagship models.",
  },
  {
    q: "What happens if I use more than my plan includes?",
    a: "Nothing dramatic. Once your included usage runs out, additional usage is billed at the same rate as what's already in your plan — there's no premium markup and no surprise bill at the end of the month. You'll see it reflected on your next invoice.",
  },
];

const modelStrip = ["Claude", "GPT", "Gemini"] as const;

function Index() {
  // If we arrive with #waitlist, smooth-scroll after mount and focus the
  // email input — matches the same-page behavior in Nav's scrollToWaitlist.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#waitlist") {
      requestAnimationFrame(() => {
        const el = document.getElementById("waitlist");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = el?.querySelector("input[type=email]") as HTMLInputElement | null;
        input?.focus({ preventScroll: true });
      });
    }
  }, []);

  return (
    <SiteLayout>
      <div className="relative">
        {/* HERO — centered, typography-led */}
        <Section className="relative pt-16 pb-10 text-center sm:pt-24">
          <div className="fade-up-in mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 font-mono-brand text-[11px] font-medium uppercase tracking-[0.18em] text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              Now taking early access
            </span>
          </div>

          <h1
            className="fade-up-in mx-auto mt-6 max-w-3xl text-[40px] font-display font-bold leading-[1.03] tracking-tighter text-foreground sm:text-[64px]"
            style={{ animationDelay: "60ms" }}
          >
            An AI co-founder that lives{" "}
            <span className="text-secondary">inside your Shopify admin</span>.
          </h1>

          <p
            className="fade-up-in mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-[17px]"
            style={{ animationDelay: "120ms" }}
          >
            Chat with Claude, GPT, and Gemini in one thread. Rendal can actually change your store —
            products, inventory, shipping, discounts, theme code — but every action waits for your
            approval before it saves.
          </p>

          <div
            id="waitlist"
            className="fade-up-in mx-auto mt-9 max-w-md scroll-mt-28"
            style={{ animationDelay: "180ms" }}
          >
            <WaitlistForm sourcePage="home_hero" id="waitlist-hero" />
            <div className="mt-2.5 text-xs text-muted-foreground">
              Early access only — the Shopify app isn&rsquo;t installable yet.
            </div>
          </div>
        </Section>

        {/* PRODUCT PREVIEW — the template's "app preview" slot */}
        <Section className="relative pb-20 sm:pb-24">
          <div className="hero-mockup-in mx-auto flex justify-center">
            <ChatMockup />
          </div>
        </Section>
      </div>

      {/* FEATURES — bento */}
      <Section className="py-20 sm:py-28">
        <Reveal>
          <SectionLabel>What Rendal does</SectionLabel>
          <h2 className="mt-3 max-w-2xl text-[30px] font-display font-bold leading-tight text-foreground sm:text-[40px]">
            Three things, done well.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Wide bento cell: the model-switching story */}
          <Reveal className="lg:col-span-2">
            <article className="panel lift h-full rounded-2xl p-7 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                {modelStrip.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 font-mono-brand text-[12px] text-foreground"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                    {m}
                  </span>
                ))}
              </div>
              <h3 className="mt-6 font-display text-[22px] font-semibold text-foreground">
                {features[0].label}
              </h3>
              <p className="mt-2.5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                {features[0].body}
              </p>
            </article>
          </Reveal>

          <Reveal delay={90}>
            <article className="panel lift h-full rounded-2xl p-7">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary/20 text-secondary">
                <ShieldCheck size={18} />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {features[1].label}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                {features[1].body}
              </p>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-3">
            <article className="panel lift rounded-2xl p-7 sm:p-8 lg:flex lg:items-center lg:gap-10">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary/20 text-secondary">
                <Command size={18} />
              </span>
              <div className="mt-5 lg:mt-0">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {features[2].label}
                </h3>
                <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-muted-foreground">
                  {features[2].body}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* PRICING TEASER — glass cards */}
      <section className="relative isolate overflow-hidden border-y border-border bg-accent/30 py-20 sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="aurora-blob-a left-[8%] top-[10%] h-80 w-80" />
          <div className="aurora-blob-b right-[6%] bottom-[0%] h-96 w-96" />
        </div>
        <Section className="relative">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <SectionLabel>Pricing</SectionLabel>
                <h2 className="mt-3 max-w-xl text-[30px] font-display font-bold leading-tight text-foreground sm:text-[40px]">
                  Straightforward tiers. No surprise markup.
                </h2>
              </div>
              <Link
                to="/pricing"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-foreground"
              >
                See full pricing <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teasers.map((t, i) => (
              <Reveal key={t.name} delay={i * 70}>
                <article
                  className={`glass-card lift relative h-full rounded-2xl p-5 ${
                    t.highlight ? "ring-2 ring-secondary/40" : ""
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute -top-3 left-5 rounded-full bg-secondary px-2.5 py-0.5 font-mono-brand text-[10px] font-medium uppercase tracking-[0.14em] text-secondary-foreground">
                      Popular
                    </div>
                  )}
                  <div className="font-display text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-mono-brand text-3xl font-semibold text-foreground">
                      {t.price}
                    </span>
                    <span className="text-xs text-muted-foreground">/mo</span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
                    {t.note}
                  </p>
                  <Link
                    to="/pricing"
                    className="mt-5 inline-flex items-center gap-1 text-[13px] font-medium text-secondary transition-colors hover:text-foreground"
                  >
                    See full pricing <ArrowRight size={12} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>
      </section>

      {/* FAQ */}
      <Section className="py-20 sm:py-28">
        <Reveal>
          <SectionLabel>Common questions</SectionLabel>
          <h2 className="mt-3 max-w-xl text-[30px] font-display font-bold leading-tight text-foreground sm:text-[40px]">
            Before you join.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {homeFaqs.map((f, i) => (
                <AccordionItem key={f.q} value={`home-faq-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-5 text-left font-display text-[15.5px] text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Link
              to="/help"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-foreground"
            >
              See all FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </Section>

      {/* FINAL CTA — the one deep-contrast moment */}
      <Section className="pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-espresso px-6 py-12 text-espresso-foreground sm:px-14 sm:py-16">
            <div className="relative grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
              <div>
                <div className="flex items-center gap-3">
                  <Logo size={28} />
                  <span className="font-mono-brand text-[11px] font-medium uppercase tracking-[0.2em] text-espresso-foreground/70">
                    Waitlist
                  </span>
                </div>
                <h2 className="mt-4 max-w-xl text-[28px] font-display font-bold leading-tight sm:text-[38px]">
                  Get Rendal the day it opens.
                </h2>
                <p className="mt-3 max-w-md text-sm text-espresso-foreground/70">
                  We&rsquo;ll email you when the Shopify app is live — no drip campaigns, no
                  marketing spam.
                </p>
                <ul className="mt-5 space-y-1.5 text-[13.5px] text-espresso-foreground/80">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-secondary" /> Claude, GPT, and Gemini in one
                    thread
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-secondary" /> Every change approval-gated
                  </li>
                </ul>
              </div>
              <div className="w-full max-w-md">
                <WaitlistForm sourcePage="home_footer_cta" id="waitlist-footer" />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
