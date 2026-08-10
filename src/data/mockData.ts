/** Shared mock data for MARSHALL — single source of truth across all views */

export const patient = {
  name: "Michael Vance",
  city: "San Francisco",
  state: "CA",
  policy: "Health Shield PPO",
  memberId: "HS-8842-9911-VC",
  claimId: "CL-90422",
};

export const denial = {
  insurer: "Health Shield PPO",
  date: "April 2, 2026",
  reference: "DEN-2026-09142-B",
  reason: "Not Medically Necessary",
  facility: "UCSF Medical Center",
  procedure: "Knee Arthroscopy (CPT 29881)",
  claimAmount: 14200,
  excerpt: `After careful review of the submitted documentation regarding the knee arthroscopy (CPT 29881) performed on Michael Vance at UCSF Medical Center on March 15, 2026, we have determined that this procedure does not meet our medical necessity criteria as defined in Section 4.2(a) of the Evidence of Coverage. Conservative treatment options, including physical therapy and corticosteroid injections, were not exhausted before surgical intervention. Accordingly, the claim in the amount of $14,200.00 is denied in full.`,
};

export const statutoryInterestRate = 0.10; // 10% annual per Cal. Ins. Code § 10111.2
export const totalDemand = denial.claimAmount + denial.claimAmount * statutoryInterestRate;

export const statutes = [
  {
    code: "Cal. Ins. Code § 2695.7(b)",
    summary:
      "Mandatory 40-Day Insurer Response Window — Insurers must accept or deny a claim within 40 calendar days of receiving proof of claim. Violation constitutes an unfair claims settlement practice and may subject the insurer to administrative penalties and interest.",
    violation: "Health Shield took 47 days to issue the denial letter dated April 2, 2026 — 7 days past the statutory deadline.",
  },
  {
    code: "Cal. Health & Safety Code § 1374.30",
    summary:
      "Independent Medical Review (IMR) Rights — Every enrollee has the right to an independent medical review when a health plan denies, modifies, or delays a service based on medical necessity. The plan must provide written notice of IMR rights concurrent with the denial.",
    violation: "Health Shield failed to include IMR notification in the denial letter as required by subdivision (d) of this section.",
  },
  {
    code: "Cal. Ins. Code § 10111.2",
    summary:
      "10% Annual Statutory Penalty Interest for Delayed Claims — Claims not paid within 30 working days after proof of claim accrues interest at 10% per annum from the date payment was due.",
    violation: `Statutory interest on $14,200 from the date payment was due (May 17, 2026) totals $1,420.00, bringing the full demand to $15,620.00.`,
  },
];

export const appealSections = [
  {
    title: "I. Statement of Claim",
    content: `This formal appeal is submitted on behalf of Michael Vance (Member ID: HS-8842-9911-VC) regarding Health Shield PPO's denial of Claim #CL-90422 for knee arthroscopy (CPT 29881) performed on March 15, 2026 at UCSF Medical Center. The insurer denied coverage on April 2, 2026 — 47 days after receiving proof of claim — citing "Not Medically Necessary" as the stated reason. The denied amount totals $14,200.00.`,
  },
  {
    title: "II. Statutory Violations & Insurer Bad Faith",
    content: `Health Shield PPO has violated multiple provisions of the California Insurance Code and Health & Safety Code. Specifically:\n• Cal. Ins. Code § 2695.7(b) — 40-Day Response Window Violation. The denial was issued 47 days after proof of claim, exceeding the statutory maximum by 7 days.\n• Cal. Health & Safety Code § 1374.30 — The denial letter failed to include mandated notice of Independent Medical Review (IMR) rights.\n• Cal. Ins. Code § 10111.2 — Statutory penalty interest of 10% per annum applies to the unpaid claim, totaling $1,420.00 as of this filing.`,
  },
  {
    title: "III. Evidence & Citation Matrix",
    content: `The following evidence supports this appeal:\n• Clinical records from Dr. Sarah Chen, UCSF Department of Orthopedic Surgery, documenting 12 weeks of conservative treatment (physical therapy and two corticosteroid injections) prior to the surgical recommendation — contrary to the insurer's assertion.\n• Pre-authorization request #PA-44921 submitted February 28, 2026 with verbal approval confirmed.\n• MRI dated January 12, 2026 documenting a complex medial meniscus tear with associated articular cartilage damage — an injury unlikely to resolve with conservative measures alone per AMA guidelines.`,
  },
  {
    title: "IV. Demand for Immediate Reversal",
    content: `Based on the foregoing statutory violations, the policyholder respectfully demands:\n1. Immediate reversal of the denial and full payment of $14,200.00 for Claim #CL-90422;\n2. Statutory penalty interest of $1,420.00 pursuant to Cal. Ins. Code § 10111.2, for a total payment of $15,620.00;\n3. Written confirmation that the insurer has updated its medical necessity review protocols to align with AMA clinical guidelines.\nThis appeal is submitted pursuant to the rights afforded under California Insurance Code § 2695.7 and California Health & Safety Code § 1374.30.`,
  },
];

export const metrics = {
  totalAppealed: "$14,250,000",
  accuracy: "94%",
  fees: "0",
};

export const partnerTelemetry = {
  speechmatics: { status: "READY", latency: null },
  brightdata: { status: "ACTIVE", latency: 142 },
  aimlapi: { status: "ONLINE", latency: null },
};

export const beforeAfter = {
  before: {
    title: "The Insurer's Rejection",
    content: `April 2, 2026

Re: Claim #CL-90422
Member: Michael Vance

Dear Mr. Vance,

After careful review of the submitted documentation regarding the knee arthroscopy (CPT 29881) performed at UCSF Medical Center on March 15, 2026, we have determined that this procedure does NOT meet our medical necessity criteria.

Per Section 4.2(a) of your Evidence of Coverage, conservative treatment options must be exhausted before surgical intervention is authorized. Our medical review panel found insufficient documentation of conservative treatment failure.

Accordingly, the claim in the amount of $14,200.00 is hereby DENIED.

You may request a standard internal review within 180 days.

Sincerely,
Health Shield PPO Claims Department`,
  },
  after: {
    title: "MARSHALL's Statutory Demand",
    content: `FORMAL APPEAL OF INSURANCE DENIAL
Pursuant to Cal. Ins. Code § 2695.7 and Cal. Health & Safety Code § 1374.30

To: Health Shield PPO — Appeals Department
Re: Claim #CL-90422 | Member: Michael Vance

STATUTORY VIOLATIONS IDENTIFIED:

▶ Cal. Ins. Code § 2695.7(b) — 40-DAY RESPONSE WINDOW VIOLATION
Your denial was issued 47 days after proof of claim. The California Insurance Code mandates a response within 40 calendar days. This 7-day violation constitutes an unfair claims settlement practice and triggers statutory penalties.

▶ Cal. Health & Safety Code § 1374.30 — IMR RIGHTS VIOLATION
You failed to provide the required Independent Medical Review notice with your denial letter. Every enrollee has a statutory right to an IMR — and you must notify them of it.

▶ Cal. Ins. Code § 10111.2 — STATUTORY INTEREST PENALTY
10% annual interest applies to all unpaid claims past 30 working days.

TOTAL DEMAND: $14,200.00 (Principal) + $1,420.00 (Statutory Interest) = $15,620.00

This appeal is supported by clinical records documenting 12 weeks of conservative treatment, pre-authorization #PA-44921, and MRI evidence of a complex meniscus tear per AMA clinical guidelines.`,
  },
};
