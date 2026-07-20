# Product

## Register

brand

## Platform

web

## Users
Shopify merchants — from solo operators running one store to small teams managing a store day to day. They arrive pre-launch, evaluating whether an AI assistant that can *act* on their store (not just chat about it) is worth signing up for. Secondary audience: technically minded early adopters comparing AI-model access across tools.

## Product Purpose
This site is the public waitlist landing for Rendal, an AI co-founder that lives inside the Shopify admin as an embedded chat. Visitors should understand what Rendal does (one chat across Claude, GPT, and Gemini; real store actions gated by an approval step) and join the waitlist. Success is a waitlist signup — the app itself is not installable yet.

## Positioning
One chat, three model families, real store actions — and nothing saves without your approval.

## Conversion & proof
- Primary CTA: "Join the waitlist" (waitlist email form, hero and final CTA). Secondary: "Get early access" (nav button that scrolls to and focuses the same form).
- The line a visitor remembers after 10 seconds: "An AI co-founder that lives inside your Shopify admin."
- Belief ladder: (1) it lives inside the Shopify admin, not another tab; (2) one conversation can switch between Claude, GPT, and Gemini; (3) it can actually change the store — products, inventory, shipping, discounts, theme code; (4) every change waits in a review card until a human approves it; (5) pricing is straightforward, with extra usage at the same rate as included.
- Proof on hand: none yet (pre-launch). The `ChatMockup` component — a stylized admin chat showing a model switcher and an approve-change diff card — is the stand-in proof; it shows the product doing the thing the copy claims.

## Brand Personality
Precise, confident, calm. The voice of a competent operator, not a hype reel — copy is plainspoken ("Nothing dramatic.", "no drip campaigns, no marketing spam"). Visually the brand should feel like infrastructure a merchant can trust with write access to their store: Stripe-like restraint, typography doing most of the work, contrast spent deliberately.

## Anti-references
The templated dark-SaaS AI default: a near-black page where every section sits in the same translucent glassmorphism card with backdrop-blur, a single blue accent used for every glow and highlight, and radial glow blobs behind everything. Also avoid: hype gradients, sparkle-emoji AI branding, fake testimonials or invented social proof.

## Design Principles
1. Typography does the work — hierarchy comes from type scale, weight, and whitespace before it comes from containers.
2. Contrast is earned — the hero and the final CTA get the visual spend; middle sections stay quiet so those two land.
3. Hairlines, not glass — thin precise borders and flat surfaces over blur and glow; use the navy fills sparingly and deliberately.
4. Show, don't tell — the product mockup (chat, model switcher, approval diff) is the proof; keep it prominent and legible.
5. Restrained motion — small, fast, purposeful transitions that always respect `prefers-reduced-motion`.

## Accessibility & Inclusion
Target WCAG 2.1 AA. Specific commitments already in scope: `prefers-reduced-motion` honored for all animation (existing `.reveal` pattern), full keyboard operability (Radix accordion semantics, mobile menu focus management with Escape support), programmatic association of form errors (`aria-describedby` on the waitlist input), and visible focus indicators on interactive elements against the dark background.
