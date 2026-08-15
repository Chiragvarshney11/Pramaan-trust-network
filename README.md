# PRAMAAN — Frontend UI

Frontend-only PRAMAAN product prototype built with React + Vite.

## Included
- Worker and employer flows
- Login/register demo
- Worker profile editing + persistent photo
- PRAMAAN Passport
- 10-second rotating QR verification token
- Responsive animated QR viewer
- Trust Intelligence
- Advanced Review Integrity UI
- Explainable profile `GENUINE` / `FRAUD RISK` signal
- Worker directory
- Requests, messages, documents, disputes and settings screens
- Responsive premium dark/neon UI
- React error recovery boundary

## Important
There is intentionally **no backend or database** in this package. Browser `localStorage` is used for demo persistence.

The fraud/genuine label is a **frontend heuristic/risk signal**, not a real fraud verdict. It considers rating concentration, recent 5-star bursts, timing and review evidence. A production system should combine these with verified employment data, account/network signals and human review.

## Run
```bash
npm install
npm run dev
```
Do not open `index.html` directly.

### Demo accounts
Worker: `worker@pramaan.demo` / `Worker@123`
Employer: `employer@pramaan.demo` / `Employer@123`
