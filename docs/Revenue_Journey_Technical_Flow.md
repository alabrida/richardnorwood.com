# Revenue Journey Technical Flow & Architecture

**Purpose:** Blueprint for the logic, data flow, and gating mechanisms of the Revenue Journey Ecosystem.

---

## 1. The Prequalifier: "The Eligibility Calculator"
**Goal:** Filter noise and identify "Fractured Operations" (Candidates for 90-Day Partnership).
**Input:** User interaction (5 Questions).

### Logic Branches
*   **The Bottom Third (Fractured):**
    *   *Result:* "Your engine is nonexistent."
    *   *Recommendation:* **90-Day Partnership (Tier 1/2 Service).**
    *   *Why:* They need an Architect to build it; they aren't ready for a SaaS tool.
*   **The Middle Third (Fragmented):**
    *   *Result:* "You have pieces, but no engine."
    *   *Recommendation:* **Take the RJAT (Tier 3 SaaS).**
    *   *Why:* They have assets to audit. They are the perfect DIY candidate.
*   **The Top Third (Unified):**
    *   *Result:* "You are ready to scale."
    *   *Recommendation:* **Strategy Session (Scaling/Architect Brand).**

---

## 2. The Engine: "Revenue Journey Assessment Tool (RJAT)"
**Trigger:** User enters URL (from Middle Third recommendation or direct).
**Process (n8n Workflow):**
1.  **Scrape:** Analyze Website & Social Presence.
2.  **Score:** Map findings against `Revenue-Journey-Rubric-Master.md`.
3.  **Store:** Save `raw_score` to Supabase (`revenue_journey_assessments`).

### The Gating Mechanism (The Hook)
*   **State A: Processing:** User waits / "Analyzing" animation.
*   **State B: The Option:** "Where should we send your results?"
    *   *Path 1 (Email Only):* Enters Nurture Sequence.
        *   **Deliverable:** Email with **Blurred/Redacted** image of the dashboard. (The Placebo).
        *   **Goal:** Tease the insight to drive finding.
    *   **Path 2 (Create Account):** Enters Dashboard (Free Tier).

---

## 3. The Dashboard & Upgrade Path
**Platform:** Custom Web App (Supabase Auth).

### Product Line A: The Digital Products (Snapshots)
*Target: The Transactional Buyer (One-Time Need)*

1.  **Standard Snapshot (The Score)**
    *   **Deliverable:** One-time unblurred view of the Dashboard metrics.
    *   **Value:** "Know where you stand right now."
    *   **Price:** One-time fee (e.g., $97).

2.  **Pro Snapshot (The Deep Dive)**
    *   **Deliverable:** Unblurred Dashboard + PDF Export of Recommendations + 1-Month "Content Pack" download.
    *   **Value:** "Know how to fix it yourself."
    *   **Price:** Higher one-time fee (e.g., $197).

### Product Line B: The SaaS Platform (Memberships)
*Target: The Relational Buyer (Continuous Improvement)*

1.  **Standard Membership (The Monitor)**
    *   **Deliverable:** Historical Tracking + **1 Snapshot Credit / Month**.
    *   **Value:** "Watch your score improve over time."
    *   **Price:** Recurring (e.g., $49/mo).

2.  **Pro Membership (The Builder)**
    *   **Deliverable:** All Standard features + **1 Snapshot Credit / Week (4/mo)** + **Chat Interface** + **Landing Page Generator**.
    *   **Value:** "Automate the fix."
    *   **Price:** Higher recurring (e.g., $99/mo).

### Product Line C: The Hardcore DIYer (The Battleship License)
*Target: The Brute-Force Optimizer / Developer*

1.  **The Battleship License**
    *   **External Feature:** **Capped Snapshot Generations (2 Scans / Day)**.
        *   *Use Case:* "Run audit -> Tweak Code -> Run audit -> Tweak Code."
        *   *Constraint:* Enough to iterate, but prevents commercial exploitation.
    *   **Internal Feature:** **1 Credit / Week** to unlock their *own* Dashboard Recommendations.
    *   **Value:** "Unlimited Ammo to play Battleship (Guess & Check), but you don't get the Map (Unblurred Dashboard) to see where the hits are."
    *   **Price:** High Recurring (e.g., $197/mo).

### Product Line D: The Agency License (The Golden Ticket)
*Target: Consultants / White Label Resellers*

1.  **The Golden Ticket**
    *   **External Feature:** **Truly Unlimited Snapshot Generations**.
    *   **Commercial Rights:** License to resell the reports to clients.
    *   **Value:** "The Engine for *your* agency."
    *   **Price:** Enterprise Recurring (e.g., $497/mo).








---

## 4. Post-Conversion Flow
1.  **The Referral:** Discount codes for sharing.
2.  **The Review:** Automated request for 5-star rating (Reputation Management).

---

## 5. Strategic Recommendation: Dual Revenue Paths
**Verdict:** **Separation of Concerns**.

*   **Rationale:**
    1.  **Direct Value:** A user can buy a specific result (Snapshot) without feeling forced into a subscription they might forget to cancel.
    2.  **Clear Value Prop:** "Snapshots" are for answers. "Memberships" are for tools and trends.
    3.  **No Cannibalization:** The Pro Tools (Chat/Generator) are *never* available in a Snapshot, protecting the recurring revenue value.


