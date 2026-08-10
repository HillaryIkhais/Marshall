import { FileText, Gavel, AlertTriangle, CheckCircle, Scale } from "lucide-react";

const appealSections = [
  {
    title: "I. Statement of Claim",
    icon: FileText,
    content: `This formal appeal is submitted on behalf of Michael Vance (Member ID: HS-8842-9911-VC) regarding Health Shield PPO's denial of Claim CL-2026-07841 for spinal fusion surgery (CPT 22612) performed on March 15, 2026 at Stanford Spine Center. The insurer denied coverage on April 2, 2026, citing "Not Medically Necessary" and "Out of Network" as the stated reasons. The denied amount totals $47,832.00.`,
  },
  {
    title: "II. Statutory Violations & Insurer Bad Faith",
    icon: Gavel,
    content: `Health Shield PPO has violated multiple provisions of the California Insurance Code and Health & Safety Code in its handling of this claim. Specifically:
    \u2022 Cal. Ins. Code § 2695.7(b) — The insurer failed to issue a determination within 40 calendar days of receiving proof of claim, constituting an unfair claims settlement practice.
    \u2022 Cal. Ins. Code § 790.03(h) — The insurer knowingly misrepresented the network status of Stanford Spine Center, which appeared as in-network on their provider portal in January 2026.
    \u2022 Cal. Health & Safety Code § 1374.30 — The member is entitled to an Independent Medical Review, which was not offered or disclosed in the denial letter as required by law.`,
  },
  {
    title: "III. Citation Evidence",
    icon: AlertTriangle,
    content: `Evidence in support of this appeal includes:
    \u2022 Pre-authorization reference PA-44921, submitted by Dr. Elena Torres on February 28, 2026, with verbal approval confirmed.
    \u2022 Screenshot of Health Shield's provider portal dated January 15, 2026 showing Stanford Spine Center as in-network.
    \u2022 Medical records documenting four months of conservative treatment prior to the surgical recommendation.
    \u2022 Expert opinion from Dr. Elena Torres, board-certified spine surgeon at Stanford University Medical Center.`,
  },
  {
    title: "IV. Demand for Immediate Reversal",
    icon: CheckCircle,
    content: `Based on the foregoing statutory violations, misrepresentations of network status, and failure to adhere to timely claim adjudication requirements, the policyholder respectfully demands:
    1. Immediate reversal of the denial and full payment of $47,832.00 for Claim CL-2026-07841;
    2. Interest on the unpaid claim at the statutory rate from the date it became due;
    3. Written confirmation that Stanford Spine Center is recognized as an in-network provider for all future services.
    This appeal is submitted pursuant to the rights afforded under California Insurance Code § 2695.7 and California Health & Safety Code § 1374.30.`,
  },
];

export default function AppealDocument() {
  return (
    <section aria-labelledby="appeal-heading" className="animate-slide-up-fade" style={{ animationDelay: "200ms" }}>
      <h2 id="appeal-heading" className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
        AI-Generated Appeal Letter
      </h2>

      {/* Paper-textured official document */}
      <div className="relative paper-texture rounded-card shadow-paper border border-border overflow-hidden">
        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary" aria-hidden="true" />

        <div className="px-6 pt-7 pb-6 sm:px-8 sm:pt-9 sm:pb-8">
          {/* Official Header */}
          <div className="text-center pb-5 mb-6 border-b-2 border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-2" aria-hidden="true">
              <Scale className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Formal Appeal of Insurance Denial
            </h3>
            <p className="text-xs text-foreground-muted mt-2 font-sans">
              In the Matter of Claim CL-2026-07841 &bull; Prepared by MARSHALL AI Legal Synthesis
            </p>
            <p className="text-xs text-foreground-muted mt-0.5 font-sans">
              Powered by AI/ML API &bull; Bright Data Live Legal Scraper
            </p>
          </div>

          {/* Address Block */}
          <div className="mb-6 text-sm text-foreground leading-relaxed font-sans">
            <p className="font-semibold">To: Health Shield PPO — Appeals Department</p>
            <p className="text-foreground-muted">P.O. Box 7800, San Francisco, CA 94120</p>
            <p className="text-foreground-muted mt-2">Date: April 7, 2026</p>
            <p className="text-foreground-muted">Re: Formal Appeal — Claim CL-2026-07841</p>
            <p className="text-foreground-muted">Member: Michael Vance (HS-8842-9911-VC)</p>
          </div>

          {/* Salutation */}
          <p className="text-sm text-foreground mb-5 font-sans">
            To Whom It May Concern:
          </p>

          {/* Sections */}
          <div className="space-y-5">
            {appealSections.map((section) => {
              const Icon = section.icon;
              return (
                <div
                  key={section.title}
                  className="animate-paper-fade-in"
                  style={{ animationDelay: `${300 + appealSections.indexOf(section) * 120}ms` }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                    <h4 className="font-heading text-sm font-bold text-foreground">
                      {section.title}
                    </h4>
                  </div>
                  <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line pl-6 font-sans">
                    {section.content}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Signature Block */}
          <div className="mt-8 pt-5 border-t border-border">
            <p className="text-sm text-foreground font-sans">
              Respectfully submitted,
            </p>
            <p className="text-sm text-foreground mt-6 font-heading italic text-lg">
              Michael Vance
            </p>
            <p className="text-xs text-foreground-muted font-sans">
              Policyholder, Health Shield PPO &bull; Member ID: HS-8842-9911-VC
            </p>
            <p className="text-xs text-foreground-muted mt-4 font-sans">
              Enclosures: Pre-authorization PA-44921, Provider Portal Screenshot (Jan 15, 2026),
              Medical Records (Mar–Jul 2025)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
