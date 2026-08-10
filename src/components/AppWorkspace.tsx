import { useState, useEffect } from "react";
import {
  User,
  Mic,
  Globe,
  FileText,
  Download,
  CheckCircle2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import PatientProfile from "./PatientProfile";
import VoiceIntake from "./VoiceIntake";
import ScraperOutput from "./ScraperOutput";
import AppealDocument from "./AppealDocument";
import ExportActions from "./ExportActions";
import AgenticStatus from "./AgenticStatus";
import DenialViewer from "./DenialViewer";

type Step = "profile" | "voice" | "scraper" | "appeal" | "export";

interface StepDef {
  key: Step;
  label: string;
  icon: typeof User;
  description: string;
}

const STEPS: StepDef[] = [
  { key: "profile", label: "Patient Profile", icon: User, description: "Your information" },
  { key: "voice", label: "Voice Intake", icon: Mic, description: "Tell your story" },
  { key: "scraper", label: "Plan Research", icon: Globe, description: "Policy scraping" },
  { key: "appeal", label: "Appeal Draft", icon: FileText, description: "Legal synthesis" },
  { key: "export", label: "Export", icon: Download, description: "Download & submit" },
];

export default function AppWorkspace() {
  const [activeStep, setActiveStep] = useState<Step>("profile");
  const [completedSteps, setCompletedSteps] = useState<Set<Step>>(new Set(["profile"]));
  const [showDenialModal, setShowDenialModal] = useState(false);

  // Simulate step progression based on mock data readiness
  useEffect(() => {
    // Profile is always complete on mount
    const timer1 = setTimeout(() => {
      setCompletedSteps((prev) => new Set([...prev, "voice"]));
    }, 2000);

    const timer2 = setTimeout(() => {
      setCompletedSteps((prev) => new Set([...prev, "scraper"]));
    }, 4500);

    const timer3 = setTimeout(() => {
      setCompletedSteps((prev) => new Set([...prev, "appeal"]));
    }, 7000);

    const timer4 = setTimeout(() => {
      setCompletedSteps((prev) => new Set([...prev, "export"]));
    }, 8500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleStepClick = (step: Step) => {
    if (completedSteps.has(step)) {
      setActiveStep(step);
    }
  };

  const renderActiveStep = () => {
    switch (activeStep) {
      case "profile":
        return (
          <div className="space-y-4">
            <PatientProfile />
            <div className="flex justify-end">
              <button
                onClick={() => setActiveStep("voice")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-semibold text-sm bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Continue to Voice Intake <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      case "voice":
        return (
          <div className="space-y-4">
            <VoiceIntake />
            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep("profile")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-button font-medium text-sm text-foreground-muted border border-border hover:text-foreground hover:border-foreground/20 transition-all duration-200 cursor-pointer active:scale-[0.97]"
              >
                &larr; Back
              </button>
              {completedSteps.has("scraper") && (
                <button
                  onClick={() => setActiveStep("scraper")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-semibold text-sm bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue to Plan Research <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      case "scraper":
        return (
          <div className="space-y-4">
            <ScraperOutput />
            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep("voice")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-button font-medium text-sm text-foreground-muted border border-border hover:text-foreground hover:border-foreground/20 transition-all duration-200 cursor-pointer active:scale-[0.97]"
              >
                &larr; Back
              </button>
              {completedSteps.has("appeal") && (
                <button
                  onClick={() => setActiveStep("appeal")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-semibold text-sm bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue to Appeal Draft <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      case "appeal":
        return (
          <div className="space-y-4">
            <AppealDocument />
            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep("scraper")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-button font-medium text-sm text-foreground-muted border border-border hover:text-foreground hover:border-foreground/20 transition-all duration-200 cursor-pointer active:scale-[0.97]"
              >
                &larr; Back
              </button>
              {completedSteps.has("export") && (
                <button
                  onClick={() => setActiveStep("export")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-semibold text-sm bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Continue to Export <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      case "export":
        return (
          <div className="space-y-4">
            <ExportActions />
            <div className="flex justify-start">
              <button
                onClick={() => setActiveStep("appeal")}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-button font-medium text-sm text-foreground-muted border border-border hover:text-foreground hover:border-foreground/20 transition-all duration-200 cursor-pointer active:scale-[0.97]"
              >
                &larr; Back
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-0">
      {/* ─── Step Navigation Sidebar ─── */}
      <aside className="lg:w-64 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-border bg-bg-card-alt lg:min-h-[calc(100vh-120px)]">
        <div className="p-4 lg:p-5">
          <h2 className="font-heading font-bold text-sm text-foreground-muted uppercase tracking-wider mb-4 lg:mb-6">
            Appeal Workflow
          </h2>

          <nav aria-label="Appeal workflow steps">
            <ol className="space-y-1">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isActive = activeStep === step.key;
                const isCompleted = completedSteps.has(step.key);
                const isClickable = isCompleted || isActive;

                return (
                  <li key={step.key}>
                    <button
                      onClick={() => isClickable && handleStepClick(step.key)}
                      disabled={!isClickable}
                      className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-button text-left transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold cursor-default"
                          : isClickable
                          ? "hover:bg-bg-card text-foreground cursor-pointer"
                          : "text-foreground-muted opacity-50 cursor-not-allowed"
                      }`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isCompleted
                            ? "bg-success text-white"
                            : isActive
                            ? "bg-primary text-white"
                            : "bg-border text-foreground-muted"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`block text-sm font-medium truncate ${
                            isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-foreground-muted"
                          }`}
                        >
                          {step.label}
                        </span>
                        <span className="block text-xs text-foreground-muted truncate">
                          {step.description}
                        </span>
                      </div>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className="ml-7 my-0.5 h-3 w-px bg-border" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Agentic Status on sidebar */}
        <div className="px-4 lg:px-5 pb-4 lg:pb-5">
          <AgenticStatus />
        </div>
      </aside>

      {/* ─── Main Workspace ─── */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto min-w-0">
        {/* Denial Letter Banner */}
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-error/5 border border-error/10">
              <AlertCircle className="w-3.5 h-3.5 text-error" />
              <span className="text-xs font-semibold text-error uppercase tracking-wide">
                Denial Detected — CPT 99214
              </span>
            </div>
            <button
              onClick={() => setShowDenialModal(true)}
              className="text-xs text-primary font-semibold hover:underline cursor-pointer transition-colors"
            >
              View Denial Letter
            </button>
          </div>
          <span className="text-xs text-foreground-muted font-mono">
            Case # MAR-2026-0042
          </span>
        </div>

        {/* Active Step Content */}
        <div className="bg-bg-card rounded-card border border-border p-4 lg:p-6 animate-fade-in-up">
          {renderActiveStep()}
        </div>
      </main>

      {/* ─── Denial Letter Modal ─── */}
      {showDenialModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowDenialModal(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Denial letter viewer"
        >
          <div className="bg-bg-card rounded-card border border-border shadow-hover w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <DenialViewer onClose={() => setShowDenialModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
