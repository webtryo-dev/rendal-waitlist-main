import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Section, SectionLabel } from "@/components/site/Section";
import { Reveal } from "@/components/site/Reveal";
import { BackToHome } from "@/components/site/BackToHome";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Rendal" },
      {
        name: "description",
        content:
          "Terms for using the Rendal marketing site — waitlist signups, acceptable use, and disclaimers. Separate terms will apply to the Shopify app itself.",
      },
      { property: "og:title", content: "Terms of Service — Rendal" },
      {
        property: "og:description",
        content: "Draft terms for the marketing site — will be replaced before public launch.",
      },
      { name: "robots", content: "noindex,follow" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <Section className="pt-10 pb-16 sm:pt-16">
        <BackToHome />
        <Reveal>
          <SectionLabel>Legal</SectionLabel>
          <h1 className="mt-3 text-[34px] font-display font-bold leading-tight text-foreground sm:text-[46px]">
            Terms of Service
          </h1>
          <p className="mt-3 font-mono-brand text-xs text-muted-foreground">
            Last updated: July 19, 2026
          </p>
        </Reveal>

        <Reveal delay={60}>
          <div className="mt-10 max-w-3xl space-y-10 text-[15px] leading-relaxed text-muted-foreground">
            <Doc heading="1. About these terms">
              These terms apply to your use of the Rendal marketing website. They do <em>not</em>{" "}
              cover the Rendal Shopify application, which is not yet publicly available — a
              separate, more detailed agreement will apply when the Shopify app is live.
            </Doc>
            <Doc heading="2. Waitlist signups">
              By submitting your email through the waitlist, you agree to let us contact you about
              Rendal&rsquo;s early-access launch and closely related product updates. You can ask us
              to remove your email at any time.
            </Doc>
            <Doc heading="3. Acceptable use">
              Don&rsquo;t use this site to disrupt it — no automated scraping at abusive rates, no
              attempts to break through our security, no submitting emails you don&rsquo;t own.
              Ordinary human browsing and signup is obviously fine.
            </Doc>
            <Doc heading="4. Intellectual property">
              The Rendal name, logo, copy, and site design are ours. You&rsquo;re welcome to link to
              this site. Everything else — reproducing content, cloning the design, using the Rendal
              name commercially — requires our written permission.
            </Doc>
            <Doc heading="5. Disclaimers">
              This site is provided &ldquo;as is.&rdquo; We describe an upcoming product, and
              product details (pricing, features, model availability) may change before launch.
              Nothing on this site is a binding offer to provide the Rendal Shopify app on any
              particular terms.
            </Doc>
            <Doc heading="6. Limitation of liability">
              To the fullest extent permitted by law, Rendal is not liable for indirect, incidental,
              or consequential damages arising from your use of this website.
            </Doc>
            <Doc heading="7. Changes">
              We may update these terms as the product evolves. Material changes will be reflected
              in the &ldquo;last updated&rdquo; date above.
            </Doc>
            <Doc heading="8. Contact">
              Questions? Email{" "}
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
