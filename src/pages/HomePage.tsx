import { Link } from "react-router-dom";
import {
  Mic,
  Globe,
  FileText,
  ArrowRight,
  BadgeCheck,
  AlertTriangle,
  Gavel,
  CheckCircle2,
} from "lucide-react";
import { beforeAfter, metrics } from "../data/mockData";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ================================================================ */}
      {/* HERO SECTION                                                        */}
      {/* ================================================================ */}
      <section className="relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 py-16 sm:py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/5 border border-destructive/10 text-xs font-semibold text-destructive tracking-wide mb-6 animate-fade-in-up">
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              Built for Policyholders Fighting Unfair Denials
            </div>

            {/* Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6 animate-fade-in-up stagger-1">
              Insurance Companies Count On You Giving Up.{" "}
              <span className="text-primary">MARSHALL Doesn't.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-foreground-muted max-w-2xl mx-auto mb-10 animate-fade-in-up stagger-2 leading-relaxed">
              Turn unfair claim denial letters into citation-heavy legal appeals using live
              state insurance laws — no lawyer, no fees, no giving up.
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in-up stagger-3 mb-12">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-button font-semibold text-lg bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Start Your Appeal Now
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>

            {/* Impact Metrics Banner */}
            <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-6 py-4 rounded-card bg-bg-card border border-border shadow-sm animate-fade-in-up stagger-4">
              <div className="text-center">
                <p className="font-mono text-lg sm:text-2xl font-bold text-primary">
                  {metrics.totalAppealed}
                </p>
                <p className="text-xs text-foreground-muted">Claims Appealed</p>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" aria-hidden="true" />
              <div className="text-center">
                <p className="font-mono text-lg sm:text-2xl font-bold text-accent">
                  {metrics.accuracy}
                </p>
                <p className="text-xs text-foreground-muted">Statute Citation Accuracy</p>
              </div>
              <div className="w-px h-8 bg-border hidden sm:block" aria-hidden="true" />
              <div className="text-center">
                <p className="font-mono text-lg sm:text-2xl font-bold text-success">
                  $0
                </p>
                <p className="text-xs text-foreground-muted">Lawyer Fees Required</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* BEFORE vs AFTER COMPARISON                                         */}
      {/* ================================================================ */}
      <section className="max-w-[1440px] mx-auto px-6 pb-16 sm:pb-24">
        <div className="text-center mb-10">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
            See MARSHALL in Action
          </h2>
          <p className="text-foreground-muted max-w-xl mx-auto">
            One denial letter. Two outcomes. See what happens when you fight back with the law.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* LEFT: Insurer's Rejection */}
          <div className="relative bg-bg-card rounded-card shadow-card border border-destructive/15 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            {/* Cold header */}
            <div className="bg-destructive/3 border-b border-destructive/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" aria-hidden="true" />
                <h3 className="font-heading text-lg font-bold text-destructive">
                  {beforeAfter.before.title}
                </h3>
              </div>
            </div>
            <div className="px-6 py-5">
              <pre className="text-xs sm:text-sm text-foreground/70 leading-relaxed font-sans whitespace-pre-wrap bg-destructive/[0.02] rounded-lg p-4 border border-destructive/5 max-h-[380px] overflow-y-auto custom-scrollbar">
                {beforeAfter.before.content}
              </pre>
            </div>
            {/* DENIED stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 pointer-events-none">
              <div className="animate-stamp-in" style={{ animationDelay: "400ms" }}>
                <div className="border-4 border-destructive rounded-full px-8 py-4 -rotate-12 bg-destructive/5">
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-destructive tracking-widest">
                    DENIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: MARSHALL's Demand */}
          <div className="relative bg-bg-card rounded-card shadow-card border border-success/15 overflow-hidden group hover:shadow-lg transition-shadow duration-300">
            {/* Authoritative header */}
            <div className="bg-success/5 border-b border-success/10 px-6 py-4">
              <div className="flex items-center gap-2">
                <Gavel className="w-5 h-5 text-success" aria-hidden="true" />
                <h3 className="font-heading text-lg font-bold text-success">
                  {beforeAfter.after.title}
                </h3>
              </div>
            </div>
            <div className="px-6 py-5 paper-texture relative">
              <pre className="text-xs sm:text-sm text-foreground/85 leading-relaxed font-sans whitespace-pre-wrap bg-success/[0.02] rounded-lg p-4 border border-success/10 max-h-[380px] overflow-y-auto custom-scrollbar">
                {beforeAfter.after.content}
              </pre>
            </div>
            {/* APPROVED stamp */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-90 pointer-events-none">
              <div className="animate-stamp-in" style={{ animationDelay: "800ms" }}>
                <div className="border-4 border-success rounded-full px-6 py-3 -rotate-12 bg-success/5">
                  <span className="font-heading text-2xl sm:text-3xl font-bold text-success tracking-widest">
                    DEMAND
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connecting arrow between cards on desktop */}
        <div className="hidden lg:flex items-center justify-center mt-4 gap-2" aria-hidden="true">
          <span className="text-xs font-semibold text-destructive uppercase tracking-wider">Before</span>
          <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-xs font-semibold text-success uppercase tracking-wider">After MARSHALL</span>
        </div>
      </section>

      {/* ================================================================ */}
      {/* HOW MARSHALL FIGHTS FOR YOU — 3 Feature Cards                     */}
      {/* ================================================================ */}
      <section className="bg-bg-secondary/50 border-y border-border">
        <div className="max-w-[1440px] mx-auto px-6 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight mb-3">
              How MARSHALL Fights For You
            </h2>
            <p className="text-foreground-muted max-w-xl mx-auto">
              Three AI-powered agents working together to turn your story into a legal appeal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Card 1: Voice Intake */}
            <div className="bg-bg-card rounded-card p-6 shadow-card border border-border flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-default">
              <div className="w-14 h-14 rounded-full bg-primary/8 flex items-center justify-center mb-4 animate-soft-breathe">
                <Mic className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                Speechmatics Voice Intake
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Dictate your story hands-free. Our speech-to-text engine automatically
                structures emotional speech into legal facts — no typing, no legal training
                needed.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-success">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                98% transcription accuracy
              </span>
            </div>

            {/* Card 2: Bright Data */}
            <div className="bg-bg-card rounded-card p-6 shadow-card border border-border flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-default">
              <div className="w-14 h-14 rounded-full bg-accent/8 flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-accent" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                Bright Data Live Web Scrape
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Scrapes your state's insurance commissioner regulations and prompt-pay
                deadlines at runtime. Every citation is live, current, and jurisdiction-accurate.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-accent">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                142ms average response
              </span>
            </div>

            {/* Card 3: AI/ML Synthesis */}
            <div className="bg-bg-card rounded-card p-6 shadow-card border border-border flex flex-col items-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out cursor-default">
              <div className="w-14 h-14 rounded-full bg-success/8 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-success" aria-hidden="true" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                AI/ML API Legal Synthesis
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Compiles formal 4-section court-ready appeal letters with mandatory
                interest penalty calculations. Every letter is structured to survive
                insurer scrutiny.
              </p>
              <span className="inline-flex items-center gap-1 mt-4 text-xs font-semibold text-success">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                94% citation accuracy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1440px] mx-auto px-6 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/5 border border-success/10 text-xs font-semibold text-success tracking-wide mb-4">
            <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
            No lawyer required. No fees. No risk.
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Ready to Fight Your Denial?
          </h2>
          <p className="text-foreground-muted mb-8">
            You've read enough. Let MARSHALL turn your unfair denial into a legal demand.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-button font-semibold text-lg bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Your Free Appeal Now
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
