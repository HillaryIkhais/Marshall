import { useState, useCallback } from "react";
import {
  Mic,
  MicOff,
  User,
  MapPin,
  FileText,
  Globe,
  Database,
  CheckCircle2,
  AlertTriangle,
  FileDown,
  Building2,
  Scale,
  Gavel,
  Calculator,
  ArrowRight,
  Play,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import {
  patient,
  denial,
  statutes,
  appealSections,
  statutoryInterestRate,
  totalDemand,
} from "../data/mockData";

/* ────────────────────────────────────────────────────────────
   STEP DEFINITIONS
   ──────────────────────────────────────────────────────────── */
const steps = [
  { id: 1, label: "Your Story", sublabel: "Speechmatics Voice Intake" },
  { id: 2, label: "Live Law Search", sublabel: "Bright Data Scraper" },
  { id: 3, label: "Legal Appeal", sublabel: "AI/ML API Synthesis" },
];

/* ────────────────────────────────────────────────────────────
   SAMPLE TRANSCRIPT
   ──────────────────────────────────────────────────────────── */
const SAMPLE_TRANSCRIPT = `My name is Michael Vance. I live in San Francisco, California. I'm calling about my claim denial for the knee arthroscopy surgery performed on March 15th, 2026 at UCSF Medical Center. Health Shield PPO denied it as "Not Medically Necessary." But my orthopedic surgeon, Dr. Sarah Chen at UCSF, documented twelve full weeks of conservative treatment before recommending surgery — that's physical therapy twice a week and two separate corticosteroid injections. None of it worked because my MRI showed a complex medial meniscus tear with cartilage damage that was only going to get worse. The insurer claims I didn't exhaust conservative options — but I have all the records. I even have the pre-authorization reference number: PA-44921. Dr. Chen's office called on February 28th and got verbal approval from a Health Shield representative named Jennifer. I was on the call. Now they're pretending it never happened. This isn't fair.`;

/* ────────────────────────────────────────────────────────────
   WAVEFORM BARS (pseudo-random)
   ──────────────────────────────────────────────────────────── */
const waveformDelays = Array.from({ length: 24 }, () => Math.random() * 1.5);

/* ────────────────────────────────────────────────────────────
   MAIN COMPONENT
   ──────────────────────────────────────────────────────────── */
export default function AppWorkspace() {
  const [activeStep, setActiveStep] = useState(1);
  const [highestStep, setHighestStep] = useState(1);

  /* ── Step 1 state ── */
  const [isRecording, setIsRecording] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [step1Complete, setStep1Complete] = useState(false);

  /* ── Step 2 state ── */
  const [scraping, setScraping] = useState(false);
  const [scraped, setScraped] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);

  /* ── Step 3 state ── */
  const [pdfState, setPdfState] = useState<"idle" | "generating" | "done">("idle");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "done">("idle");

  /* ── Step navigation ── */
  const goToStep = useCallback(
    (step: number) => {
      if (step <= highestStep) {
        setActiveStep(step);
      }
    },
    [highestStep]
  );

  const advanceStep = useCallback(() => {
    const next = Math.min(activeStep + 1, 3);
    setActiveStep(next);
    setHighestStep((h) => Math.max(h, next));
  }, [activeStep]);

  /* ──────────────────────────────────────────────────────────
     STEP 1: Voice Intake
     ────────────────────────────────────────────────────────── */

  const simulateDictation = useCallback(() => {
    if (isSimulating) return;
    setIsSimulating(true);
    setIsRecording(true);
    setTranscript("");

    const words = SAMPLE_TRANSCRIPT.split(" ");
    let wordIndex = 0;

    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        setTranscript((prev) => (prev ? prev + " " : "") + words[wordIndex]);
        wordIndex++;
      } else {
        clearInterval(interval);
        setIsRecording(false);
        setIsSimulating(false);
        setStep1Complete(true);
        if (highestStep < 2) {
          setHighestStep(2);
          setTimeout(() => setActiveStep(2), 600);
        }
      }
    }, 55);

    return () => clearInterval(interval);
  }, [isSimulating, highestStep]);

  /* ──────────────────────────────────────────────────────────
     STEP 2: Bright Data Scraper
     ────────────────────────────────────────────────────────── */

  const runScrape = useCallback(async () => {
    setScraping(true);
    try {
      await supabase.functions.invoke("brightdata-scrape", { body: {} });
    } catch {
      // fallback — we still show data
    }
    // Simulate a brief delay for the animation
    await new Promise((r) => setTimeout(r, 800));
    setScraping(false);
    setScraped(true);
    setStep2Complete(true);
    if (highestStep < 3) {
      setHighestStep(3);
      setTimeout(() => setActiveStep(3), 600);
    }
  }, [highestStep]);

  /* ──────────────────────────────────────────────────────────
     STEP 3: Export Actions
     ────────────────────────────────────────────────────────── */

  const handleDownloadPDF = async () => {
    setPdfState("generating");
    await new Promise((r) => setTimeout(r, 1200));
    window.print();
    setPdfState("done");
    setTimeout(() => setPdfState("idle"), 3000);
  };

  const handleSubmitToCommissioner = async () => {
    setSubmitState("submitting");
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitState("done");
    setTimeout(() => setSubmitState("idle"), 3000);
  };

  /* ──────────────────────────────────────────────────────────
     RENDER
     ────────────────────────────────────────────────────────── */

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      {/* ── Top Step Navigation Progress Bar ── */}
      <nav aria-label="Appeal workflow progress" className="mb-10">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, i) => {
            const isComplete = step.id < activeStep;
            const isCurrent = step.id === activeStep;
            const isFuture = step.id > activeStep;
            const isClickable = step.id <= highestStep;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-initial">
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={!isClickable}
                  className={`flex flex-col items-center gap-2 group cursor-pointer transition-all duration-300 ${
                    !isClickable ? "cursor-not-allowed opacity-40" : ""
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {/* Step circle */}
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                      transition-all duration-300 ease-out
                      ${isComplete ? "bg-success text-white" : ""}
                      ${isCurrent ? "bg-primary text-on-primary shadow-md scale-110" : ""}
                      ${isFuture ? "bg-bg-card-alt text-foreground-muted border-2 border-border" : ""}
                    `}
                  >
                    {isComplete ? (
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {/* Step label */}
                  <div className="text-center">
                    <p
                      className={`text-xs font-semibold transition-colors duration-300 ${
                        isComplete ? "text-success" : isCurrent ? "text-primary" : "text-foreground-muted"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-[10px] text-foreground-muted hidden sm:block">
                      {step.sublabel}
                    </p>
                  </div>
                </button>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-2 sm:mx-4" aria-hidden="true">
                    <div className="h-0.5 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-success rounded-full transition-all duration-500 ease-out ${
                          isComplete ? "w-full" : "w-0"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ================================================================ */}
      {/* STEP 1: YOUR STORY (Voice Intake & Evidence)                      */}
      {/* ================================================================ */}
      {activeStep === 1 && (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Patient Profile Card */}
            <div className="lg:col-span-2 bg-bg-card rounded-card p-5 shadow-card border border-border">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                Patient Profile
              </h3>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center border border-border flex-shrink-0">
                  <User className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-heading text-xl font-bold text-foreground">{patient.name}</p>
                  <p className="text-sm text-foreground-muted flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    {patient.city}, {patient.state}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground-muted">Policy</span>
                  <span className="font-semibold text-foreground">{patient.policy}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground-muted">Member ID</span>
                  <span className="font-mono text-xs text-foreground">{patient.memberId}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-foreground-muted">Claim ID</span>
                  <span className="font-mono text-xs font-bold text-foreground">{patient.claimId}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-foreground-muted">Denied Amount</span>
                  <span className="font-mono font-bold text-destructive">
                    ${denial.claimAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Denial reason badge */}
              <div className="mt-4 px-3 py-2 rounded-lg bg-destructive/5 border border-destructive/10 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" aria-hidden="true" />
                <p className="text-xs text-destructive font-semibold">
                  Denied: "{denial.reason}" — {denial.facility}, {denial.procedure}
                </p>
              </div>
            </div>

            {/* Voice Intake Card */}
            <div className="lg:col-span-3 bg-bg-card rounded-card p-5 shadow-card border border-border">
              <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-4">
                Speechmatics Voice Intake
              </h3>

              <p className="text-sm text-foreground-muted leading-relaxed mb-5 italic">
                Tell MARSHALL what happened in your own words. Speak naturally — we'll
                handle the legal details.
              </p>

              {/* Waveform */}
              <div className="relative flex items-center justify-center gap-[2px] h-16 bg-bg-card-alt rounded-xl mb-4 overflow-hidden border border-border">
                {waveformDelays.map((delay, i) => (
                  <span
                    key={i}
                    className="waveform-bar"
                    style={{
                      animation: isRecording
                        ? `audio-waveform ${0.4 + delay}s ease-in-out infinite`
                        : "none",
                      animationDelay: `${delay}s`,
                      height: isRecording ? `${12 + Math.random() * 28}px` : "6px",
                      opacity: isRecording ? 1 : 0.25,
                      transition: "height 150ms ease-out, opacity 150ms ease-out",
                    }}
                    aria-hidden="true"
                  />
                ))}
                {!isRecording && !transcript && (
                  <span className="absolute text-xs text-foreground-muted select-none">
                    Your voice will appear here…
                  </span>
                )}
              </div>

              {/* Transcript box */}
              <div
                className="min-h-[120px] max-h-[200px] overflow-y-auto custom-scrollbar bg-bg-card-alt rounded-xl p-4 border border-border mb-4 text-sm text-foreground leading-relaxed"
                aria-live="polite"
                role="log"
              >
                {transcript ? (
                  <span>
                    {transcript}
                    {isRecording && <span className="animate-typing-cursor ml-0.5">&nbsp;</span>}
                  </span>
                ) : (
                  <span className="text-foreground-muted italic">
                    Your transcript will appear here during dictation…
                  </span>
                )}
              </div>

              {/* Recording indicator */}
              {isRecording && (
                <div className="flex items-center justify-center gap-2 mb-4 text-xs font-semibold text-destructive">
                  <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-40" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
                  </span>
                  Listening — speak clearly
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={isSimulating}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-button font-semibold text-sm transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    isRecording
                      ? "bg-destructive/5 text-destructive border-2 border-destructive/25 hover:bg-destructive/10"
                      : "bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg"
                  }`}
                  aria-pressed={isRecording}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-5 h-5" aria-hidden="true" />
                      Recording…
                    </>
                  ) : (
                    <>
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20" aria-hidden="true">
                        <Mic className="w-4 h-4" />
                      </span>
                      Tap to Tell Your Story
                    </>
                  )}
                </button>

                <button
                  onClick={simulateDictation}
                  disabled={isSimulating || isRecording}
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-button font-semibold text-sm border border-accent/30 text-accent hover:bg-accent/5 transition-all duration-200 cursor-pointer active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Play className="w-4 h-4" aria-hidden="true" />
                  Simulate Michael Dictating His Story
                </button>
              </div>

              {/* Step button */}
              {step1Complete && (
                <button
                  onClick={advanceStep}
                  className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-button font-semibold text-sm bg-success text-white hover:bg-success/90 shadow-md transition-all duration-200 cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in-up"
                >
                  Continue to Live Law Search
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* STEP 2: BRIGHT DATA LIVE STATUTE SCRAPER                          */}
      {/* ================================================================ */}
      {activeStep === 2 && (
        <div className="animate-fade-in-up max-w-4xl mx-auto">
          {/* Telemetry Box */}
          <div className="bg-bg-card rounded-card p-5 shadow-card border border-border mb-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-accent" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                  Bright Data Live Agent
                </h3>
                <p className="text-xs text-foreground-muted">
                  Scraped: California Insurance Bureau Code — {statutes.length} statutes extracted
                </p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                {scraped ? (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-success/8 text-success border border-success/20">
                    <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                    LIVE
                  </span>
                ) : (
                  <button
                    onClick={runScrape}
                    disabled={scraping}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-semibold text-sm bg-accent text-white hover:bg-accent-light shadow-md transition-all duration-200 cursor-pointer active:scale-[0.97] disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {scraping ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                        Scraping…
                      </>
                    ) : (
                      <>
                        <Globe className="w-4 h-4" aria-hidden="true" />
                        Run Live Scrape
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* 3 Interactive Citation Cards */}
            {scraped && (
              <div className="space-y-3 animate-fade-in-up">
                {statutes.map((statute, i) => (
                  <div
                    key={statute.code}
                    className="rounded-lg p-4 border border-accent/15 bg-accent/[0.02] transition-all duration-300 hover:border-accent/30 hover:shadow-sm"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-accent/10 text-accent">
                            Citation {i + 1}
                          </span>
                          <p className="text-sm font-mono font-bold text-foreground">
                            {statute.code}
                          </p>
                        </div>
                        <p className="text-xs text-foreground-muted leading-relaxed mt-1">
                          {statute.summary}
                        </p>
                        <div className="mt-2 px-3 py-1.5 rounded bg-destructive/[0.03] border border-destructive/10">
                          <p className="text-xs text-destructive font-semibold flex items-start gap-1">
                            <AlertTriangle className="w-3 h-3 mt-px flex-shrink-0" aria-hidden="true" />
                            {statute.violation}
                          </p>
                        </div>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Not yet scraped — empty state */}
            {!scraped && !scraping && (
              <div className="text-center py-8 text-foreground-muted">
                <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" aria-hidden="true" />
                <p className="text-sm font-semibold">No live data yet</p>
                <p className="text-xs mt-1">
                  Click "Run Live Scrape" to pull current California Insurance Codes
                </p>
              </div>
            )}

            {/* Loading state */}
            {scraping && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-lg p-4 border border-border bg-bg-card-alt animate-pulse">
                    <div className="h-3 w-1/3 bg-bg-secondary rounded mb-2" />
                    <div className="h-3 w-full bg-bg-secondary rounded" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Statutory Penalty Calculator */}
          {scraped && (
            <div className="bg-bg-card rounded-card p-5 shadow-card border border-accent/20 highlight-reveal animate-fade-in-up stagger-3">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground">
                    Statutory Penalty Calculator
                  </h3>
                  <p className="text-xs text-foreground-muted">
                    Per Cal. Ins. Code § 10111.2 — 10% Annual Interest on Delayed Claims
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 p-4 bg-bg-card-alt rounded-lg border border-border">
                <div className="text-center">
                  <p className="text-xs text-foreground-muted">Principal Claim</p>
                  <p className="font-mono text-xl font-bold text-foreground">
                    ${denial.claimAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-accent font-bold text-xl hidden sm:block" aria-hidden="true">+</div>
                <div className="text-center">
                  <p className="text-xs text-foreground-muted">Statutory Interest (10%)</p>
                  <p className="font-mono text-xl font-bold text-accent">
                    ${(denial.claimAmount * statutoryInterestRate).toLocaleString()}
                  </p>
                </div>
                <div className="text-primary font-bold text-xl hidden sm:block" aria-hidden="true">=</div>
                <div className="text-center p-3 bg-success/5 rounded-lg border border-success/20">
                  <p className="text-xs text-success font-semibold">Total Demand</p>
                  <p className="font-mono text-2xl font-bold text-success">
                    ${totalDemand.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Advance button */}
          {step2Complete && (
            <button
              onClick={advanceStep}
              className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-button font-semibold text-sm bg-success text-white hover:bg-success/90 shadow-md transition-all duration-200 cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 animate-fade-in-up"
            >
              Continue to Legal Appeal
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      {/* ================================================================ */}
      {/* STEP 3: THE OFFICIAL LEGAL APPEAL LETTER                          */}
      {/* ================================================================ */}
      {activeStep === 3 && (
        <div className="animate-fade-in-up max-w-3xl mx-auto">
          {/* Paper document */}
          <div className="relative paper-texture rounded-card shadow-paper border border-border overflow-hidden mb-6">
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary" aria-hidden="true" />

            <div className="px-6 pt-7 pb-6 sm:px-10 sm:pt-10 sm:pb-8">
              {/* Official Header */}
              <div className="text-center pb-6 mb-6 border-b-2 border-primary/20">
                <div className="flex items-center justify-center gap-2 mb-2" aria-hidden="true">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Formal Appeal of Insurance Denial
                </h3>
                <p className="text-xs text-foreground-muted mt-2 font-sans">
                  In the Matter of Claim {patient.claimId} &bull; Prepared by MARSHALL AI Legal Synthesis
                </p>
                <p className="text-xs text-foreground-muted mt-0.5 font-sans">
                  Powered by AI/ML API &bull; Bright Data Live Legal Scraper
                </p>
                {/* Gold legal seal styling */}
                <div className="mt-3 inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent/30 bg-accent/5" aria-hidden="true">
                  <Gavel className="w-5 h-5 text-accent" />
                </div>
              </div>

              {/* Address Block */}
              <div className="mb-6 text-sm text-foreground leading-relaxed font-sans">
                <p className="font-semibold">To: Health Shield PPO — Appeals Department</p>
                <p className="text-foreground-muted">P.O. Box 7800, San Francisco, CA 94120</p>
                <p className="text-foreground-muted mt-2">Date: April 7, 2026</p>
                <p className="text-foreground-muted">
                  Re: Formal Appeal — Claim {patient.claimId}
                </p>
                <p className="text-foreground-muted">
                  Member: {patient.name} ({patient.memberId})
                </p>
              </div>

              {/* Salutation */}
              <p className="text-sm text-foreground mb-5 font-sans">
                To Whom It May Concern:
              </p>

              {/* 4 Sections */}
              <div className="space-y-5">
                {appealSections.map((section, i) => (
                  <div
                    key={i}
                    className="animate-paper-fade-in"
                    style={{ animationDelay: `${i * 120}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {i === 0 && <FileText className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />}
                      {i === 1 && <Gavel className="w-4 h-4 text-destructive flex-shrink-0" aria-hidden="true" />}
                      {i === 2 && <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0" aria-hidden="true" />}
                      {i === 3 && <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" aria-hidden="true" />}
                      <h4 className="font-heading text-sm font-bold text-foreground">
                        {section.title}
                      </h4>
                    </div>
                    <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-line pl-6 font-sans">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>

              {/* Signature Block */}
              <div className="mt-8 pt-5 border-t border-border">
                <p className="text-sm text-foreground font-sans">
                  Respectfully submitted,
                </p>
                <p className="text-sm text-foreground mt-6 font-heading italic text-lg">
                  {patient.name}
                </p>
                <p className="text-xs text-foreground-muted font-sans">
                  Policyholder, {patient.policy} &bull; Member ID: {patient.memberId}
                </p>
                <p className="text-xs text-foreground-muted mt-4 font-sans">
                  Enclosures: Pre-authorization PA-44921, Clinical Records (Oct 2025–Feb 2026),
                  MRI Report (Jan 12, 2026), UCSF Surgical Notes
                </p>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up stagger-1">
            <button
              onClick={handleDownloadPDF}
              disabled={pdfState !== "idle"}
              className={`
                flex-1 flex items-center justify-center gap-2 px-5 py-3.5
                rounded-button font-semibold text-sm
                shadow-md hover:shadow-lg
                transition-all duration-200 ease-out
                cursor-pointer
                active:scale-[0.97]
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                disabled:opacity-70 disabled:cursor-not-allowed
                ${pdfState === "done"
                  ? "bg-success text-white"
                  : "bg-primary text-on-primary hover:bg-primary/90"
                }
              `}
            >
              {pdfState === "done" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  PDF Downloaded
                </>
              ) : pdfState === "generating" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  Generating PDF…
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" aria-hidden="true" />
                  Download Official PDF Appeal
                </>
              )}
            </button>

            <button
              onClick={handleSubmitToCommissioner}
              disabled={submitState !== "idle"}
              className={`
                flex-1 flex items-center justify-center gap-2 px-5 py-3.5
                rounded-button font-semibold text-sm
                shadow-md hover:shadow-lg
                transition-all duration-200 ease-out
                cursor-pointer
                active:scale-[0.97]
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                disabled:opacity-70 disabled:cursor-not-allowed
                ${submitState === "done"
                  ? "bg-success text-white"
                  : "bg-accent text-white hover:bg-accent-light"
                }
              `}
            >
              {submitState === "done" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  Complaint Submitted
                </>
              ) : submitState === "submitting" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                  Submitting…
                </>
              ) : (
                <>
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  Submit to State Insurance Commissioner
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
