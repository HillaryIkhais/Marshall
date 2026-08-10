import { Shield, Circle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { partnerTelemetry } from "../data/mockData";

export default function Navbar() {
  const location = useLocation();
  const isApp = location.pathname === "/app";

  return (
    <header className="bg-bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Logo + Protection Status */}
        <Link
          to="/"
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer group"
        >
          <div className="relative flex-shrink-0" aria-hidden="true">
            <Shield className="w-9 h-9 text-primary" fill="currentColor" fillOpacity={0.12} />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-status-pulse absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
            </span>
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
              MARSHALL
            </h1>
            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-success tracking-wider uppercase">
              <Circle className="w-1.5 h-1.5 fill-success" aria-hidden="true" />
              Protection Active
            </div>
          </div>
        </Link>

        {/* Partner Status Telemetry */}
        <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/5 border border-success/10">
            <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" aria-hidden="true" />
            <span className="text-foreground-muted">
              Speechmatics Voice Engine:{" "}
              <span className="font-semibold text-success">{partnerTelemetry.speechmatics.status}</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/10">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse flex-shrink-0" aria-hidden="true" />
            <span className="text-foreground-muted">
              Bright Data MCP Scraper:{" "}
              <span className="font-semibold text-accent">{partnerTelemetry.brightdata.status}</span>
              {partnerTelemetry.brightdata.latency && (
                <span className="text-foreground-muted font-mono ml-1">
                  ({partnerTelemetry.brightdata.latency}ms)
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/5 border border-success/10">
            <span className="w-1.5 h-1.5 rounded-full bg-success flex-shrink-0" aria-hidden="true" />
            <span className="text-foreground-muted">
              AI/ML API Legal Synthesis:{" "}
              <span className="font-semibold text-success">{partnerTelemetry.aimlapi.status}</span>
            </span>
          </div>
        </div>

        {/* CTA */}
        {!isApp && (
          <Link
            to="/app"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-semibold text-sm bg-primary text-on-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Start Your Free Appeal &rarr;
          </Link>
        )}
        {isApp && (
          <Link
            to="/"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-button font-semibold text-sm border border-border text-foreground-muted hover:text-foreground hover:border-foreground/20 bg-bg-card hover:bg-bg-card-alt transition-all duration-200 ease-out cursor-pointer active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            &larr; Back to Home
          </Link>
        )}
      </div>
    </header>
  );
}
