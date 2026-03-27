# **The Unified Commercial Engine Architecture Rubric v3.9 (Foundational Master)**

## **The Unified Commercial Engine Doctrine**

**Authored and Engineered by the Master Architect**

*Inspired by the methodologies of Nicholas Gollop, Winning by Design, and the UCE Framework*

**Single Source of Truth (SSoT) Synopsis:** This rubric is the foundational block of the **Unified Commercial Engine (UCE)** ecosystem. It is designed to be used by **The Guide (Personal Brand)** to diagnose revenue health and establish a **Managed Nervous System (MNS)**.

By capturing 250+ tactical data points (The Tactical Ledger), we provide emerging clients with a "Digital Business Card" checklist. For advanced clients, we apply the **Architectural EKG** to identify **Revenue Leaks**, **Technical Plaque**, and **Information Fusion** gaps. This structural approach creates an organic pay gate: the data identifies the problem, and the UCE implementation provides the sovereign solution.

## **1\. The Maturity Staircase (Organic Pay Gate Logic)**

| Tier | Score | Architectural State | The Guide's Workflow |
| :---- | :---- | :---- | :---- |
| **Fragmented** | 0-40 | **The Frankenstein Stack** | **Onboarding:** Establish Presence Checklist. |
| **Emerging** | 41-60 | **Reactive Ops** | **Connectivity:** Map the Ecosystem (Bio-Links). |
| **Orchestrated** | 61-80 | **Managed Nervous System** | **The Bridge:** Active MNS Dashboard & Gap Analysis. |
| **Unified** | 81-100 | **Commercial Sovereignty** | **The Implementation:** Deploy Sovereign Engine (UCE). |

## **Stage 1: Awareness (The Perimeter)**

*Goal: Capture attention during the 83% of the buyer journey that occurs before direct contact.*

### **1.1 \- 1.4 The Tactical Ledger \[Automated Scraped Signals\]**

* **1.1 Multi-Platform Vitals:** has\_instagram, has\_twitter, has\_linkedin, has\_facebook, has\_tiktok, has\_youtube, has\_gbp, has\_reddit, has\_pinterest.  
* **1.2 Social Metadata:** instagram\_followers\_count, twitter\_followers\_count, linkedin\_followers\_count, youtube\_subscribers\_count.  
* **1.3 Connectivity Hubs:** has\_instagram\_in\_bio, has\_linkedin\_in\_bio, has\_linktree\_in\_bio, has\_stan\_store\_in\_bio.  
* **1.4 Content Recency:** instagram\_latest\_post\_date, twitter\_latest\_tweet\_date, linkedin\_has\_recent\_activity.

### **1.5 \- 1.7 The Architectural EKG \[Systemic Metrics\]**

* **1.5 Commercial Sovereignty Score:** \[Automated\] Ratio of owned domain vs. rented platform usage.  
* **1.6 The 65kb Threshold & Technical Plaque:** \[Automated\] payload\_size\_kb vs. business\_http\_status.  
* **1.7 Governance Score:** **\[Consultant Input\]** Audit of asset ownership (IT vs. Agency vs. Legal).

## **Stage 2: Consideration (The Gateway)**

*Goal: Bridge the "Maturity Gap" by transforming anonymous traffic into first-party telemetry.*

### **2.1 \- 2.4 The Tactical Ledger \[Automated Scraped Signals\]**

* **2.1 Digital Channel Breadth:** count\_pages, has\_blog, business\_has\_json\_ld.  
* **2.2 Impact Assets:** has\_lead\_magnet, has\_newsletter\_signup, has\_quiz, consideration\_roi\_calculator\_detected.  
* **2.3 Capture Friction:** consideration\_form\_detected, has\_contact\_form.  
* **2.4 Evidence Density:** count\_case\_studies, consideration\_has\_testimonials, has\_logos, has\_video\_testimonials.

### **2.5 \- 2.6 The Architectural EKG \[Systemic Metrics\]**

* **2.5 Information Fusion (IF) Readiness:** **\[Consultant Input\]** Audit of CRM/API bidirectional flow.  
* **2.6 Proof-as-a-Service Maturity:** **\[Consultant Input\]** Mapping proof points to specific **Impact Metrics**.

## **Stage 3: Decision (The Core)**

*Goal: Remove friction through transparency and scientific qualification.*

### **3.1 \- 3.7 The Tactical Ledger \[Automated Scraped Signals\]**

* **3.1 Trust & Transparency:** has\_pricing\_page, decision\_pricing\_page\_detected.  
* **3.2 Social Proof Validation:** decision\_gbp\_rating\_score, decision\_gbp\_reviews\_count, decision\_facebook\_reviews\_score.  
* **3.3 Frictionless Booking:** has\_calendly, has\_instant\_booking, booking\_redirect\_url.  
* **3.4 Automated Qualification:** qualification\_field\_presence (Gating the calendar with logic).  
* **3.5 Mutual Commit Assets:** has\_downloadable\_guide, has\_webinar, has\_podcasts.  
* **3.6 Financial Connectivity:** has\_stripe\_integration, has\_billing\_system.  
* **3.7 Security Vitals:** business\_has\_ssl, has\_privacy\_policy, has\_cookie\_banner.

### **3.8 \- 3.9 The Architectural EKG \[Systemic Metrics\]**

* **3.8 Decision Velocity (![][image1]):** **\[Consultant Input\]** Average time from Gateway entry to Mutual Commit.  
* **3.9 Scientific Pipeline Hygiene:** **\[Consultant Input\]** Audit of binary exit criteria for stage progression.

## **Stage 4: Conversion (The Activation)**

*Goal: Automate Quote-to-Cash (Q2C) to maximize capital velocity.*

### **4.1 \- 4.2 The Tactical Ledger \[Automated Scraped Signals\]**

* **4.1 Q2C Foundation:** has\_docusign\_link, payment\_gateway\_detected, conversion\_mobile\_optimized.  
* **4.2 Seamless Entry:** is\_portal\_accessible, has\_welcome\_sequence.

### **4.3 \- 4.5 The Architectural EKG \[Systemic Metrics\]**

* **4.3 Architecture Over Administration:** **\[Consultant Input\]** Measurement of manual vs. automated Q2C friction.  
* **4.4 The Frankenstein Index:** **\[Consultant Input\]** Count of redundant/overlapping SaaS tools.  
* **4.5 Incentive Alignment:** **\[Consultant Input\]** Audit of sales/CS comp plans vs. NRR targets.

## **Stage 5: Retention (The Infinity Loop)**

*Goal: Fulfill the Bowtie Model and drive 110%+ NRR.*

### **5.1 \- 5.6 The Tactical Ledger \[Automated Scraped Signals\]**

* **5.1 Loyalty Infrastructure:** has\_client\_login, has\_support\_portal.  
* **5.2 Referral Logic:** referral\_program\_detected.  
* **5.3 Community Nodes:** has\_community\_link (Discord/Slack/Circle).  
* **5.4 Expansion Signals:** expansion\_triggers\_detected.

### **5.7 \- 5.8 The Architectural EKG \[Systemic Metrics\]**

* **5.7 Managed Nervous System:** **\[Consultant Input\]** Telemetry tracking for customer health/usage.  
* **5.8 Reselling Automation:** **\[Consultant Input\]** Logic for "Champion Movement" tracking.

## **Appendix: Full Revenue Journey Assessment Schema (Supabase)**

create table public.revenue\_journey\_assessments (  
  assessment\_id uuid not null default gen\_random\_uuid (),  
  lead\_uuid character varying(100) not null,  
  business\_url text not null,  
  dedupe\_key character varying(64) not null,  
  assessment\_run\_number integer null default 1,  
  assessment\_date timestamp with time zone null default now(),  
  workflow\_1\_completed\_at timestamp with time zone null,  
  workflow\_2\_completed\_at timestamp with time zone null,  
  source character varying(50) null,  
  user\_email character varying(255) null,

  \-- TECHNICAL VITALS  
  business\_title text null,  
  business\_meta\_description text null,  
  business\_canonical\_url text null,  
  business\_language character varying(10) null,  
  business\_loaded\_url text null,  
  business\_http\_status integer null,  
  business\_has\_ssl boolean null default false,  
  business\_has\_json\_ld boolean null default false,  
  business\_screenshot\_url text null,  
  business\_screenshot\_captured\_at timestamp with time zone null,  
  business\_scrape\_success boolean null default false,  
  payload\_size\_kb integer null,  
  is\_self\_hosted boolean null,  
  is\_ai\_ready boolean null,

  \-- PLATFORM PRESENCE (BOOLEAN)  
  total\_platforms\_submitted integer null default 0,  
  platforms\_list text\[\] null,  
  has\_instagram boolean null default false,  
  has\_twitter boolean null default false,  
  has\_linkedin boolean null default false,  
  has\_facebook boolean null default false,  
  has\_tiktok boolean null default false,  
  has\_youtube boolean null default false,  
  has\_gbp boolean null default false,  
  has\_reddit boolean null default false,  
  has\_pinterest boolean null default false,

  \-- INSTAGRAM DEEP DATA  
  instagram\_url text null,  
  instagram\_username character varying(100) null,  
  instagram\_full\_name text null,  
  instagram\_biography text null,  
  instagram\_external\_url text null,  
  instagram\_verified boolean null default false,  
  instagram\_is\_private boolean null default false,  
  instagram\_followers\_count integer null,  
  instagram\_following\_count integer null,  
  instagram\_posts\_count integer null,  
  instagram\_latest\_post\_date timestamp with time zone null,  
  instagram\_post\_frequency\_days numeric(10, 2\) null,  
  instagram\_has\_reels boolean null default false,  
  instagram\_engagement\_rate\_estimate numeric(5, 2\) null,  
  instagram\_activity\_status text null,

  \-- TWITTER DEEP DATA  
  twitter\_url text null,  
  twitter\_username character varying(100) null,  
  twitter\_verified boolean null default false,  
  twitter\_followers\_count integer null,  
  twitter\_following\_count integer null,  
  twitter\_tweets\_count integer null,  
  twitter\_latest\_tweet\_date timestamp with time zone null,  
  twitter\_tweet\_frequency\_days numeric(10, 2\) null,  
  twitter\_activity\_status text null,

  \-- LINKEDIN DEEP DATA  
  linkedin\_url text null,  
  linkedin\_full\_name text null,  
  linkedin\_headline text null,  
  linkedin\_connections\_count integer null,  
  linkedin\_followers\_count integer null,  
  linkedin\_company\_name text null,  
  linkedin\_has\_recent\_activity boolean null default false,  
  linkedin\_activity\_status text null,

  \-- FACEBOOK DEEP DATA  
  facebook\_url text null,  
  facebook\_page\_name text null,  
  facebook\_likes\_count integer null,  
  facebook\_followers\_count integer null,  
  facebook\_latest\_post\_date timestamp with time zone null,  
  facebook\_activity\_status text null,

  \-- TIKTOK DEEP DATA  
  tiktok\_url text null,  
  tiktok\_followers\_count integer null,  
  tiktok\_likes\_count bigint null,  
  tiktok\_videos\_count integer null,  
  tiktok\_activity\_status text null,

  \-- YOUTUBE DEEP DATA  
  youtube\_url text null,  
  youtube\_subscribers\_count integer null,  
  youtube\_views\_count bigint null,  
  youtube\_activity\_status text null,

  \-- GOOGLE BUSINESS PROFILE (GBP)  
  gbp\_url text null,  
  gbp\_rating numeric(3, 2\) null,  
  gbp\_reviews\_count integer null,  
  has\_google\_business\_profile boolean null default false,

  \-- CONNECTIVITY MATRIX  
  has\_instagram\_in\_bio boolean null default false,  
  has\_twitter\_in\_bio boolean null default false,  
  has\_linkedin\_in\_bio boolean null default false,  
  has\_facebook\_in\_bio boolean null default false,  
  has\_tiktok\_in\_bio boolean null default false,  
  has\_youtube\_in\_bio boolean null default false,  
  link\_in\_bio\_url text null,  
  link\_in\_bio\_service text null,  
  unified\_ecosystem\_score integer null default 0,  
  connectivity\_matrix jsonb null default '{}'::jsonb,

  \-- STAGE 2: CONSIDERATION  
  consideration\_roi\_calculator\_detected boolean null,  
  has\_lead\_magnet boolean null,  
  has\_newsletter\_signup boolean null,  
  has\_contact\_form boolean null default false,  
  count\_case\_studies integer null default 0,  
  consideration\_has\_testimonials boolean null default false,  
  has\_intent\_tracking boolean null,

  \-- STAGE 3: DECISION  
  decision\_pricing\_page\_detected boolean null,  
  has\_pricing\_page boolean null default false,  
  has\_instant\_booking boolean null,  
  has\_calendly boolean null default false,  
  qualification\_field\_presence boolean null default false,  
  has\_privacy\_policy boolean null,  
  has\_cookie\_banner boolean null,

  \-- STAGE 4 & 5: CONVERSION & RETENTION  
  conversion\_mobile\_optimized boolean null default false,  
  has\_stripe\_integration boolean null default false,  
  has\_docusign\_link boolean null default false,  
  has\_client\_login boolean null default false,  
  has\_community\_link boolean null default false,  
  referral\_program\_detected boolean null default false,

  \-- CALCULATED MACHINE SCORES  
  stage\_1\_automated\_score integer null,  
  stage\_2\_automated\_score integer null,  
  stage\_3\_automated\_score integer null,  
  stage\_4\_automated\_score integer null,  
  stage\_5\_automated\_score integer null,  
  overall\_machine\_score\_percentage integer null default 0,  
  overall\_tier\_automated character varying(20) null,

  \-- HUMAN INPUT / CONSULTANT DISCOVERY (H\_ FIELDS)  
  h\_awareness\_first\_party\_data\_strategy text null,  
  h\_consideration\_lead\_scoring\_system text null,  
  h\_decision\_pricing\_transparency text null,  
  h\_conversion\_quote\_to\_cash\_process text null,  
  h\_conversion\_activation\_milestones text null,  
  h\_retention\_nrr\_tracking text null,  
  h\_retention\_expansion\_playbook text null,  
  frankenstein\_index integer null,  
  governance\_score integer null,  
  decision\_velocity\_days float null,

  \-- METADATA  
  created\_at timestamp with time zone null default now(),  
  updated\_at timestamp with time zone null default now(),  
    
  constraint revenue\_journey\_assessments\_pkey primary key (assessment\_id),  
  constraint revenue\_journey\_assessments\_dedupe\_key\_key unique (dedupe\_key)  
);  


[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAZCAYAAADaILXQAAABbUlEQVR4Xu1Tu0oDQRRdIRZWIoIS9zH7KLVbLBQsBWtbP8DGv8gPhCAIYi+kTeMniPsB1oKNCrFKYeHjnOTOMLluICEWFnvgsjPn3Dn37jyCoMGiMMZ8pWna1fzSiKJoDebfiDetLQUaJ0lyB+MRC2C8q3PqgNwe4kbzU8BWnCBpyETpvgN6Ref5QAMbyKsQZ1qbAhLeEQcYtvC9nacATZnHIlpzKMtylYYYtjhnETF/RmQq3cHIX2reQYz7gRhbgPuwBXyeKIpiC3xbcnhGHLd1nu3ytYbvi/nMzkSvNO9A4ziOjzQv13IgBhdal8OkNvMweXgDGmmBgMEx9E/EY5Zl20orwY/49XkHCjTQvIV39391z44RVe1NwVbsQXzRvIb3at3e2/uNt3HOOf8K4we3COKlmdzt6zlibB6G4aas5e14QoP7Mu+g4JVvPl6wYNzneb4u60/N5EUPUTRyxn8FGB+i+x3NN2jwD/ADoZd+Ui6eWMsAAAAASUVORK5CYII=>