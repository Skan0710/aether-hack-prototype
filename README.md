# PayKavach — AI-Powered Pre-Payment Protection
> *"The AI that asks why before you pay."*

[![Build & Test](https://img.shields.io/badge/Build-Passing-10B981.svg)]()
[![Tests](https://img.shields.io/badge/Tests-10%2F10%20Passing-10B981.svg)]()
[![Hackathon](https://img.shields.io/badge/Submission-ENIGMA%205.0-06B6D4.svg)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)]()

PayKavach is an intelligent, companion pre-payment financial shield designed to protect Indian UPI users from digital fraud, coercive social engineering, AI voice clones, and cash-flow delinquency **before** they open their UPI app.

---

## 1. Product Vision & Critical Boundary

### The Core Problem
UPI fraud in India has shifted from crude phishing links to sophisticated **social engineering traps**:
- Panic-driven emergency extortion scripts
- Deepfake neural voice clones impersonating family members
- Blind impulse purchases that precipitate bank balance deficits right before EMI and rent auto-debits

### The PayKavach Solution
PayKavach acts as an explainable companion guard that intervenes in the critical seconds before transaction authorization. It evaluates four multi-model risk vectors:
1. **Scam-Script Analysis:** Matches message context against known threat playbooks (emergency medical extortion, prize fees, power disconnects).
2. **Voice-Clone Risk:** Analyzes acoustic audio notes for neural TTS and vocoder artifacts.
3. **Payee & Behavioral Risk:** Identifies unverified handles, newly created VPAs, and relationship mismatches.
4. **Cash-Flow Foresight:** Evaluates post-transaction liquidity against scheduled calendar obligations due before the next salary credit.

### Critical Product Boundaries (Honest Disclosures)
- **Companion Application:** PayKavach is a pre-payment companion. It **cannot and does not** directly block, reverse, or intercept transactions inside third-party banking or UPI apps (PhonePe, Google Pay, Paytm, BHIM).
- **Zero Credential Collection:** PayKavach **never** requests, reads, or stores UPI PINs, banking passwords, debit card details, or SMS OTPs.
- **Deterministic Hackathon Simulation:** This prototype uses deterministic mock rule engines and synthetic data to guarantee 100% reliable offline evaluation for judges without requiring paid external AI APIs or live bank credentials.

---

## 2. Predefined Demos (Enigma 5.0 Handbook Alignment)

The prototype comes seeded with demo user **Aarav Sharma** (Balance: ₹48,500; Salary on 1st; ₹26,500 obligations due in 5 days):

### Demo 1 — Scam Intercept (Hospital Emergency HOLD)
- **Context:** Voice message: *"Beta, I'm in hospital, send ₹20,000 to this number right now, don't tell Papa"*
- **Payee:** `Rahul Kumar` (`rahul.k88@ybl`), First-time payee, Claimed relation: "Mom"
- **Verdict:** **HOLD** (Risk Score: `94/100`)
- **Required Explanations Generated:**
  1. Voice note is 91% likely AI-generated
  2. First-ever payment to this payee
  3. Payee name does not match Mom
  4. Urgency and secrecy detected
  5. Script matches 94% of known hospital-emergency scams
- **Interactive UI Flows:**
  - **"Call Mom Now":** Simulated out-of-band phone dialer to Mom's verified number (+91 98201 12345), where she confirms she is safe at home.
  - **"10-Minute Cool-Off":** Simulated behavioral timer breaking the psychological panic loop.

### Demo 2 — Cash-Flow Foresight (Croma Phone Purchase WARN)
- **Context:** ₹30,000 smartphone purchase at Croma Electronics
- **Current Balance:** ₹48,500
- **Obligations Due in 5 Days:** Rent (₹15,000) + Loan EMI (₹8,500) + Bills (₹3,000) = ₹26,500
- **Projected Deficit:** `₹48,500 - ₹30,000 - ₹26,500 = -₹8,000`
- **Verdict:** **WARN** (Shortfall: `₹8,000`)
- **Required Message:** *"You can afford this today, but rent and your EMI are due in 5 days — you'd be short by ₹8,000. Salary lands on the 1st: buy then, or split it?"*
- **Actions:** "Remind Me on the 1st" or "Pay Anyway" (initiates standard UPI intent handoff).

### Demo 3 — Explainable Credit Passport (78/100)
- **Score:** `78/100` (Low Risk)
- **Factors Displayed:**
  - Salary credited 12 of 12 months (+28 pts, Strong positive)
  - Rent and bills on time 96% (+24 pts, Positive)
  - Spending stability ±8% a month (+18 pts, Positive)
  - One late EMI in March (-8 pts, Small negative)
- **Interactive UI Flows:**
  - **"Share With Lender via AA":** Simulated consent flow under RBI Account Aggregator framework transmitting signed synthetic JSON payload to lender endpoint.

---

## 3. Decision Policy & Risk Fusion Mathematics

### Multi-Model Weighted Risk Fusion
```text
fusedRisk = (scriptScore * 0.35) + (payeeScore * 0.30) + (voiceScore * 0.20) + (contextScore * 0.15)
```

### Policy Execution Hierarchy
The policy enforces strict precedence: `HOLD` > `WARN` > `ASK` > `PASS`:
- **HOLD:** `fusedRisk >= 0.75` OR `voiceScore >= 0.80 on first-time payee`
- **WARN:** `fusedRisk >= 0.40 and < 0.75` OR `cashFlowCheck projects a shortfall`
- **ASK:** Strong signal divergence (`max(scores) - min(scores) > 0.50`) OR insufficient history
- **PASS:** All risk checks clear within safe bounds

### Affordability Formula
```text
projectedBalance = currentBalance - paymentAmount - obligationsDueBeforeNextSalary - safetyBuffer
```
If `projectedBalance < 0`, a `WARN` verdict with the exact shortfall is triggered.

---

## 4. Tech Stack

- **Framework:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS (Custom Fintech Midnight Palette, accessible contrast, fine borders)
- **Routing:** React Router v6
- **Visualizations:** Recharts (Liquidity trajectory and 12-month spending stability charts)
- **Icons:** Lucide React
- **Testing:** Vitest (100% deterministic decision policy and affordability tests)
- **Storage:** Browser LocalStorage for persistent screening history and preferences

---

## 5. Project Architecture

```
src/
├── app/
│   ├── App.tsx                     # Top-level application shell
│   └── router.tsx                  # React Router routes and layouts
├── components/
│   ├── dashboard/                  # Obligations, Credit Passport & Quick Demo widgets
│   ├── layout/                     # Sidebar, Header, and responsive AppLayout
│   ├── payment/                    # Pre-check form, Voice Note simulator, UPI Handoff modal
│   ├── ui/                         # Reusable Badge, Button, Card, Modal components
│   └── verdict/                    # Verdict headers, reasons, breakdowns, cool-off modals
├── data/
│   ├── creditPassportData.ts       # 78/100 credit passport metrics and factors
│   ├── demoScenarios.ts            # Predefined Demo 1, Demo 2, Safe scenarios
│   ├── demoUser.ts                 # Aarav Sharma seed profile and obligations
│   └── scamPlaybooks.ts            # Medical emergency, lottery, and disconnect playbooks
├── engine/
│   ├── contextCheck.ts             # Urgency and secrecy NLP heuristic
│   ├── payeeCheck.ts               # First-time VPA and reputation evaluator
│   ├── riskFusion.ts               # Mathematical weighted risk fusion (35/30/20/15)
│   ├── scamCheck.ts                # Playbook pattern matching engine
│   ├── verdictPolicy.ts            # Priority policy (HOLD > WARN > ASK > PASS)
│   └── voiceCheck.ts               # Simulated neural voice clone detector
├── i18n/
│   └── translations.ts             # English and Hindi dictionary
├── pages/
│   ├── Activity.tsx                # Persistent screening history & feedback filter
│   ├── CreditPassport.tsx          # 78/100 Passport & AA Lender Sharing
│   ├── Dashboard.tsx               # Main safety dashboard & quick launcher
│   ├── PaymentCheck.tsx            # Payment pre-check input form
│   ├── Settings.tsx                # Language switch, privacy boundaries, demo reset
│   └── Verdict.tsx                 # Explainable verdict analysis & handoff
├── services/
│   ├── paymentService.ts           # Modular mock API service layer
│   └── storageService.ts           # LocalStorage persistence manager
├── tests/
│   ├── affordability.test.ts       # Unit tests for Demo 2 ₹8,000 shortfall
│   └── decisionPolicy.test.ts      # Unit tests for Demo 1 HOLD and fusion weights
└── utils/
    ├── affordability.ts            # Reusable affordability calculator
    ├── formatCurrency.ts           # Indian Rupee INR currency formatters
    └── upiHandoff.ts               # NPCI upi:// intent generator and clipboard utility
```

---

## 6. Getting Started Locally

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/Skan0710/aether-hack-prototype.git
cd aether-hack-prototype

# Install dependencies
npm install
```

### Running the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Running Unit Tests
```bash
npm test
```
All 10 unit tests for the decision policy, risk fusion, and affordability calculator will execute via Vitest.

### Creating Production Build
```bash
npm run build
```
Generates production assets in `dist/`.

---

## 7. Seven-Commit Audit Trail

| Commit # | Hash | Description |
|:---:|:---:|:---|
| **1** | `972f55a` | `chore: initialize PayKavach prototype foundation` |
| **2** | `e734319` | `feat: build responsive PayKavach dashboard and navigation` |
| **3** | `7de8aed` | `feat: implement payment pre-check and demo scenarios` |
| **4** | `55b0bd2` | `feat: implement explainable risk engine and scam HOLD demo` |
| **5** | `34e550e` | `feat: add cash-flow foresight and WARN payment flow` |
| **6** | `6f07443` | `feat: implement credit passport, activity history and memory` |
| **7** | *Current* | `feat: polish PayKavach prototype and complete submission QA` |

---

## 8. Known Limitations & Future Scope

1. **Native OS Accessibility Overlay:** In production, PayKavach can be implemented as an Android Accessibility Service that triggers the pre-check modal when it detects a UPI intent or QR scan in third-party apps.
2. **On-Device Small Language Models (SLMs):** Future versions can run quantized on-device SLMs (e.g. Gemma 2B) for localized zero-leakage scam script classification.
3. **Live Account Aggregator Integration:** In production, the synthetic AA sharing flow connects to licensed NBFC-AAs (e.g., Anumati, Setu, Finvu) via standardized Sahamati APIs.
