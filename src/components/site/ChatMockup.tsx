import { ChevronDown, Check, Sparkles, ShoppingBag } from "lucide-react";

export function ChatMockup() {
  return (
    <div
      className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_70px_-28px_rgba(0,0,0,0.25)]"
      role="img"
      aria-label="A stylized Shopify admin chat with Rendal, showing a model switcher and an approve-change action."
    >
      <div className="flex items-center justify-between border-b border-border bg-accent/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-foreground/15" />
          <div className="ml-3 hidden items-center gap-1.5 rounded-md bg-background px-2 py-1 font-mono-brand text-[11px] text-muted-foreground sm:flex">
            <ShoppingBag size={11} /> admin.shopify.com
            <span className="text-foreground/80"> / rendal</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-[12px] text-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
          <span className="font-mono-brand">Claude 4</span>
          <span className="hidden text-muted-foreground sm:inline">· GPT · Gemini</span>
          <ChevronDown size={13} className="text-muted-foreground" />
        </div>
      </div>

      <div className="space-y-4 px-4 py-5 sm:px-5 sm:py-6">
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-secondary/15 px-3.5 py-2.5 text-[13.5px] text-foreground">
            Bump the price of the &ldquo;Everyday Tote&rdquo; by 10% and add a &ldquo;summer&rdquo;
            tag to it.
          </div>
        </div>

        <div className="flex justify-start gap-3">
          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-secondary/15 text-secondary">
            <Sparkles size={13} />
          </span>
          <div className="max-w-[90%] space-y-3">
            <div className="rounded-2xl rounded-tl-sm bg-accent/70 px-3.5 py-2.5 text-[13.5px] text-foreground">
              I&rsquo;ll update <span className="font-medium">Everyday Tote</span> — new price and a
              new tag. Review the change below before I save it.
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-3 py-2 font-mono-brand text-[11px] text-muted-foreground">
                <span>proposed change · products</span>
                <span className="text-secondary">1 field · 1 tag</span>
              </div>
              <div className="divide-y divide-border text-[12.5px]">
                <div className="grid grid-cols-[80px_1fr] gap-3 px-3 py-2">
                  <div className="text-muted-foreground">price</div>
                  <div className="font-mono-brand">
                    <span className="text-muted-foreground line-through">$38.00</span>
                    <span className="mx-2 text-muted-foreground">→</span>
                    <span className="text-foreground">$41.80</span>
                  </div>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-3 px-3 py-2">
                  <div className="text-muted-foreground">tags</div>
                  <div>
                    <span className="rounded bg-secondary/20 px-1.5 py-0.5 font-mono-brand text-[11px] text-secondary">
                      + summer
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2 border-t border-border bg-accent/50 px-3 py-2.5">
                <span className="text-[11px] text-muted-foreground">
                  Nothing has been saved yet.
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    tabIndex={-1}
                    className="rounded-md border border-border bg-card px-2.5 py-1 text-[11.5px] text-foreground/80"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    tabIndex={-1}
                    className="btn-accent inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11.5px] font-medium"
                  >
                    <Check size={12} /> Approve change
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-[12.5px] text-muted-foreground">
          <span className="font-mono-brand text-secondary">/</span> ask Rendal or trigger a skill…
        </div>
      </div>
    </div>
  );
}
