import { useState } from "react";
import { FileDown, Building2, CheckCircle2 } from "lucide-react";

export default function ExportActions() {
  const [pdfState, setPdfState] = useState<"idle" | "generating" | "done">("idle");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "done">("idle");

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

  return (
    <section aria-labelledby="export-heading" className="animate-slide-up-fade" style={{ animationDelay: "300ms" }}>
      <h2 id="export-heading" className="sr-only">Export Actions</h2>
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Download PDF — Prominent Green */}
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
          aria-label={
            pdfState === "done"
              ? "PDF ready"
              : pdfState === "generating"
              ? "Generating PDF"
              : "Download Official PDF Appeal"
          }
        >
          {pdfState === "done" ? (
            <>
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              PDF Downloaded
            </>
          ) : pdfState === "generating" ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              Generating…
            </>
          ) : (
            <>
              <FileDown className="w-4 h-4" aria-hidden="true" />
              Download Official PDF Appeal
            </>
          )}
        </button>

        {/* Submit to Commissioner — Amber accent */}
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
          aria-label={
            submitState === "done"
              ? "Complaint submitted"
              : submitState === "submitting"
              ? "Submitting complaint"
              : "Submit to State Insurance Commissioner"
          }
        >
          {submitState === "done" ? (
            <>
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              Submitted
            </>
          ) : submitState === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
              Submitting…
            </>
          ) : (
            <>
              <Building2 className="w-4 h-4" aria-hidden="true" />
              Submit to Insurance Commissioner
            </>
          )}
        </button>
      </div>
    </section>
  );
}
