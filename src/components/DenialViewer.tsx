import { FileWarning, AlertTriangle, Calendar, Building2, X } from "lucide-react";

const denialData = {
  insurer: "Health Shield PPO",
  date: "April 2, 2026",
  reference: "DEN-2026-09142-B",
  reason: "Not Medically Necessary / Out of Network",
  excerpt: `After careful review of the submitted documentation regarding the spinal fusion surgery (CPT 22612) for member Michael Vance, we have determined that this procedure does not meet our medical necessity criteria as defined in Section 4.2(a) of the Evidence of Coverage. Furthermore, the performing facility — Stanford Spine Center — was not listed as a contracted in-network provider at the time of service. Accordingly, the claim in the amount of $47,832.00 is denied in full.`,
};

interface DenialViewerProps {
  onClose?: () => void;
}

export default function DenialViewer({ onClose }: DenialViewerProps) {
  return (
    <section aria-labelledby="denial-heading" className="animate-slide-up-fade" style={{ animationDelay: "200ms" }}>
      <h2 id="denial-heading" className="text-xs font-semibold text-destructive uppercase tracking-widest mb-3">
        Insurer Denial Letter
      </h2>
      <div className="bg-bg-card rounded-card p-5 shadow-card border border-destructive/15">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-destructive/8 flex items-center justify-center">
              <FileWarning className="w-5 h-5 text-destructive" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground leading-tight">
                Insurer Denial Letter
              </h3>
              <p className="text-xs text-foreground-muted">{denialData.insurer}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-destructive/8 text-destructive">
              <AlertTriangle className="w-3 h-3" aria-hidden="true" />
              DENIED
            </span>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-button hover:bg-bg-card-alt text-foreground-muted hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close denial letter"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border">
          <div className="text-xs">
            <span className="block text-foreground-muted mb-0.5">
              <Calendar className="w-3 h-3 inline mr-1" aria-hidden="true" />
              Date
            </span>
            <span className="font-semibold text-foreground">{denialData.date}</span>
          </div>
          <div className="text-xs">
            <span className="block text-foreground-muted mb-0.5">
              <Building2 className="w-3 h-3 inline mr-1" aria-hidden="true" />
              Insurer
            </span>
            <span className="font-semibold text-foreground">{denialData.insurer}</span>
          </div>
          <div className="text-xs">
            <span className="block text-foreground-muted mb-0.5">Ref</span>
            <span className="font-mono font-semibold text-foreground text-[11px]">
              {denialData.reference}
            </span>
          </div>
        </div>

        {/* Denial Reason */}
        <div className="mb-3">
          <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
            Stated Reason for Denial
          </span>
          <p className="mt-1 text-sm font-semibold text-destructive">
            {denialData.reason}
          </p>
        </div>

        {/* Letter Excerpt */}
        <div className="bg-destructive/[0.03] rounded-lg p-3 border border-destructive/10">
          <span className="text-xs font-semibold text-foreground-muted uppercase tracking-wider">
            Letter Excerpt
          </span>
          <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed italic">
            &ldquo;{denialData.excerpt}&rdquo;
          </p>
        </div>

        {/* Claim Amount */}
        <div className="mt-4 flex items-center justify-between bg-destructive/[0.03] rounded-lg px-4 py-3 border border-destructive/10">
          <span className="text-sm text-foreground-muted">
            Claim Amount Denied
          </span>
          <span className="font-heading text-xl font-bold text-destructive">
            $47,832.00
          </span>
        </div>
      </div>
    </section>
  );
}
