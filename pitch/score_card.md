# Score Card: DevNetwork AI + ML Hackathon 2026

## Assumptions
- Hackathon duration: online May 11-28, with final deadline May 28, 2026 10:00 AM PDT.
- Theme: AI/ML products with sponsor challenges.
- Team capability: small full-stack team, strong frontend, API integration, automation, and pitch/video production.
- Target: maximize expected prize value by qualifying for as many sponsor tracks as possible without making a stitched-together demo.

---

## Winner Autopsies

### Autopsy 1
- Project: Baymax, Your Personal Healthcare Companion.
- Source: HackathonHunter winner atlas, TreeHacks 2024 pattern.
- Prize / platform: Grand Prize and senior-focused sponsor prize.
- Raw user pain: an impaired user cannot complete a simple physical action without help.
- Hero loop: voice request, pill identification, mouth tracking, and robot arm action.
- Technical hard part: live perception plus physical actuation.
- Sponsor/domain primitive: hardware and computer vision were visible, not decorative.
- Proof surface: the room could watch the action complete.
- Why judges cared: the demo restored a blocked human action.
- Portable pattern: make one concrete pain physically visible, then close the loop on stage.
- Clone trap: a health chatbot or medicine FAQ.

### Autopsy 2
- Project: dockerc.
- Source: HackathonHunter winner atlas, TreeHacks 2024 pattern.
- Prize / platform: Most Technically Complex.
- Raw user pain: Docker distribution requires too many brittle runtime steps.
- Hero loop: turn an image into one executable.
- Technical hard part: packaging, file-system mechanics, and startup behavior.
- Sponsor/domain primitive: developer workflow compression.
- Proof surface: command-line output and reproducible artifact.
- Why judges cared: one command replaced a setup maze.
- Portable pattern: compress a workflow and expose the hard systems detail.
- Clone trap: a dashboard that only explains deployment status.

### Autopsy 3
- Project: Trace.
- Source: HackathonHunter winner atlas, DoraHacks Actian VectorAI DB pattern.
- Prize / platform: first place in a sponsor database challenge.
- Raw user pain: family descriptions and examiner records do not share vocabulary.
- Hero loop: domain query bridges two vocabularies and returns inspectable matches.
- Technical hard part: vector spaces, ranking, filters, deterministic ids, tests.
- Sponsor/domain primitive: sponsor database was the architecture, not a badge.
- Proof surface: reproducible query, status, and architecture evidence.
- Why judges cared: technical choices were tied to one brutal user problem.
- Portable pattern: build a translation bridge where sponsor tech is necessary.
- Clone trap: generic RAG over PDFs.

---

## Idea 1: Safe-but-strong

Project name: LarkLens

One-sentence description: A developer workflow that turns AI retail bug reports into Lark replay tests and repair-ready evidence.

Core concept: A QA operator pastes a bug report or support ticket, and the system creates a Lark workflow that reproduces the issue, captures screenshots/logs, and hands an agent a repair checklist.

Why it fits this hackathon: It is very aligned with Lark and TrueFoundry, and can use Crusoe Nemotron for agent reasoning.

Domain fidelity: Developer tooling and QA workflows are concrete: issue intake, reproduction, run logs, pass/fail status, and repair loops.

Target users: QA engineers, support engineers, small AI product teams.

User cases:
- A support engineer turns a vague "try-on fails on mobile" report into a reproducible Lark workflow.
- A QA lead groups failing journeys by root cause and reruns them after a fix.
- A founder checks whether their AI agent keeps responding during provider brownouts.

Showmanship design:
- First screen: incident intake board with a real failing shopper journey.
- Coolness source: report becomes a replayable workflow in one command.
- Audience participation: judge can type a new bug report and see a workflow generated.
- Demo climax: Lark run artifact appears with screenshots and logs.
- Big-screen elements: red-to-green run timeline.
- 15-second shareable clip: issue report turns into passing workflow.

Magic moment demo: Paste a bug report, click `Create replay`, and a Lark workflow appears with a run id and screenshot artifact.

Why it is not an AI wrapper: The value is the workflow artifact, replay evidence, and repair loop; the model only converts ambiguous reports into deterministic tests.

MVP scope: Devpost-ready web app with issue intake, workflow generation, run status, and resilience panel.

Technical implementation:
- Frontend: Next.js App Router, operational-dashboard UI.
- Backend: Next.js Route Handlers, D1 for reports, KV for run cache.
- AI / ML: Crusoe Nemotron for report-to-test planning.
- Domain API / data / device: Lark CLI/API, support ticket text.
- Real-time: run status polling.
- Visualization: replay timeline.
- Sponsor API: Lark, TrueFoundry, Crusoe.
- Other integrations: GitHub issue link optional.

Winner research hook:
- Winner autopsy basis: dockerc.
- Why that project won: workflow compression.
- Portable pattern translated: bug report to reproducible workflow.
- Clone trap avoided: passive QA dashboard.
- Observed winner pattern: developer leverage.
- New domain translation: AI retail QA.
- What is visibly live: workflow run id and artifact.
- Sponsor/domain primitive: Lark workflow.
- Proof after demo: Lark dashboard link and captured screenshots.
- Platform packaging plan: Devpost story with before/after run proof.

Biggest risk: It misses Perfect Corp's consumer-experience prize.

Risk mitigation: Use a Perfect-powered try-on flow as the target app under test, but that may still feel secondary.

Scores:
- Hackathon Fit: 8
- Novelty: 7
- User Value: 8
- Demo Wow: 7
- Cool Factor: 7
- Feasibility: 9
- Technical Depth: 8
- Anti-wrapper Strength: 9
- Sponsor Alignment: 8
- Storytelling: 7
- Expansion Potential: 8
- Winner Pattern Strength: 9
- Proof Surface Strength: 9
- Platform Packaging Strength: 8
- Total: 112 / 140

---

## Idea 2: Weird-but-memorable

Project name: CrowdMirror

One-sentence description: A QR-scanned live shopping mirror where the audience votes a shopper into an outfit, then the system generates a try-on and recommendation receipt.

Core concept: A stage or online audience scans a QR code, picks a style brief, and watches Perfect Corp try-on results update in a shared retail mirror.

Why it fits this hackathon: It nails Perfect Corp's consumer experience brief and has high stage impact.

Domain fidelity: Retail conversion, product discovery, and interactive shopping are native to Perfect Corp's API suite.

Target users: beauty/fashion retailers, event marketers, shoppers.

User cases:
- A shopper uploads a selfie and sees a look adapted to their skin or outfit.
- A retail team runs an in-store vote to pick a launch look.
- A brand manager exports the final recommendation card.

Showmanship design:
- First screen: full-bleed virtual mirror with live audience votes.
- Coolness source: room input changes the shopper result.
- Audience participation: QR vote changes the demo.
- Demo climax: before/after try-on flips with product cards.
- Big-screen elements: vote particles and split-screen mirror.
- 15-second shareable clip: audience vote instantly changes a look.

Magic moment demo: Three audience votes land, the mirror locks the winning look, and a try-on image appears.

Why it is not an AI wrapper: The loop is camera/photo input, vote state, try-on result, and retail recommendation.

MVP scope: QR vote, image upload, Perfect API call, result card, export.

Technical implementation:
- Frontend: mobile-first QR flow plus big-screen mirror.
- Backend: route handlers and KV/D1 vote state.
- AI / ML: Perfect Corp API, optional Crusoe copy agent.
- Domain API / data / device: camera/photo upload.
- Real-time: vote updates.
- Visualization: mirror split and vote stream.
- Sponsor API: Perfect Corp.
- Other integrations: optional Lark QA test.

Winner research hook:
- Winner autopsy basis: Baymax.
- Why that project won: a physical/live-world loop made value obvious.
- Portable pattern translated: the room visibly changes the shopping result.
- Clone trap avoided: static product recommender.
- Observed winner pattern: participatory story.
- New domain translation: retail audience mirror.
- What is visibly live: QR votes and try-on output.
- Sponsor/domain primitive: Perfect virtual try-on.
- Proof after demo: session card and generated result.
- Platform packaging plan: video-first Devpost story.

Biggest risk: It does not naturally satisfy Lark and TrueFoundry, reducing total prize reach.

Risk mitigation: Add a backstage reliability panel, but that may dilute the consumer story.

Scores:
- Hackathon Fit: 8
- Novelty: 8
- User Value: 7
- Demo Wow: 10
- Cool Factor: 10
- Feasibility: 7
- Technical Depth: 7
- Anti-wrapper Strength: 8
- Sponsor Alignment: 7
- Storytelling: 9
- Expansion Potential: 8
- Winner Pattern Strength: 8
- Proof Surface Strength: 7
- Platform Packaging Strength: 8
- Total: 112 / 140

---

## Idea 3: Ambitious-but-demoable

Project name: MirrorRun

One-sentence description: A retail launch room that creates a live try-on journey, then proves the journey survives broken model and tool servers.

Core concept: MirrorRun gives a retailer one control room for a shopper-facing AI/AR try-on flow and the reliability evidence behind it. A shopper uploads a photo, Perfect Corp generates the visual result, a Crusoe Nemotron Hermes agent builds the recommendation and test plan, TrueFoundry handles resilience/fallback telemetry, and Lark creates/runs the replay workflow.

Why it fits this hackathon: It targets every visible sponsor challenge with one coherent product: better AI retail experiences that can actually survive launch day.

Domain fidelity: Retail teams do not only need a pretty try-on; they need conversion-safe journeys, reproducible QA, provider failover, and proof for stakeholders.

Target users: AI retail product teams, e-commerce growth teams, QA leads, consumer brand founders.

User cases:
- A retail PM launches a new try-on journey and gets shopper result plus reliability receipt.
- A QA lead turns the same hero flow into a Lark replay test.
- An engineering lead flips a failure switch and sees the journey degrade gracefully instead of going blank.

Showmanship design:
- First screen: split-screen mirror and reliability control room.
- Coolness source: beauty try-on plus agent recovery proof in the same stage moment.
- Audience participation: judge scans QR, runs a mobile shopper path, then watches the desktop control room update.
- Demo climax: provider/MCP failure appears, yet the shopper receives a safe fallback and the run is marked recovered.
- Big-screen elements: before/after mirror, agent trace, chaos toggle, replay receipt.
- 15-second shareable clip: `Try-on generated -> model fault injected -> customer still receives a recommendation -> Lark replay saved`.

Magic moment demo: While the try-on result is visible, the operator toggles `MCP failure`; the control room reroutes, shows a TrueFoundry resilience event, and opens the matching Lark workflow artifact.

Why it is not an AI wrapper: The product loop includes image upload, retail try-on, persistent launch session, workflow replay, failure handling, and audit receipts. AI is one required decision layer, not the whole product.

MVP scope: One polished shopper path, one operator control room, one Lark replay, one resilience fault mode, and one proof detail page.

Technical implementation:
- Frontend: Next.js App Router with editorial retail mirror and operations cockpit.
- Backend: Cloudflare-compatible Route Handlers, D1 sessions, R2 uploads/results, KV status cache.
- AI / ML: Crusoe Managed Inference with Nemotron for the Hermes/NemoClaw planning agent.
- Domain API / data / device: Perfect Corp YouCam API for skin/look/clothes try-on or one equivalent API available under the hackathon credits.
- Real-time: Server-Sent Events for agent trace and run status.
- Visualization: launch timeline, provider health strip, before/after media, replay receipt.
- Sponsor API: Crusoe, Perfect Corp, TrueFoundry, Lark.
- Other integrations: optional GitHub issue export after deadline.

Winner research hook:
- Winner autopsy basis: Trace + dockerc + Baymax.
- Why that project won: sponsor primitive was structurally necessary, workflow compression was visible, and the demo closed a concrete loop.
- Portable pattern translated: launch a consumer AI experience and prove it can be replayed and recovered.
- Clone trap avoided: a generic AI shopping chatbot or static DevOps dashboard.
- Observed winner pattern: sponsor primitive as architecture plus public proof surface.
- New domain translation: AI retail launch readiness.
- What is visibly live: try-on output, fault event, Lark run, agent trace.
- Sponsor/domain primitive: Perfect API, Crusoe Nemotron, TrueFoundry Gateway, Lark workflow.
- Proof after demo: result image, session id, workflow id, gateway event, deploy URL.
- Platform packaging plan: Devpost story starts with a shopper failure that costs conversion, then shows the recovered journey.

Biggest risk: Four sponsor integrations could exceed the remaining time.

Risk mitigation: Build one hero path only; if a key is missing, mark the affected sponsor flow blocked and do not fake it. Keep each integration thin but real.

Scores:
- Hackathon Fit: 10
- Novelty: 9
- User Value: 9
- Demo Wow: 9
- Cool Factor: 9
- Feasibility: 7
- Technical Depth: 9
- Anti-wrapper Strength: 9
- Sponsor Alignment: 10
- Storytelling: 10
- Expansion Potential: 9
- Winner Pattern Strength: 9
- Proof Surface Strength: 10
- Platform Packaging Strength: 10
- Total: 129 / 140

---

## Recommended Pick
I recommend: MirrorRun.

Why: It is the only finalist that can credibly pursue Overall plus every listed sponsor prize without feeling like four unrelated demos. It has a consumer "wow" surface for Perfect Corp, a developer/reliability proof surface for Lark and TrueFoundry, and a natural agent backbone for Crusoe.

48-hour build path:
- Hour 0-2: create app shell, upload/session model, and sponsor key smoke tests.
- Hour 2-6: build shopper mirror and Perfect API call.
- Hour 6-10: wire Crusoe Nemotron planning stream.
- Hour 10-14: add Lark workflow generation/invocation.
- Hour 14-18: add TrueFoundry gateway/fault evidence.
- Hour 18-24: polish UI, receipts, e2e path, and deployment.

Demo script:
1. "Retail teams can make beautiful try-on demos, but launch day breaks when the model or tool server fails."
2. Shopper uploads a photo and receives a try-on result.
3. Operator sees the Nemotron agent plan and reliability checklist.
4. Operator injects provider/MCP failure.
5. MirrorRun keeps the shopper journey alive and writes a Lark replay receipt.
6. Final frame shows the proof page: image, agent trace, gateway event, Lark workflow id, and deploy URL.
