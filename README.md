# Guardian Care

Energy intelligence for solar households and the companies that install for them.

| Route | What it is | Theme |
|-------|------------|-------|
| `/` | The platform introducing itself — **Energy, understood.** | Command |
| `/existing` | "I already have solar" — check an existing system | Day |
| `/plan` | "I'm looking for solar or storage" — build an energy plan | Day |
| `/business` | "I'm a solar or energy company" — acquire, capture, retain | Dark |

## The home page

Built around the platform's three products rather than around three audiences:

- **◇ 01 Onsite** — build the system (capture, assess, update)
- **◇ 02 Operations** — run the system (monitor, analyse, operate, notify, support)
- **◇ 03 Customer** — understand your energy (understand, visualise, advise)

Operations is drawn larger than the other two because it is the thing in the
middle that connects them. The cards currently route into the existing journey
pages — Onsite and Operations into `/business`, Customer into `/existing` —
because there are no standalone product pages yet.

It runs on its own surface, `.theme-command`: near-black charcoal, warm white
type, amber instead of the green-to-blue ramp, and near-square corners. That is
scoped to this one route, so the three journey pages keep the system they were
designed in.

## How it is put together

Every journey has the same spine: a guided assessment, a position derived from
the answers, then the explanation that makes the position mean something.

- **`src/components/Assessment/`** — the shared questionnaire engine. One
  question on screen at a time, with a profile filling in beside it. A journey
  supplies `Step[]`; the engine owns nothing but which question is showing.
- **`src/data/`** — what each journey asks and what its answers add up to.
  `platform.tsx` holds the home page's live system, products and architecture;
  `existing.tsx`, `plan.tsx` and `businessFlow.tsx` hold one journey each.
- **`src/pages/<Journey>/`** — the page and its sections. Answers live at the
  page level, because several sections downstream are derived from them.
- **`src/index.css`** — the design tokens. Theming is a class on `<html>`:
  every colour utility compiles to `var(--color-…)`, so `.theme-day` flips a
  whole route — page, chrome, charts and all.

Figures on the consumer journeys are derived, not typed in. The existing-system
day (16.8 kWh generated, 8.7 used in the house, 8.1 exported, 4.2 bought back)
is summed from one pair of hourly series in `src/data/existing.tsx`, so the
tiles, the balance chart, the flow diagram and the savings arithmetic cannot
disagree with each other. Everything an assessment produces is labelled
**estimated** until a system is actually connected.

The same discipline runs across pages. The home page's live reading balances
(14.2 into the house + 5.3 into the battery + 5.3 out to the grid = 24.8 off the
roof), its daily figures balance (14.2 + 5.1 + 5.3 = 24.6), and the portfolio
counts it prints come from the same `CC_KPIS` the business console renders — so
the landing page and the product page describe the same company.

## Workflows

```sh
# Start the development server
npm run dev

# Lint for TypeScript and ESLint errors
npm run lint

# Build and serve the production bundle
npm run build
npm run start
```
