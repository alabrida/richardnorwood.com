# The Digital Sales Architect's Revenue Journey Rubric v2.0

> An optimized online presence is a **Digital Sales Channel** that accompanies customers through a non-linear journey. A healthy revenue journey is detectable through specific **Volume (VM), Conversion (CR), and Time (Δt) metrics**.

---

## Scoring Tiers (Doctrine-Aligned)

| Tier | Score | Description |
|------|-------|-------------|
| **Fragmented** | 0-40 | "Isolated musicians who have never practiced together" |
| **Emerging** | 41-60 | "Revealing the first indicators" of cohesion |
| **Orchestrated** | 61-80 | "Performing in harmony" across platforms |
| **Unified** | 81-100 | True "Unified Commercial Engine" |

---

## Stage 1: Awareness (Initial Discovery)
*Lack of these indicators suggests your business is "invisible" to 83% of the buyer journey.*

### 1.1 Active Multi-Platform Presence (Weight: 15%)
**Definition:** Detectable activity on at least two relevant social platforms using education-centric content.

**Automated Signals:**
- Platform count from submitted URLs
- Activity recency per platform (see thresholds below)

**Scoring:**
- 3+ active platforms = 100%
- 2 active platforms = 70%
- 1 active platform = 30%

---

### 1.2 Branded Link-in-Bio/Microsite (Weight: 12%)
**Definition:** A professional "social hub" that reduces friction by showing all relevant links.

**Automated Signals:**
- Link-in-bio URL exists in profile
- Link resolves (HTTP 200)
- Contains multiple outbound links
- Uses recognized service (Linktree, Stan, Beacons, Carrd)

**Scoring:**
- Full hub with 5+ links = 100%
- Basic hub with 2-4 links = 70%
- Single link to business site = 40%
- No link-in-bio = 0%

---

### 1.3 SEO/URL Ranking (Weight: 12%) ⚡ ENHANCED
**Definition:** An owned domain that ranks for brand keywords in search engines.

**Automated Signals:**
- SERP API check for brand name + domain
- Ranking position (1-10 = strong, 11-50 = moderate, 50+ = weak)
- Meta description length and quality
- Canonical URL present

**Scoring:**
- Top 10 ranking + strong meta = 100%
- Top 50 ranking + meta present = 60%
- Not ranking but meta present = 30%
- Not found = 0%

---

### 1.4 Signal Enrichment (Weight: 8%)
**Definition:** Use of technology to track anonymous visitors and dark funnel communities.

**Automated Signals:** ❌ Requires human input
- Analytics integration (partial detection via scripts)

---

### 1.5 Short-form Video Usage (Weight: 15%)
**Definition:** Consistent use of Reels, Shorts, or TikToks to showcase brand personality.

**Automated Signals:**
- Video post count in recent activity
- TikTok profile presence
- YouTube Shorts detection
- Instagram Reels detection

**Scoring:**
- Active video across 2+ platforms = 100%
- Active video on 1 platform = 60%
- Has videos but stale = 30%
- No video content = 0%

---

### 1.6 First-Party Data Strategy (Weight: 13%)
**Definition:** Presence of early-stage conversion offers to capture email addresses.

**Automated Signals:**
- Newsletter signup form detected
- Email capture in bio
- Lead magnet mentions
- JSON-LD ContactPoint schema

**Scoring:**
- Dedicated email capture + lead magnet = 100%
- Email capture present = 60%
- Newsletter mentioned in bio = 30%
- None detected = 0%

---

### 1.7 Unified Commercial Ecosystem (Weight: 25%) 🆕 NEW
**Definition:** Measures transition from "fragmented operations" to a "Unified Commercial Engine."

#### 1.7a Platform Connectivity (50% of indicator)
**Automated Signals:**
- Bidirectional links between platforms
- Link-in-bio hub connects all properties
- Business site links to all claimed socials
- Social profiles cross-reference each other

**Scoring:**
- Complete connectivity matrix = 100%
- 75%+ connected = 75%
- 50%+ connected = 50%
- <50% connected = 25%

#### 1.7b Brand Consistency (50% of indicator)
**Automated Signals:**
- Profile image hash similarity
- Bio/tagline semantic similarity
- Display name consistency
- Activity recency across all platforms

**Platform-Specific Activity Thresholds:**

| Platform | Active | Stale |
|----------|--------|-------|
| Twitter/X | ≤7 days | >30 days |
| Instagram | ≤14 days | >45 days |
| TikTok | ≤7 days | >30 days |
| LinkedIn | ≤21 days | >60 days |
| Facebook | ≤14 days | >45 days |
| YouTube | ≤30 days | >90 days |
| Pinterest | ≤14 days | >45 days |
| Business Blog | ≤60 days | >180 days |

---

## Stage 2: Consideration (Evaluation Phase)
*Lack of these indicates a "maturity gap" where prospects cannot find evidence.*

### 2.1 Digital Sales Channel Architecture (Weight: 25%)
**Automated Signals:**
- JSON-LD schema presence and complexity
- Multiple page types detected
- Navigation depth > 1 level

---

### 2.2 Interactive Impact Tools (Weight: 15%)
**Automated Signals:**
- ROI calculator page detection
- Interactive form presence
- Demo/booking widget detection

---

### 2.3 Evidence-Based Content (Weight: 20%) ⚡ ENHANCED
**Definition:** Accessible case studies and detailed service descriptions.

**Automated Signals:**
- Case study page detection
- Blog post presence
- **Blog post dates for content freshness**
- Service description length

**Content Freshness Scoring:**
- Latest post ≤30 days = Fresh
- Latest post 31-90 days = Current
- Latest post 91-180 days = Aging
- Latest post >180 days = Stale

---

### 2.4 Automated Lead Nurturing (Weight: 15%)
**Automated Signals:** ❌ Requires human input

---

### 2.5 Defined Lead Scoring (Weight: 10%)
**Automated Signals:** ❌ Requires human input

---

### 2.6 First-Party Consent Collection (Weight: 15%)
**Automated Signals:**
- Privacy policy page detected
- Cookie consent banner
- GDPR/CCPA compliance indicators
- SSL certificate valid

---

## Stage 3: Decision (Final Validation)
*Lack of these signals high "friction," causing up to 71% abandonment.*

### 3.1 User-Generated Social Proof (Weight: 25%)
**Automated Signals:**
- Follower count thresholds
- Engagement rate calculation
- Review count (if detectable)
- Testimonial section on site

---

### 3.2 Retargeting Campaigns (Weight: 15%)
**Automated Signals:** ❌ Requires human input

---

### 3.3 Transparent Pricing/Competitor Matrix (Weight: 15%)
**Automated Signals:**
- Pricing page detected
- Menu in JSON-LD schema
- Price-related keywords in content

---

### 3.4 Reputation Management System (Weight: 20%) ⚡ ENHANCED
**Definition:** Evidence of review management and authentic engagement.

**Automated Signals:**
- Verified account status
- Google Business Profile presence
- **Google reviews → business site link validation**
- Review platform links in link-in-bio
- Response rate indicators

---

### 3.5 Trust/Security Certificates (Weight: 15%)
**Automated Signals:**
- SSL certificate valid
- Security headers present
- Professional domain (not free hosting)

---

### 3.6 Guided Selling Capabilities (Weight: 10%)
**Automated Signals:**
- Multiple CTAs detected
- Chatbot/live chat widget
- Clear contact methods

---

## Stage 4: Conversion (Seamless Activation)
*Lack of these results in "revenue leakage" through air gaps.*

**Note:** Most Stage 4 indicators require human input (Speed to Lead, CPQ, etc.)

### Automatable Signals:
- Mobile viewport test (responsive design)
- Page load speed
- Form functionality test
- External URL validation

---

## Stage 5: Retention (Strategic Partnership)
*Lack of post-sale monitoring leads to high churn.*

**Note:** Most Stage 5 indicators require CRM/financial access.

### Automatable Signals:
- Referral program page detection
- Content posting consistency (ongoing engagement)
- Community platform presence (Discord, Slack, Circle)

---

## Appendix: Connectivity Matrix Example

```
             Business  Instagram  Twitter  LinkedIn  Link-in-Bio
Business        ●          ✓          ✓         ✗          ✓
Instagram       ✓          ●          ✗         ✗          ✓
Twitter         ✓          ✗          ●         ✗          ✓
LinkedIn        ✗          ✗          ✗         ●          ✗
Link-in-Bio     ✓          ✓          ✓         ✗          ●

Legend: ● = self, ✓ = connected, ✗ = not connected
Connectivity Score: 67% (8/12 possible connections)
Gap: LinkedIn not connected to ecosystem
```

---

## Version History
- **v2.0** (2026-01-16): Added indicator 1.7, SERP integration, content freshness, doctrine-aligned tiers
- **v1.0**: Original 30-indicator rubric
