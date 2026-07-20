import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section, SectionLabel } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { BackToHome } from "@/components/site/BackToHome";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Rendal" },
      {
        name: "description",
        content:
          "Four straightforward tiers for Rendal — the AI co-founder for Shopify. Included usage resets monthly, extra usage bills at the same rate. No surprise markup.",
      },
      { property: "og:title", content: "Pricing — Rendal" },
      {
        property: "og:description",
        content: "Starter, Growth, Scale, Founder. Same rate for included and extra usage.",
      },
    ],
  }),
  component: PricingPage,
});

type Tier = {
  name: string;
  price: string;
  tagline: string;
  models: string;
  usage: string;
  highlight?: boolean;
};

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$19.99",
    tagline: "Try Rendal on a single store.",
    models: "Standard models — Claude, GPT & Gemini",
    usage: "Full product, inventory & discount tools, plus a starter credit pool.",
  },
  {
    name: "Growth",
    price: "$49.99",
    tagline: "Switch models mid-conversation.",
    models: "Standard models + full switching across Claude, GPT, and Gemini",
    usage:
      "Shipping zones, the full discount suite & link fetching — enough credits for weekly use.",
    highlight: true,
  },
  {
    name: "Scale",
    price: "$149.99",
    tagline: "For teams running the store day to day.",
    models: "All Growth tools + premium models for heavier reasoning",
    usage: "AI image generation, analytics & customer export — roughly 3× the Growth pool.",
  },
  {
    name: "Founder",
    price: "$299.99",
    tagline: "Everything unlocked.",
    models: "All Scale tools + flagship models when you need them",
    usage: "Automated email, theme publishing & store settings — the largest included pool.",
  },
];

const faqs = [
  {
    q: "What happens if I use more than my plan includes?",
    a: "Nothing dramatic. Once your included usage runs out, additional usage is billed at the same rate as what's already in your plan — there's no premium markup and no surprise bill at the end of the month. You'll see it reflected on your next invoice.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes, any time. Upgrading takes effect immediately and prorates for the rest of the billing period. Downgrading takes effect at the start of your next cycle so you don't lose usage you've already paid for.",
  },
  {
    q: "What counts as usage?",
    a: "A message you send Rendal and the model's reply. Bigger models cost more per message than smaller ones — the model dropdown shows you which tier each model belongs to before you switch.",
  },
  {
    q: "Are approvals free?",
    a: "Yes. Approving, editing, or discarding a proposed change doesn't cost anything on its own — you only pay for the model calls that generated it.",
  },
];

function PricingPage() {
  return (
    <SiteLayout>
      {/* Header + glass tier cards over the aurora */}
      <div className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="aurora-blob-a left-[4%] top-[6%] h-96 w-96" />
          <div className="aurora-blob-b right-[2%] top-[38%] h-[28rem] w-[28rem]" />
        </div>

        <Section className="pt-10 sm:pt-16">
          <BackToHome />
          <Reveal>
            <div className="mx-auto mt-4 max-w-3xl text-center">
              <SectionLabel>Pricing</SectionLabel>
              <h1 className="mt-3 text-[36px] font-display font-bold leading-[1.05] text-foreground sm:text-[52px]">
                Straightforward tiers.{" "}
                <span className="text-secondary">Same rate above your plan.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] text-muted-foreground sm:text-[16px]">
                Included usage resets every month. If you go over, additional usage is billed at the
                same rate as what&rsquo;s already in your plan — never at a marked-up premium.
              </p>
            </div>
          </Reveal>
        </Section>

        <Section className="pb-10 pt-12 sm:pt-16">
          <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 80} className="h-full">
                <article
                  className={`glass-card lift relative flex h-full flex-col rounded-2xl p-6 ${
                    t.highlight
                      ? "ring-2 ring-secondary/45 xl:scale-[1.04] xl:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)]"
                      : ""
                  }`}
                >
                  {t.highlight && (
                    <div className="absolute -top-3 right-5 rounded-full bg-secondary px-2.5 py-0.5 font-mono-brand text-[10px] font-medium uppercase tracking-[0.14em] text-secondary-foreground">
                      Popular
                    </div>
                  )}
                  <div className="font-display text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-mono-brand text-4xl font-semibold text-foreground">
                      {t.price}
                    </span>
                    <span className="text-xs text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-3 text-[13.5px] text-muted-foreground">{t.tagline}</p>

                  <div
                    aria-hidden
                    className="mt-6 h-px w-full bg-[linear-gradient(90deg,transparent,oklch(1_0_0/0.14)_50%,transparent)]"
                  />

                  <ul className="mt-5 flex-1 space-y-2.5 text-[13.5px] text-foreground/90">
                    <li className="flex gap-2">
                      <Check size={14} className="mt-1 shrink-0 text-secondary" />
                      <span>{t.models}</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={14} className="mt-1 shrink-0 text-secondary" />
                      <span>{t.usage}</span>
                    </li>
                    <li className="flex gap-2">
                      <Check size={14} className="mt-1 shrink-0 text-secondary" />
                      <span>Extra usage at the same rate as included — no markup.</span>
                    </li>
                  </ul>

                  <Link
                    to="/"
                    hash="waitlist"
                    className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold ${
                      t.highlight
                        ? "btn-accent"
                        : "border border-border bg-card text-foreground transition-colors hover:bg-accent"
                    }`}
                  >
                    Get early access
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-center font-mono-brand text-[12px] text-muted-foreground">
            Prices in USD. Billed monthly. Cancel any time.
          </p>
        </Section>
      </div>

      <Section className="py-16 sm:py-20">
        <Reveal>
          <SectionLabel>Common questions</SectionLabel>
          <h2 className="mt-3 max-w-xl text-[28px] font-display font-bold leading-tight text-foreground sm:text-[36px]">
            Answered on this page so you don&rsquo;t have to click through.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`item-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-5 text-left font-display text-[15px] text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
