import { Shield } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-bg-card border-b border-border shadow-sm">
      <div className="max-w-[1440px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo + Tagline */}
        <div className="flex items-center gap-3">
          <div className="animate-glow-pulse flex-shrink-0" aria-hidden="true">
            <Shield className="w-9 h-9 text-primary" fill="currentColor" fillOpacity={0.12} />
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">
              MARSHALL
            </h1>
            <p className="text-xs text-foreground-muted italic leading-relaxed max-w-xs">
              You shouldn&rsquo;t have to fight insurance companies alone. MARSHALL turns your story into a legal victory.
            </p>
          </div>
        </div>

        {/* Live Status Badge */}
        <div
          className="flex items-center gap-2 bg-bg-primary rounded-full px-4 py-2 border border-success/20"
          aria-live="polite"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
            <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
          </span>
          <span className="text-xs font-semibold text-success tracking-wide">
            Bright Data Live Legal Scraper: CONNECTED
          </span>
        </div>
      </div>
    </header>
  );
}
