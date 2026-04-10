# Workspace Rules: richardnorwood.com

## Overview
This is the personal website microservice for Richard Norwood. It follows strict VDO (Value Delivery Office) hygiene and architectural standards.

## Project Guidelines
- **250-Line Mandate**: No file should exceed 250 lines.
- **Microservice Architecture**: Standalone service with no external SaaS logic.
- **Revenue Journey**: All features align with the 5-Stage Revenue Journey (Awareness → Retention).

## Key Documentation
- [Standards & Pillars](./docs/standards.md)
- [Workflows (Master Orchestrator)](./docs/workflows.md)
- [Detailed Workflow Steps](./docs/detailed-workflows.md)
- [Consulting "Actor" Workflow](./docs/consulting-workflow.md)

## Common Validation Checklist
- [ ] Passes `npm run lint`.
- [ ] Passes `npm run build`.
- [ ] Screenshots captured (desktop + mobile).
- [ ] No console errors.

---

## VDO Audit Entry Log
*   **2026-04-09**: **VDO AUDIT FAIL (Hygiene)**. 40 violations detected. Refactoring required for `GEMINI.md`, `Sections.module.css`, and core UI components. [See full report](D:/audits/richardnorwood.com-audit.md)
*   **2026-04-09**: **VDO AUDIT PASS (Documentation)**. `GEMINI.md` modularized and split into `docs/`. Baseline VDO standards applied.
*   **2026-04-10**: **VDO AUDIT PASS (Complete)**. 100% hygiene compliance achieved. Consulting funnel (Intake -> Discovery -> Dashboard) fully implemented and standardized.
