# WORKBOOK.md: richardnorwood.com (Production Readiness & Security)

## 1. User Personas & Stories
- **User Personas**: 
  - **Prospects**: B2B Leaders seeking revenue architecture.
  - **Active Clients**: Utilizing the portal for strategy.
  - **System Administrator**: Managing the engine and data.
- **User Story 1**: As a Prospect, I want to see visual proof of the Revenue Journey, so that I can validate the methodology.
- **User Story 2**: As an Active Client, I want to access my provisioned dashboard, so that I can monitor my engine's health.

## 2. Identity & Access
- [x] **IAM Roles**: Supabase RLS policies enforced for all table access.
- [ ] **Identity Management**: MFA recommended for admin-level Supabase access.
- [x] **Service Accounts**: `SUPABASE_AUTH_SERVICE_KEY` used for server-side operations only.
- [ ] **Access Control**: Identity-Aware Proxy (IAP) consideration for internal dashboards.

## 3. Infrastructure & Resources
- [x] **Hierarchy**: Microservice deployed on Vercel with dedicated Supabase project.
- [x] **Asset Inventory**: Documented in `walkthrough.md`.
- [ ] **Compute Security**: Binary Authorization for Vercel deployments.
- [x] **Patch Management**: Automated via `npm` and GitHub Dependabot.

## 4. Network & Data Security
- [ ] **Perimeter**: Vercel Firewall/WAF configured for public routes.
- [x] **VPC Service Controls**: Network isolation via API secrets.
- [x] **Zero Trust**: All interactions via secure API routes.
- [ ] **Encryption**: Customer-Managed Encryption Keys (CMEK) for Supabase.
- [x] **Classification**: Lead data classified as "Confidential"; handled via secure HTTPS.
- [x] **Residency**: Data stored in us-east-1 (Supabase/Vercel standard).

## 5. Reliability & Ops (Performance & SLIs/SLOs)
- [ ] **SLIs/SLOs**: 
  - **LCP**: < 2.5s (tracked via Vercel Speed Insights).
  - **Availability**: 99.9% (Vercel/Supabase edge).
- [ ] **Disaster Recovery**: RPO < 24h (Backups); RTO < 4h (Redeploy).
- [x] **Redundancy**: Multi-region edge network active via Vercel CDN.
- [x] **Observability**: Vercel Logs and Supabase Audit Logs active.

## 6. Operational Excellence
- [x] **CI/CD**: Automated GitHub Actions pipeline for linting and build.
- [ ] **IaC**: Terraform templates planned for future dashboard provisioning.
- [ ] **Documentation**: `Gemini.md` and `walkthrough.md` updated after every deployment.
