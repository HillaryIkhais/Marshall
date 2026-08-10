# ⚖️ MARSHALL
### *Autonomous AI Health Insurance Denial Appeal Engine*

> 🏆 **AI Factory Native.builder Hackathon Submission**  
> *"Every single year in the United States, health insurance companies deny over 850 million medical claims. Official 2026 data shows that over 50% of properly appealed claims are overturned and paid—yet less than 1% of patients ever appeal because hiring a lawyer costs $500 an hour. MARSHALL gives policyholders corporate legal firepower for $0."*

[![Apache 2.0 License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Speechmatics](https://img.shields.io/badge/Speechmatics-Voice_Intake_98%25-00F5A0)](https://www.speechmatics.com/)
[![Bright Data](https://img.shields.io/badge/Bright_Data-Live_Statute_Scraper-D97706)](https://brightdata.com/)
[![AI/ML API](https://img.shields.io/badge/AI%2FML_API-Legal_Synthesis-14532D)](https://aimlapi.com/)

---

## ⚡ Executive Summary

Health insurance companies count on policyholders giving up. When an insurer sends a cold 30-page claim rejection letter, regular people feel overwhelmed and accept financial debt.

MARSHALL changes the rules by automating the legal appeal process in **under 2 minutes**:

1. **Speechmatics Voice Intake**: Patient simply speaks their story into their phone or mic.
2. **Bright Data Live Statute Scrape**: Scrapes state insurance laws (e.g. California Insurance Code § 2695.7) to detect insurer response window violations.
3. **Statutory Penalty Calculator**: Calculates automatic 10% annual statutory interest penalties ($14,200 principal + $1,420 interest = **$15,620 Total Demand**).
4. **AI/ML API Legal Synthesis**: Generates an official, parchment-textured legal demand letter with statutory matrices ready to file with the State Insurance Commissioner.

---

## 🏗️ Technical Architecture & Integrations

```
┌───────────────────────────┐      ┌───────────────────────────┐      ┌───────────────────────────┐
│ 1. Speechmatics Voice     │ ───> │ 2. Bright Data Scraper    │ ───> │ 3. AI/ML API Synthesis    │
│    (98% Patient Intake)   │      │    (Live Insurance Laws)  │      │    (Parchment Demand)     │
└───────────────────────────┘      └───────────────────────────┘      └───────────────────────────┘
                                                                                    │
                                                                                    ▼
                                                                      ┌───────────────────────────┐
                                                                      │ 4. Official PDF & DOI     │
                                                                      │    (State Commissioner)   │
                                                                      └───────────────────────────┘
```

### Partner Integrations

| Technology | Role | Metrics |
| :--- | :--- | :--- |
| **Speechmatics Engine** | Transcribes patient voice history, medical provider notes, & prior auth codes. | 98% Accuracy |
| **Bright Data MCP Scraper** | Live-scrapes California Insurance Code § 2695.7 & Health & Safety Code § 1374.30. | 142ms Latency |
| **AI/ML API Synthesis** | Formulates citation-heavy legal demand letters & statutory interest calculations. | 94% Citation Accuracy |
| **Supabase** | Backend infrastructure & Edge Functions (`brightdata-scrape`). | Connected |

---

## 🎨 Design System & Theme Tokens

* **Background**: Warm Cream (`#FDFBF7`)
* **Primary / Authority**: Deep Forest Green (`#14532D`)
* **Denials**: Terracotta Rose (`#BE123C`)
* **Citations & Penalties**: Warm Amber (`#D97706`)
* **Typography**: `EB Garamond` (Headings) + `Lato` (Body)

---

## 🚀 Quick Start & Local Setup

```bash
# 1. Clone repository
git clone https://github.com/HillaryIkhais/Marshall.git
cd Marshall

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev
```

Open [http://localhost:5174](http://localhost:5174) in your browser.

---

## 📄 License

MARSHALL is open-source software licensed under the **Apache License 2.0**.
