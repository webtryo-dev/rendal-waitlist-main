import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section, SectionLabel } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { BackToHome } from "@/components/site/BackToHome";
import { GlowArc } from "@/components/site/GlowArc";
import { Mail } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & FAQ — Rendal" },
      {
        name: "description",
        content:
          "Answers to common questions about Rendal — Shopify plan compatibility, security, approvals, billing, and model availability.",
      },
      { property: "og:title", content: "Help & FAQ — Rendal" },
      {
        property: "og:description",
        content: "How Rendal works with your Shopify store, security, approvals, and billing.",
      },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  {
    q: "What is Rendal, exactly?",
    a: "Rendal is an AI co-founder that lives inside your Shopify admin as an embedded chat. You can ask it to do things — update a product, adjust inventory, tweak a discount, edit theme code — and it will propose the change as a reviewable card. Nothing hits your store until you approve it.",
  },
  {
    q: "Which Shopify plans does it work with?",
    a: "Rendal works with any paid Shopify plan that supports embedded admin apps — Basic, Shopify, Advanced, and Plus. It doesn't currently support the trial-only development stores. If you're on Shopify but unsure which plan you have, drop us a note.",
  },
  {
    q: "What does Rendal do with my store data?",
    a: "Rendal reads the store data you point it at (products, orders, inventory, theme code) to answer your questions and propose changes. It doesn't sell your data, doesn't train foundation models on it, and doesn't share it across merchants. A detailed privacy policy will ship alongside the app itself.",
  },
  {
    q: "How exactly does the approval step work?",
    a: "Anytime Rendal wants to write to your store, it shows you a compact diff: which record, which fields, what's changing, and why. You can approve it, edit the proposed change first, or discard it. Read-only requests (\"how many orders did we ship last week?\") don't need approval.",
  },
  {
    q: "What's a credit and how do I know when I'm running low?",
    a: "Credits are the unit of usage — every message and reply consumes some, and heavier models consume more. Your remaining balance is shown at the top of the chat, and you'll get an in-app warning as you approach your monthly limit.",
  },
  {
    q: "Which AI models can I actually pick from?",
    a: "Rendal supports Anthropic's Claude, OpenAI's GPT, and Google's Gemini families. Which specific models are available depends on your plan — Starter unlocks the standard tier, higher plans progressively unlock premium and flagship models.",
  },
  {
    q: "Can I use Rendal on multiple stores?",
    a: "Yes. Each store is billed on its own plan, but you can switch between them from the same account and keep skills/instruction files scoped per store.",
  },
  {
    q: "Does it replace my staff?",
    a: "No. Rendal is a co-founder-shaped assistant, not autopilot. The approval step exists specifically so a human is always the one committing changes to the store.",
  },
];

function HelpPage() {
  return (
    <SiteLayout>
      <Section className="pt-10 sm:pt-16">
        <BackToHome />
        <Reveal>
          <SectionLabel>Help</SectionLabel>
          <h1 className="mt-3 max-w-3xl text-[36px] font-display font-bold leading-[1.05] text-foreground sm:text-[52px]">
            Questions, answered.
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
            If you can&rsquo;t find what you need below, our team reads every email at{" "}
            <a
              href="mailto:help@rendal.io"
              className="text-secondary underline-offset-4 hover:underline"
            >
              help@rendal.io
            </a>
            .
          </p>
        </Reveal>
      </Section>

      <Section className="pb-8 pt-10">
        <Reveal>
          <div className="panel rounded-2xl p-2 sm:p-4">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-b border-border last:border-b-0"
                >
                  <AccordionTrigger className="px-4 py-5 text-left font-display text-[15px] text-foreground hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-5 text-[14.5px] leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </Section>

      <GlowArc className="my-8" />

      <Section className="py-16">
        <Reveal>
          <div className="panel flex flex-col gap-6 rounded-2xl p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <SectionLabel>Contact us</SectionLabel>
              <h2 className="mt-3 font-display text-[24px] font-bold text-foreground sm:text-[30px]">
                Something else on your mind?
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                A real person on the Rendal team will get back to you — usually within a business
                day.
              </p>
            </div>
            <a
              href="mailto:help@rendal.io"
              className="btn-cta inline-flex items-center justify-center gap-2 self-start rounded-md px-5 py-3 text-sm font-semibold sm:self-auto"
            >
              <Mail size={16} /> help@rendal.io
            </a>
          </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}
