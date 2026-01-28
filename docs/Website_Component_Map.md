# Website Component & Agent Map

**Purpose:** Translate the Whiteboard Sketches into a concrete list of Pages and Components to be built by Agents.

## 1. Global Elements
*Assigned Agent: `Layout_Architect`*
*   **Header**: Logo, Nav Menu, "Login", CTA ("Audit Your Engine").
*   **Footer**: Links, Legal, Social Icons, Newsletter Signup.
*   **Theme System**: Typography (Kinetic), Color Palette, Grid System (Bento).

---

## 2. Public Pages (The Marketing Layer)

### A. Home Page ( The Hook)
*Assigned Agent: `Frontend_Builder`*
*   **Hero Section**:
    *   Kinetic Typography Headline.
    *   Subhead (Value Prop).
    *   Primary CTA ("Start Journey").
*   **Ideology Section (The Methodology)**:
    *   5-Stage Revenue Journey (Visual/Scrollytelling).
    *   "Information Fusion" Explainer.
*   **Social Proof Section**:
    *   Case Studies (Data-Driven).
    *   Testimonials/Reviews.
*   **About Me**:
    *   Bio, Credentials, "The Architect" Persona.

### B. Services Page (The 90-Day Partnership)
*Assigned Agent: `Content_Strategist`*
*   **The Offer**: 3-Tier Service Breakdown (DFY, DWY, DIY).
*   **The Timeline**: 90-Day Roadmap (Ramp + Sprint).
*   **Weekly Classes**: Curriculum Syllabus.
*   **CTA**: "Apply for Partnership" (Links to Calculator).

### C. The Calculator Host Page (SEO Authority)
*Assigned Agent: `Logic_Engineer`*
*   **Purpose**: A dedicated page for the Prequalifier to rank for "Revenue Audit" keywords.
*   **Components**:
    *   **The Calculator Interface**: 5-Question Logic (Bottom/Middle/Top).
    *   **SEO Content Block**: "Why you need a Revenue Audit".
    *   **Routing Logic**:
        *   *Fractured* -> Push to Services (Tier 1).
        *   *Fragmented* -> Push to RJAT (SaaS).
        *   *Unified* -> Push to Strategy Call.

### D. SaaS / Pricing Page
*Assigned Agent: `Frontend_Builder`*
*   **Features Breakdown**: Dashboard, History, Tools.
*   **Pricing Grid**:
    *   Snapshots (Standard/Pro).
    *   Memberships (Standard/Pro).
    *   Agency/Battleship (High Tier).

### E. Contact Us
*Assigned Agent: `Frontend_Builder`*
*   **Contact Form**: General Inquiries.
*   **Schedule Schedule**: Calendly Embed (Strategy Calls).

---

## 3. App Pages (The SaaS Layer)

### F. The Engine (RJAT)
*Assigned Agent: `Logic_Engineer` (n8n)*
*   **Scraper Interface**: URL Input.
*   **Processing State**: "Scanning..." Animation.
*   **The Fork (The Halt)**: Payment Gate / Account Creation.

### G. The Dashboard
*Assigned Agent: `FullStack_Dev`*
*   **Scorecard**: Radar Chart (5 Stages).
*   **Leak List**: Top 5 Gaps.
*   **Blur Filter**: The Logic component that hides/shows details based on Tier.
*   **Pro Tools Container**:
    *   Chat Interface (RAG).
    *   Landing Page Generator.

---

## 4. Agent Role Definitions (The Team)
*   **Layout_Architect**: Sets up the skeleton, CSS variables, and global state.
*   **Frontend_Builder**: Builds visual React/Vue components (Hero, Grid, Pricing).
*   **Content_Strategist**: Writes the copy for Services, Ideology, and About.
*   **Logic_Engineer**: Builds the Calculator, Scraper, and Auth flows.
*   **FullStack_Dev**: Connects the Dashboard UI to the Supabase Database.
