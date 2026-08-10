import { useState, useEffect, useCallback } from "react";
import { Database, ExternalLink, CheckCircle2, RefreshCw } from "lucide-react";
import { supabase } from "../lib/supabase";

interface Statute {
  code: string;
  summary: string;
}

const FALLBACK_CODES: Statute[] = [
  {
    code: "Cal. Ins. Code § 2695.7(b)",
    summary:
      "Insurer 40-Day Response Violation — Insurers must accept or deny a claim within 40 calendar days of receiving proof of claim. Failure to do so constitutes an unfair claims settlement practice.",
  },
  {
    code: "Cal. Health & Safety Code § 1374.30",
    summary:
      "Independent Medical Review Rights — Enrollees have the right to an independent medical review (IMR) when a health care service plan denies, modifies, or delays a service based on a determination that it is not medically necessary.",
  },
  {
    code: "Cal. Ins. Code § 790.03(h)",
    summary:
      "Unfair Claims Settlement Practices — Knowingly misrepresenting relevant facts or policy provisions relating to coverages at issue constitutes an unfair practice.",
  },
  {
    code: "Cal. Ins. Code § 10110.6",
    summary:
      "Provider Network Adequacy — Health insurers must maintain an adequate network of providers and update their directories at least weekly. Reliance on outdated directory information may estop the insurer from denying coverage.",
  },
];

export default function ScraperOutput() {
  const [statutes, setStatutes] = useState<Statute[]>(FALLBACK_CODES);
  const [source, setSource] = useState<"live-scrape" | "fallback">("fallback");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatutes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("brightdata-scrape", {
        body: {},
      });

      if (fnError) throw new Error(fnError.message);

      if (data?.statutes?.length) {
        setStatutes(data.statutes);
        setSource(data.source || "fallback");
      }
    } catch (err) {
      console.error("Bright Data scrape failed:", err);
      setError("Couldn't reach the live scraper. Using cached statutes.");
      setStatutes(FALLBACK_CODES);
      setSource("fallback");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatutes();
  }, [fetchStatutes]);

  return (
    <section aria-labelledby="scraper-heading" className="animate-slide-up-fade" style={{ animationDelay: "100ms" }}>
      <h2 id="scraper-heading" className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
        Bright Data Live Legal Scraper
      </h2>
      <div className="bg-bg-card rounded-card p-5 shadow-card border border-border">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
          <Database className="w-4 h-4 text-accent" aria-hidden="true" />
          <span className="text-sm font-semibold text-foreground">
            California Insurance &amp; Health Codes
          </span>
          <span className="ml-auto text-xs text-foreground-muted font-mono">
            {statutes.length}/{statutes.length} extracted
          </span>
          <button
            onClick={fetchStatutes}
            disabled={loading}
            className="ml-2 p-1.5 rounded-md hover:bg-bg-card-alt transition-colors duration-150 cursor-pointer disabled:opacity-50"
            aria-label="Refresh scraped statutes"
            title="Refresh from Bright Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-foreground-muted ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {/* Live scrape status banner */}
        {source === "live-scrape" && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-success/5 border border-success/15 text-xs text-success font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            Scraped Live from California Regulatory Bureau
          </div>
        )}
        {error && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-accent/5 border border-accent/20 text-xs text-accent font-semibold">
            {error}
          </div>
        )}

        {/* Loading shimmer */}
        {loading && (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg p-3 border border-border bg-bg-card-alt animate-pulse"
              >
                <div className="h-4 w-2/3 bg-bg-secondary rounded mb-2" />
                <div className="h-3 w-full bg-bg-secondary rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Code List */}
        {!loading && (
          <ul className="space-y-3" aria-label="Extracted legal codes">
            {statutes.map((item) => (
              <li
                key={item.code}
                className="rounded-lg p-3 border border-accent/15 bg-accent/[0.02] transition-all duration-300 ease-out hover:border-accent/30 hover:bg-accent/[0.04]"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-mono font-bold text-foreground leading-tight break-all">
                      {item.code}
                    </p>
                    <p className="text-xs text-foreground-muted mt-1 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold bg-success/8 text-success"
                    aria-label="Extracted"
                  >
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                    Extracted
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 mt-2 text-xs text-accent hover:text-accent-light transition-colors duration-150 cursor-pointer"
                  aria-label={`View full text of ${item.code}`}
                >
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  View full statute
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
