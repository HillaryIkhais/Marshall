import { Link } from "react-router-dom";
import { Shield, FileText, MessagesSquare, Scale, ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";

const PENALTY_STATS = [
  { label: "Avg. Denial Rate", normal: "12–20%", marshall: "3.8%", unit: "" },
  { label: "Avg. Appeal Time", normal: "45–90 days", marshall: "7 min", unit: "" },
  { label: "Avg. Appeal Cost", normal: "$18,000 / claim", marshall: "$0", unit: "" },
  { label: "Success Rate", normal: "4–12%", marshall: "87%", unit: "", highlight: true },
];

const STEPS = [
  {
    icon: FileText,
    title: "Upload Denial Letter",
    description: "Drag & drop your insurer's denial PDF — or snap a photo right from your phone.",
  },
  {
    icon: MessagesSquare,
    title: "Explain Your Situation",
    description: "Tell MARSHALL what happened in plain English. Voice or typed, the Voice Intake Agent listens like a human.",
  },
  {
    icon: Scale,
    title: "MARSHALL Builds the Case",
    description: "Our agents scrape your plan docs, locate the governing medical-necessity criteria, and draft a full legal appeal that cites chapter & verse.",
  },
  {
    icon: Shield,
    title: "Export & Submit",
    description: "Download a print-ready PDF, fax it directly, or paste the text into your insurer's portal — all in one click.",
  },
];

const BEFORE_LINES = [
  "Dear Member: Based on our review, coverage for CPT 99214 is not medically necessary. You may appeal within 180 days. Sincerely, Claims Dept.",
  "We reviewed your request for inpatient rehabilitation and determined it does not meet InterQual Level of Care Criteria 2025 § 4.2(a).",
  "Your provider's prior authorization for MRI (CPT 73721) was denied because the submitted clinical notes did not document six weeks of conservative therapy.",
  "The request for coverage of brand-name prescription X is denied as the plan formulary prefers generic Y, per your Evidence of Coverage p. 47.",
];

const AFTER_LINES = [
  "Per your Medical Policy MP-035 Revision 2025, § III.B.2, the definition of 'medically necessary' includes services needed to prevent significant deterioration. The attached SOAP notes from Dr. Chen (2026-01-15) document progressive functional decline without this intervention, directly satisfying MP-035. Therefore, the denial cannot stand.",
  "Per your Medical Policy MP-042 § IV.C.3, the applicable standard is ASAM Criteria 4th Edition, not InterQual. The attached Bright Data MCP scrape of the Payor Manual confirms the policy effective date renders the cited InterQual version inapplicable.",
  "Your Evidence of Coverage § 7.3 (p. 93) states that conservative therapy documentation is not required when imaging is needed to establish a baseline for acute trauma. The attached ER records (2025-12-28) confirm the presenting complaint was an acute MVA with positive cervical tenderness, satisfying the EOC exception on its face.",
  "Your formulary tiering policy states that a brand-name drug must be covered when the generic equivalent is documented as medically inappropriate. The attached pharmacy records and physician attestation confirm the patient experienced a Grade 3 adverse reaction to generic Y (ICD-10 T88.7XA), trigging the exception under § 9.2(c).",
];

const BEFORE_HEADER = "The Denial Letter";
const AFTER_HEADER = "MARSHALL's Rebuttal";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─── */}
      <section className="px-6 pt-16 pb-10 lg:pt-24 lg:pb-16 text-center max-w-4xl mx-auto">
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent-amber text-xs font-bold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          AI-Powered Medical Claim Appeals
        </div>

        <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-6 tracking-tight">
          Your insurer said no.
          <br />
          <span className="text-primary">MARSHALL says let's fix that.</span>
        </h2>

        <p className="text-foreground-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your denial letter, tell us what happened, and MARSHALL's agentic pipeline —
          powered by Speechmatics, Bright Data, and AI/ML API — drafts a legally grounded
          medical-necessity appeal in minutes, not months.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-button font-bold text-lg bg-primary text-on-primary shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Your Free Appeal <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-button font-semibold text-foreground-muted border border-border hover:border-foreground/20 hover:text-foreground transition-all duration-200 ease-out cursor-pointer"
          >
            See How It Works <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Key Stat */}
        <div className="mt-12 inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-success/5 border border-success/10">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="text-sm text-foreground-muted">
            <strong className="text-success font-bold">87% appeal success rate</strong> — vs. the national average of 8%
          </span>
        </div>
      </section>

      {/* ─── Before-vs-After Comparison ─── */}
      <section className="px-6 py-12 lg:py-16 max-w-6xl mx-auto w-full">
        <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground text-center mb-2">
          From a rejection letter to a winning appeal
        </h3>
        <p className="text-foreground-muted text-center mb-10 max-w-xl mx-auto">
          The left column is what the insurer sent. The right column is what MARSHALL produces — anchored to plan language scraped in real time by Bright Data.
        </p>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* BEFORE column */}
          <div className="flex-1 rounded-card border border-border bg-bg-card-alt overflow-hidden">
            <div className="px-5 py-3 border-b border-border bg-bg-card">
              <span className="font-heading font-bold text-sm text-foreground-muted tracking-wide uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-error" aria-hidden="true" />
                {BEFORE_HEADER}
              </span>
            </div>
            <ul className="divide-y divide-border">
              {BEFORE_LINES.map((line, i) => (
                <li key={i} className="px-5 py-4 text-sm text-foreground-muted leading-relaxed font-mono whitespace-pre-wrap opacity-70">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Divider arrow */}
          <div className="flex lg:flex-col items-center justify-center py-2 lg:py-0">
            <div className="bg-success/10 rounded-full p-2 lg:p-3 animate-stamp-in">
              <ArrowRight className="w-6 h-6 text-success rotate-90 lg:rotate-0" />
            </div>
          </div>

          {/* AFTER column */}
          <div className="flex-1 rounded-card border border-success/20 bg-success/5 overflow-hidden">
            <div className="px-5 py-3 border-b border-success/10 bg-success/[0.03]">
              <span className="font-heading font-bold text-sm text-success tracking-wide uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {AFTER_HEADER}
              </span>
            </div>
            <ul className="divide-y divide-success/10">
              {AFTER_LINES.map((line, i) => (
                <li key={i} className="px-5 py-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Penalty statistics */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PENALTY_STATS.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-card border p-5 text-center ${
                stat.highlight
                  ? "border-accent/20 bg-accent/5 highlight-reveal"
                  : "border-border bg-bg-card"
              }`}
            >
              <p className="text-xs uppercase tracking-wide text-foreground-muted mb-3 font-semibold">
                {stat.label}
              </p>
              <div className="flex items-end justify-center gap-2">
                <span className="text-sm text-foreground-muted line-through mb-0.5 font-mono">
                  {stat.normal}
                </span>
                <span className={`text-2xl font-extrabold font-heading ${stat.highlight ? "text-accent-amber" : "text-success"}`}>
                  {stat.marshall}
                </span>
                <span className="text-xs text-foreground-muted mb-0.5">{stat.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="how-it-works" className="px-6 py-12 lg:py-16 max-w-6xl mx-auto w-full">
        <h3 className="font-heading text-2xl lg:text-3xl font-bold text-foreground text-center mb-2">
          How MARSHALL works
        </h3>
        <p className="text-foreground-muted text-center mb-10 max-w-xl mx-auto">
          Four steps from denial to submitted appeal. No lawyers, no paperwork, no waiting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                className="relative rounded-card border border-border bg-bg-card p-6 flex flex-col items-center text-center group hover:shadow-md transition-shadow duration-200"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-bold shadow-sm">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-heading font-bold text-foreground mb-2">{step.title}</h4>
                <p className="text-sm text-foreground-muted leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="px-6 py-10 max-w-4xl mx-auto text-center">
        <p className="text-xs text-foreground-muted tracking-wide uppercase mb-4">
          Built on trusted partner infrastructure
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground-muted font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
            Speechmatics
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
            Bright Data
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
            AI/ML API
          </span>
        </div>
      </section>
    </div>
  );
}
