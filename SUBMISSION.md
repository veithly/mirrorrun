# Submission: DevNetwork [AI + ML] Hackathon 2026

Paste-ready answers for Devpost. Do not click Submit until the blocker list at the bottom is empty and the user confirms the final form.

---

## Platform

Devpost

## Submission URL

https://devnetwork-ai-ml-hack-2026.devpost.com/

## Project Name

MirrorRun

## Tagline

Launch a retail try-on journey and keep the proof when providers fail.

## Short Description

MirrorRun gives retail teams one launch room for a shopper try-on path, agent trace, provider health, fault recovery, and QA replay. A session ends with media, recovery evidence, and a receipt the team can inspect after the next deploy.

## Long Description

### What it does

MirrorRun starts with the moment a retail team actually worries about: a shopper scans a QR code, opens a try-on path, and expects the experience to work. The operator sees that same session in a launch room with the media result, provider status, agent plan, fault controls, and a proof receipt tied to one session id.

When a dependency is missing or unhealthy, MirrorRun records the blocker instead of inventing a good-looking result. With sponsor keys installed, the same loop turns into live provider evidence: Perfect Corp produces the consumer-facing try-on output, Crusoe-hosted Nemotron writes the launch recommendation and risk checklist, TrueFoundry captures resilience behavior, and Lark turns the session into a replay workflow for QA.

### How we built it

The app uses Next.js App Router with Cloudflare Workers/OpenNext so the UI, route handlers, storage adapters, and streaming AI calls share one deployment target. Development state is local JSON/media; the production plan uses Cloudflare D1 for sessions, R2 for media, and KV for lightweight provider status.

The visible product has four surfaces: the public landing page, the operator launch room, the phone-first shopper path, and the replay/detail views. Playwright covers the desktop and mobile flows, and the HackathonHunter visual QA scanner checks the actual browser for overflow, broken media, console errors, and small tap targets before screenshots or recording.

### Challenges we ran into

The hard part was keeping the project honest while several sponsor platforms require account creation, email verification, or one-time API key reveal screens. MirrorRun treats those as product evidence, not something to hide: each provider panel can show either a real job/request/workflow id or a credential blocker with the official setup route.

### Accomplishments we're proud of

The project is not a single demo page. It has a shopper route, operator route, replay route, architecture route, Cloudflare deploy plan, bilingual docs, a 5-slide deck, image assets, and browser-level visual QA. The local build currently passes lint, typecheck, production build, six Playwright tests, and eight visual QA route scans across desktop and mobile.

### What we learned

Retail AI demos need two kinds of proof at the same time: the shopper has to see a good result, and the launch team has to know what happened when a provider stalls. Keeping those two views tied to the same receipt makes the product more useful than either a try-on toy or an ops dashboard by itself.

### What's next for MirrorRun

The next milestone is turning the recorded raw walkthrough into the final 3-minute combined pitch-demo and submitting it from the production URL. Sponsor credentials are installed locally and in the deployed Worker; provider panels now show configured status and attach either a real provider receipt or the exact provider error returned by the live endpoint.

## Built With

- Next.js App Router
- React
- TypeScript
- Tailwind CSS as utility plumbing
- Mantine / Radix Themes
- Framer Motion
- lucide-react
- Cloudflare Workers
- OpenNext for Cloudflare
- Cloudflare D1
- Cloudflare KV
- Cloudflare R2
- Crusoe Managed Inference
- Nvidia Nemotron
- Perfect Corp YouCam API
- TrueFoundry AI Gateway
- Lark CLI / MCP
- Playwright
- HyperFrames

## Track / Category

Machine Learning/AI, DevOps, Enterprise

## Sponsor Prize Tracks

- Crusoe: MirrorRun routes launch planning and recovery reasoning through the Crusoe Managed Inference / Nemotron adapter when `CRUSOE_API_KEY` is present. The receipt stores the model and request evidence.
- Perfect Corp: The shopper path is built around a retail try-on journey, with Perfect Corp as the consumer-facing media provider when `PERFECT_API_KEY` and `PERFECT_API_SECRET` are present.
- TrueFoundry: The fault switch and recovery timeline are designed for the Resilient Agents challenge. With `TRUEFOUNDRY_API_KEY`, the gateway event becomes part of the proof receipt.
- Lark: A launch session can become a replay workflow for QA. With `GETLARK_API_KEY`, the receipt stores the workflow id/link.
- Overall Winner: MirrorRun ties concept, progress, and startup feasibility around a concrete retail launch problem.

## Demo URL

https://mirrorrun.veithly.workers.dev

## Repository URL

TODO-PUBLIC-REPO-URL

## Documentation URL

TODO-PUBLIC-REPO-URL/blob/main/docs/ARCHITECTURE.md

## Video URL

TODO-YOUTUBE-WATCH-URL

## Deck / Gallery Assets

- `pitch/deck.pdf`
- `pitch/deck-thumbs/slide-01.png`
- `pitch/deck-thumbs/slide-02.png`
- `pitch/deck-thumbs/slide-03.png`
- `pitch/deck-thumbs/slide-04.png`
- `pitch/deck-thumbs/slide-05.png`
- `pitch/illustrations/devpost-cover.png`
- `docs/screenshots/hero.png`
- `docs/screenshots/flow.png`
- `docs/screenshots/mobile.png`
- `docs/screenshots/architecture.png`

## Team Members

TODO-TEAM-MEMBERS

## Did You Use Any AI?

Yes. AI was used for development assistance, planning, copy review, image generation, and the product's sponsor-agent flow. Architecture decisions, sponsor targeting, and submission choices were human-directed.

## Anything Else

MirrorRun is built to avoid fake proof. If a sponsor account is not connected during judging, the app shows the missing credential and official setup path instead of presenting a fabricated provider result.

## Submit Blockers

- Replace `TODO-PUBLIC-REPO-URL` after repo publication.
- Replace `TODO-YOUTUBE-WATCH-URL` after final combined pitch-demo render and upload.
- Replace `TODO-TEAM-MEMBERS`.
- Run `npm run check:submission` and confirm it exits clean.
- Open the Devpost form while logged in, fill from this file, stop before Submit, and save the confirmation screenshot after user approval.
