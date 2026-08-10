import { User, MapPin, FileText } from "lucide-react";

const profile = {
  name: "Michael Vance",
  state: "California",
  policy: "Health Shield PPO",
  memberId: "HS-8842-9911-VC",
  claimId: "CL-2026-07841",
};

export default function PatientProfile() {
  return (
    <section aria-labelledby="profile-heading" className="animate-slide-up-fade" style={{ animationDelay: "0ms" }}>
      <h2 id="profile-heading" className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
        Patient Profile
      </h2>
      <div className="bg-bg-card rounded-card p-5 shadow-card border border-border">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center border border-border">
            <User className="w-6 h-6 text-primary" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-xl font-semibold text-foreground">
              {profile.name}
            </h3>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <MapPin className="w-3.5 h-3.5 text-accent flex-shrink-0" aria-hidden="true" />
                <span className="text-foreground/70">{profile.state}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground-muted">
                <FileText className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
                <span className="text-foreground/70">{profile.policy}</span>
              </div>
            </div>
            <div className="mt-3 flex gap-4">
              <div className="text-xs text-foreground-muted">
                <span className="block font-semibold text-foreground-muted uppercase tracking-wider">Member ID</span>
                <span className="font-mono text-foreground/70">{profile.memberId}</span>
              </div>
              <div className="text-xs text-foreground-muted">
                <span className="block font-semibold text-foreground-muted uppercase tracking-wider">Claim ID</span>
                <span className="font-mono text-foreground/70">{profile.claimId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
