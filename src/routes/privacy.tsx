import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section, SectionLabel } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { BackToHome } from "@/components/site/BackToHome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Rendal" },
      {
        name: "description",
        content:
          "How this Rendal marketing site handles email addresses, analytics, and cookies. A separate policy will apply once the Shopify app is live.",
      },
      { property: "og:title", content: "Privacy Policy — Rendal" },
      {
        property: "og:description",
        content: "Draft policy for the marketing site — will be replaced before public launch.",
      },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <Section className="pt-10 pb-16 sm:pt-16">
        <BackToHome />
        <Reveal>
          <SectionLabel>Legal</SectionLabel>
          <h1 className="mt-3 text-[34px] font-display font-bold leading-tight text-foreground sm:text-[46px]">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono-brand text-xs text-muted-foreground">
            Last updated: July 19, 2026
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="prose-brand mt-10 max-w-3xl space-y-10 text-[15px] leading-relaxed text-muted-foreground">
            <Doc heading="1. What this policy covers">
              This policy explains how the Rendal marketing website (this site) collects and uses
              information from visitors. It does <em>not</em> cover the Rendal Shopify application,
              which is not yet publicly available. A separate, more detailed privacy policy will
              apply once the Shopify app is live and handling store data.
            </Doc>
            <Doc heading="2. What we collect">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-foreground">Email addresses</strong> that visitors submit
                  through the waitlist form, along with the page on our site they submitted from.
                </li>
                <li>
                  <strong className="text-foreground">Basic usage analytics</strong> — page views,
                  referrer, browser type, approximate location — used to understand which parts of
                  the site are useful.
                </li>
                <li>
                  <strong className="text-foreground">Cookies</strong> for the analytics above and
                  to remember your preferences on this site.
                </li>
              </ul>
            </Doc>
            <Doc heading="3. How we use it">
              We use your email address only to contact you about Rendal — most importantly, to let
              you know when early access opens. We do not add you to unrelated marketing lists, and
              we don&rsquo;t sell or share your email address with third parties.
            </Doc>
            <Doc heading="4. Third-party services">
              This site is hosted through a standard cloud provider and uses a small number of
              third-party services (analytics, email delivery) that process data on our behalf under
              standard data-processing agreements.
            </Doc>
            <Doc heading="5. Your choices">
              You can ask us to delete your email from the waitlist at any time by emailing{" "}
              <a href="mailto:help@rendal.io" className="text-secondary hover:underline">
                help@rendal.io
              </a>
              . You can also block cookies in your browser — the site will keep working.
            </Doc>
            <Doc heading="6. Changes">
              We may update this policy as the product evolves. Material changes will be reflected
              in the &ldquo;last updated&rdquo; date above.
            </Doc>
            <Doc heading="7. Contact">
              Questions about this policy? Email{" "}
              <a href="mailto:help@rendal.io" className="text-secondary hover:underline">
                help@rendal.io
              </a>
              .
            </Doc>
          </div>
        </Reveal>
      </Section>
    </SiteLayout>
  );
}

function Doc({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[18px] font-semibold text-foreground">{heading}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
