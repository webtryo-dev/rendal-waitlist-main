# Design

## Theme
Dark, single-theme site (`color-scheme: dark`, no light mode, no theme toggle). Void-black page ground with navy structural surfaces and one blue accent family. Direction: Stripe-like restraint — confident typography, generous whitespace, thin hairline borders, contrast reserved for the hero and the final CTA. The legacy pattern of wrapping every section in the same translucent `card-surface` glass card is being retired; surfaces should vary per section.

## Color

Brand tokens (defined in `src/styles.css` `:root`, mapped to utilities via `@theme inline`):

| Token | Value | Use |
|---|---|---|
| `--void` | `#0A0A0F` | Page background |
| `--navy` | `#0B1E3D` | Structural surface (cards, popovers) |
| `--navy-2` | `#0F2650` | Raised/hover surface |
| `--signal` | `#2D6CFF` | Primary action, accent — spend deliberately |
| `--glow` | `#5B8DFF` | Lighter accent: labels, icons, links |
| `--offwhite` | `#F5F6FA` | Foreground text |
| `--slate-muted` | `#8B93A7` | Secondary text |

Semantic mappings: `background=void`, `foreground=offwhite`, `card=navy`, `primary/accent/ring=signal`, `muted-foreground=slate-muted`, `border=rgba(91,141,255,0.14)` (hairline blue at 14% — the site's hairline color).

Rules: one accent family only (signal/glow); no additional hues. Blue glow/radial fills are an exception, not a default — currently overused (`hero-glow`, `glow-arc`, halo blobs) and being pared back.

## Typography
Loaded via Google Fonts in `src/routes/__root.tsx`:
- Display — **Space Grotesk** (500/600/700): headings (`h1–h4` via base layer), section labels, tier names. Utility: `font-display`. Headings carry `letter-spacing: -0.01em`.
- Body — **Inter** (400–700): default body (`--font-sans`).
- Data — **JetBrains Mono** (400–600): prices, data labels, mono chrome in the chat mockup. Utility: `font-mono-brand`.

Scale in use: hero `36px → 54px` (sm), section headings `28px → 38px`, body `15–16px`, secondary `13–14.5px`, labels `11px` uppercase tracked `0.16–0.22em`.

## Components
- `src/components/site/`: `Nav`, `Footer`, `SiteLayout` (page chrome); `Section` + `SectionLabel` (width-constrained section wrapper + uppercase kicker); `WaitlistForm` (zod-validated email capture into Supabase `waitlist_signups`); `ChatMockup` (static product proof: model switcher + approval diff card); `GlowArc` (glowing divider — being de-emphasized); `Reveal` (scroll-in animation, reduced-motion aware); `Logo`, `BackToHome`.
- `src/components/ui/`: shadcn/Radix set; `accordion.tsx` is the FAQ accordion (keep Radix — real ARIA + keyboard behavior).
- CSS utilities in `src/styles.css`: `card-surface` (translucent navy glass card — reduce usage), `btn-signal` (primary button, gradient + glow shadow), `hero-glow`, `glow-arc`, `.reveal`/`.hero-mockup-in` animation classes.

## Layout
- `Section` constrains content width and provides horizontal padding; pages are stacked `Section`s separated by generous vertical padding (`py-20 sm:py-28`).
- Radius scale from `--radius: 0.625rem` (`rounded-md` buttons/inputs through `rounded-2xl/3xl` feature surfaces).
- Pricing (`/pricing`) is moving from 4 identical glass cards to a hairline comparison table at desktop (feature rows × 4 tier columns, one recommended column differentiated), stacking to cards below tablet width.

## Motion
Small and fast: `.reveal` (16px rise + fade, ~380ms, custom cubic-bezier), hero mockup rise, button hover glow. Every animation class is disabled under `prefers-reduced-motion: reduce` (see the `@media` block at the bottom of `styles.css`) — any new motion must be added to that block or use the same pattern.

## Constraints (locked)
- Brand palette hexes above stay as the base; how they're applied may change.
- Typefaces (Space Grotesk / Inter / JetBrains Mono) are a brand decision — do not swap without approval.
- CTA copy is locked: "Join the waitlist" / "Get early access".
- Footer social links stay as `href="#"` TODO placeholders.
