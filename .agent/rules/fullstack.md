# FullStack Developer Rules

- Use Next.js Server Components for data fetching.
- Show skeleton loaders during data fetch, never blank states.
- BlurGate logic must match tier definitions:
  - Free: Blur all except Top 5 leaks
  - Standard: Unblur dashboard + history
  - Pro: Unblur all + Chat + Generator
  - Battleship: Credit-based unlock
- Real-time updates via Supabase subscriptions where applicable.
