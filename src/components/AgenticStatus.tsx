import { useState, useEffect } from "react";
import {
  UserCheck,
  Globe,
  BrainCircuit,
  ChevronRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const agents = [
  { id: 1, label: "Agent 1: Speechmatics Intake", sublabel: "Real-Time Voice Transcription", icon: UserCheck },
  { id: 2, label: "Agent 2: Bright Data Legal Scrape", sublabel: "Live CA Insurance Code Extraction", icon: Globe },
  { id: 3, label: "Agent 3: AI/ML Legal Synthesis", sublabel: "Statutory Analysis & Appeal Drafting", icon: BrainCircuit },
];

export default function AgenticStatus() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = agents.map((_, i) =>
      setTimeout(() => setActiveStep(i + 1), (i + 1) * 1200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section aria-labelledby="pipeline-heading" className="animate-slide-up-fade" style={{ animationDelay: "0ms" }}>
      <h2 id="pipeline-heading" className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
        AI Agentic Pipeline
      </h2>
      <div className="bg-bg-card rounded-card p-4 shadow-card border border-border">
        <div className="space-y-1">
          {agents.map((agent, i) => {
            const isComplete = i < activeStep;
            const isActive = i === activeStep;
            const isPending = i > activeStep;

            return (
              <div
                key={agent.id}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ease-out
                  ${isComplete ? "bg-success/5" : ""}
                  ${isActive ? "bg-primary/6 border border-primary/15" : "border border-transparent"}
                  ${isPending ? "opacity-50" : ""}
                `}
                aria-current={isActive ? "step" : undefined}
              >
                {/* Step indicator */}
                <div
                  className={`
                    flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${isComplete ? "bg-success text-white" : ""}
                    ${isActive ? "bg-primary text-on-primary shadow-md" : ""}
                    ${isPending ? "bg-bg-card-alt text-foreground-muted" : ""}
                  `}
                  aria-hidden="true"
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="text-xs font-bold">{agent.id}</span>
                  )}
                </div>

                {/* Label */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`
                      text-xs font-semibold transition-colors duration-300
                      ${isComplete ? "text-success" : ""}
                      ${isActive ? "text-primary" : ""}
                      ${isPending ? "text-foreground-muted" : "text-foreground"}
                    `}
                  >
                    {agent.label}
                  </p>
                  <p className="text-[10px] text-foreground-muted truncate">
                    {agent.sublabel}
                  </p>
                </div>

                {/* Arrow connector */}
                {i < agents.length - 1 && (
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-colors duration-300 ${
                      isComplete ? "text-success" : "text-foreground-muted"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
