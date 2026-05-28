# Product Requirements Document: MirrorRun

## 1. Project background
MirrorRun is a hackathon-grade but startup-shaped product for DevNetwork [AI + ML] Hackathon 2026.
The event rewards progress, concept, and feasibility.
The sponsor landscape rewards deep use of Crusoe, Perfect Corp, TrueFoundry, and Lark.
The deadline is May 28, 2026 at 10:00 AM PDT.
The strategic goal is to maximize expected prize value, not only cash.
The product must qualify for multiple sponsor challenges without becoming a sponsor-logo checklist.
The selected opportunity is AI retail launch readiness.
Retail teams now launch virtual try-on, skin analysis, fashion personalization, and recommendation journeys.
Those journeys fail when image APIs, LLM calls, MCP tools, or browser tests break.
Most demos hide this fragility behind a single happy path.
MirrorRun makes the shopper experience and the launch proof visible at the same time.
The shopper sees a polished try-on journey.
The operator sees the agent trace, provider health, recovery event, and replay workflow.
The public story is simple: make AI retail experiences beautiful and reliable before shoppers arrive.
The internal build posture is emergency practical: one hero path, one replay path, one recovery path.
The public product must not read as a hackathon prototype.
The public copy must avoid "MVP", "hackathon", "prototype", or stack-first claims.
The submission copy may reference sponsors because Devpost asks for challenge fit.
The app UI should speak to retail product teams, not only developers.
The proof surfaces should speak to sponsors and judges.

## 2. Problem definition
Retailers can create an impressive try-on screenshot quickly.
They struggle to prove the end-to-end shopper journey will survive real traffic.
A product manager cannot see whether a try-on failure is caused by image upload, model reasoning, MCP tool failure, or QA drift.
A QA lead cannot replay a vague support report such as "the look broke on mobile".
An engineering lead cannot show graceful degradation when model infrastructure fails.
A shopper does not care which provider failed; they only see a broken purchase journey.
The current workaround is manual QA plus screenshots plus post-incident guessing.
Manual QA loses exact steps.
Screenshots miss model/tool timing.
Provider dashboards do not explain the user-facing impact.
Generic observability dashboards do not show a retail journey.
Generic AI agents do not create a replayable proof artifact.
The painful moment is launch review: the team has a beautiful demo but no reliability receipt.
MirrorRun solves that moment.
It combines a real shopper path with a proof path.
It shows what happened, what recovered, and how the team can replay it.
The problem is not "recommend better beauty products".
The problem is "launch AI retail flows without blind trust".
The winning demo must make that difference visible in less than 30 seconds.

## 3. Target users
Primary user: AI retail product manager.
The PM owns conversion, launch confidence, and the visible shopper experience.
Secondary user: QA lead.
The QA lead owns reproducible workflows, screenshots, and regression evidence.
Secondary user: engineering lead.
The engineering lead owns model/tool reliability and fallback behavior.
Tertiary user: founder or growth lead at a small e-commerce brand.
The founder wants a product story that can become a startup.
Not a target user: a generic consumer looking for a beauty chatbot.
Not a target user: an infrastructure team that only wants metrics.
The PM needs a launch session.
The QA lead needs a replay workflow.
The engineering lead needs a resilience receipt.
The shopper needs a mobile-first, low-friction try-on.
The judge needs a single story that binds these roles together.

## 4. User pain points
Pain point 1: the shopper path is visually compelling but technically fragile.
Pain point 2: failures are hard to reproduce from support reports.
Pain point 3: model/tool outages are discussed abstractly instead of demonstrated.
Pain point 4: retail teams cannot connect conversion risk to infrastructure health.
Pain point 5: sponsor APIs can be used superficially, which weakens judging.
Pain point 6: a hackathon demo can look like a stack demo instead of a product.
Current workaround: manually run the try-on, take a screenshot, and paste notes into issue trackers.
Why current workaround fails: it does not capture timing, fallback path, workflow id, or result media.
Must-have need: one proof receipt that ties shopper image, try-on output, agent trace, recovery event, and replay id.
Nice-to-have need: export a repair plan for GitHub or Linear.
Delight layer: the judge can trigger failure and watch the shopper path recover instead of blanking.
Trust standard: every external receipt must be real or explicitly marked blocked by missing credentials.
Safety standard: avoid medical skin-care claims and keep recommendations retail/styling oriented.

## 5. Core requirements & priority
REQ-001 P0: The app must create a launch session with a stable session id.
REQ-002 P0: The mobile shopper path must accept an image upload or demo-safe image source.
REQ-003 P0: The product must call Perfect Corp for one real try-on, skin, look, fashion, or equivalent retail visual result when credentials are present.
REQ-004 P0: The product must call Crusoe Managed Inference with a Nemotron model for recommendation and launch checklist planning.
REQ-005 P0: The operator control room must show a readable agent trace and provider health strip.
REQ-006 P0: The product must show a fault/recovery path for LLM or MCP failure without displaying raw JSON as the default surface.
REQ-007 P0: The product must create or prepare a Lark replay workflow from the launch session.
REQ-008 P0: The product must persist a proof receipt containing media, trace, workflow, and recovery evidence.
REQ-009 P1: The detail page must expose a replay command and artifact list.
REQ-010 P1: The app must provide a QR-ready mobile path with touch targets of at least 44 px.
REQ-011 P1: Missing sponsor credentials must block only the dependent flow and display exact env var names plus official key URLs.
REQ-012 P1: The Devpost submission package must include screenshots, video plan, and sponsor challenge mapping.
REQ-013 P2: Export a GitHub or Linear repair plan.
REQ-014 P2: Add multi-catalog product matching.
REQ-015 P2: Add team auth and multi-tenant workspace support.
Priority rule: P0 defines the recorded demo.
Priority rule: P1 improves judging confidence.
Priority rule: P2 is cut if time is short.
No requirement may be represented by fake data in the hero path.
Seed data is allowed only for empty states or credential-blocked local preview.

## 6. Solution overview
MirrorRun has two synchronized experiences.
Experience one is the shopper mirror.
The shopper opens a mobile URL, uploads a photo, chooses a style brief, and receives a result card.
The result card is powered by Perfect Corp when credentials are available.
Experience two is the operator control room.
The operator opens `/app`, starts a launch session, watches the agent trace, and sees provider health.
The Crusoe Nemotron agent produces a recommendation, risk checklist, and replay plan.
The TrueFoundry integration captures gateway or resilience behavior when configured.
The Lark integration creates or prepares a workflow that can replay the shopper path.
All events are stored in a session proof receipt.
The demo is built around one clear question: what happens when the beautiful try-on flow breaks?
MirrorRun answers by showing recovery instead of a blank screen.
The product's long-term wedge is "preflight for AI retail experiences".
The business buyer is a retail team that wants conversion-safe personalization.
The developer buyer is a QA/engineering team that needs reproducible evidence.
The sponsor value is not hidden in code; every sponsor has a visible product role.

## 7. User flows
Flow A: launch session.
Step 1: operator opens `/app`.
Step 2: operator clicks `Start launch session`.
Step 3: system creates `session_id` in D1.
Step 4: system displays QR link for mobile shopper path.
Step 5: operator sees empty proof timeline.
Flow B: shopper try-on.
Step 1: shopper opens `/m/{session_id}` or scans QR.
Step 2: shopper uploads image.
Step 3: shopper picks style brief.
Step 4: backend stores the image in R2.
Step 5: backend calls Perfect Corp if credentials are configured.
Step 6: UI displays before/after result or honest credential blocker.
Flow C: agent planning.
Step 1: backend sends session context to Crusoe Nemotron.
Step 2: agent returns recommendation, checklist, and replay plan.
Step 3: frontend streams the trace into the control room.
Step 4: proof receipt stores model and trace metadata.
Flow D: resilience proof.
Step 1: operator toggles a controlled failure mode.
Step 2: backend routes through the resilience path.
Step 3: UI shows degraded provider/tool state.
Step 4: shopper card remains usable.
Step 5: receipt stores recovery event.
Flow E: Lark replay.
Step 1: operator clicks `Create replay`.
Step 2: backend builds Lark workflow description from session steps.
Step 3: if `GETLARK_API_KEY` is present, workflow is created or invoked.
Step 4: if key is missing, UI displays exact setup instructions.
Step 5: receipt stores workflow id or blocked-key status.

## 8. User Cases (>= 2)
User Case 1 HERO PATH: retail PM launches a shopper try-on journey.
The PM starts a session.
The PM scans the QR link.
The shopper uploads an image.
The result appears beside the control room.
The PM sees one proof receipt with media and agent trace.
This case matters because it creates Perfect Corp and Overall judging value.
User Case 2: QA lead converts the journey into a replayable workflow.
The QA lead opens the session detail page.
The QA lead clicks `Create replay`.
The system creates or prepares a Lark workflow.
The proof receipt shows workflow id, artifacts, and rerun command.
This case matters because it gives Lark a real developer workflow.
User Case 3: engineering lead proves resilience under failure.
The engineering lead toggles a model/tool failure.
The system records failure and recovery.
The shopper path remains usable.
The proof receipt shows gateway or policy evidence.
This case matters because it targets TrueFoundry and feasibility.

## 9. Demo critical path & Hero Moment
Primary demo path should be under 90 seconds of screen time.
1. Open `/app` and start the `Spring Launch` session.
2. Show the QR/mobile shopper path.
3. Upload an image and choose a style brief.
4. Show the try-on result or configured-key proof.
5. Show the Crusoe Nemotron trace creating a recommendation and launch checklist.
6. Toggle `MCP failure` or `LLM brownout`.
7. Show the recovered shopper card.
8. Show the TrueFoundry recovery event.
9. Click `Create replay`.
10. Show the Lark workflow id or exact credential blocker.
Hero Moment 5 seconds:
0:00 — the try-on result is visible and the launch status is green.
0:01 — the operator toggles a failure switch.
0:03 — the health strip shows a failed MCP or LLM dependency.
0:05 — the shopper card remains usable and the proof timeline adds `Recovered`.
Secondary visible beat for combined video:
The proof page shows a single receipt with image result, agent trace, gateway event, and Lark replay id.
The demo must avoid raw JSON as the default visual.
The demo must show visible recovery, not only text saying "fallback worked".

## 10. Pages / modules plan (>= 3 interactive surfaces)
Surface 1: `/`.
Purpose: public product landing page for judges and Devpost reviewers.
Components: `HeroMirror`, `SponsorProofStrip`, `LaunchReceiptPreview`, `VideoCTA`.
Interactive behavior: opens live app and shows screenshot/video links.
Surface 2: `/app`.
Purpose: primary operator control room.
Components: `LaunchSessionPanel`, `ShopperMirror`, `AgentTrace`, `ProviderHealth`, `FaultSwitch`.
Interactive behavior: start session, trigger agent run, inject failure, create replay.
Surface 3: `/m/[sessionId]`.
Purpose: QR/mobile shopper path.
Components: `MobileUpload`, `StyleBriefPicker`, `ResultCard`, `RecoveryBanner`.
Interactive behavior: upload image, choose style, submit, see result.
Surface 4: `/app/session/[id]`.
Purpose: proof receipt detail.
Components: `ProofTimeline`, `MediaEvidence`, `GatewayEventCard`, `LarkReplayCard`.
Interactive behavior: inspect receipt, copy replay command, open artifacts.
Surface 5: `/app/replays`.
Purpose: workflow management.
Components: `ReplayTable`, `RunStatusDrawer`, `CreateWorkflowButton`.
Interactive behavior: generate workflow, invoke rerun, inspect status.
Surface 6: `/about`.
Purpose: architecture and sponsor-fit explanation.
Components: `ArchitectureDiagram`, `DataFlow`, `SponsorUse`.
Interactive behavior: copy smoke commands and open source links.
Route table:
| Route | Responsibility | Primary module |
| --- | --- | --- |
| `/` | Public product story | `HeroMirror` |
| `/app` | Operator control room | `LaunchSessionPanel` |
| `/m/[sessionId]` | QR shopper path | `MobileUpload` |
| `/app/session/[id]` | Proof receipt | `ProofTimeline` |
| `/app/replays` | QA replay workflows | `ReplayTable` |
Minimum for submission: `/`, `/app`, `/m/[sessionId]`, `/app/session/[id]`.
Nice-to-have: `/app/replays` as separate route if time allows.

## 11. Visual direction & UI principles
Visual style lane: `operational-dashboard + beauty-retail editorial`.
Primary UI library: Mantine or Radix Themes for dense controls.
Supporting UI library: shadcn/ui primitives for buttons, cards, dialogs, inputs, labels, skeletons, and toasts.
Supporting visualization library: Recharts or ECharts for health strips and timelines.
Component list: launch session shell, shopper mirror, agent trace, provider health strip, fault switch, replay receipt, mobile upload.
Non-Tailwind visual signature: split-screen mirror/control-room cockpit with editorial receipt cards.
Logo source: `logo-generator` must produce six variants and a final SVG brand pack.
Avatar source: DiceBear `lorelei` or initial-based operator avatars; no emoji glyphs as primary icons.
Generated image assets: UI mockups, OG card, and four deck illustrations.
Generated-image asset plan: UI mockups, OG card, and four deck illustrations.
Hero composition: mirror on the left, reliability proof room on the right.
Visual differentiation note: not a purple AI assistant and not a generic observability dashboard.
Forbidden lookalikes: chatbot app, static try-on gallery, default shadcn admin shell, dark blue SaaS dashboard.
QR mobile access plan: desktop displays QR; mobile opens `/m/[sessionId]` directly.
Mobile primary flow: upload image, select style, submit, read result and recovery note.
Desktop parity plan: desktop has the full proof timeline, provider health, and replay controls.
Motion vocabulary: subtle premium with editorial cuts.
Accessibility: buttons need focus rings; uploads need labels; mobile tap targets must be at least 44 px.
Performance: landing page should stay under 500 KB before media.
Copy principle: public UI says "launch", "recover", "replay", and "receipt"; it avoids "hackathon", "MVP", and model-name hero copy.

## 12. Technical constraints
Framework: latest stable Next.js App Router.
Styling: latest stable Tailwind as utility substrate only.
Backend: Next.js Route Handlers and Server Actions.
Deployment target: Cloudflare Workers through OpenNext.
State: Cloudflare D1 for sessions, events, replays, and receipts.
Media: Cloudflare R2 for uploaded images and generated result images.
Cache: Cloudflare KV for run status and short-lived mobile session state.
Streaming: Server-Sent Events for agent trace and status updates.
Required env: `CRUSOE_API_KEY`.
Official key URL: https://console.crusoecloud.com/request-foundry.
Required env: `CRUSOE_BASE_URL`.
Official docs: https://docs.crusoecloud.com/managed-inference/overview/.
Required env: `CRUSOE_MODEL`.
Hackathon source: https://devnetwork-ai-ml-hack-2026.devpost.com/details/sponsors.
Required env: `PERFECT_API_KEY`.
Official key URL: https://yce.perfectcorp.com/api-console/en/redeem-code/.
Required env: `PERFECT_API_SECRET` if selected endpoint requires it.
Official API page: https://www.perfectcorp.com/business/ai-apis/.
Required env: `TRUEFOUNDRY_API_KEY`.
Official docs: https://www.truefoundry.com/docs/ai-gateway/intro-to-llm-gateway.
Required env: `GETLARK_API_KEY`.
Official key source: https://dashboard.getlark.ai/.
Real data source: user-uploaded media in R2.
Real data source: Perfect Corp API job/result.
Real data source: Crusoe Managed Inference response.
Real data source: TrueFoundry gateway event or policy receipt.
Real data source: Lark workflow id/execution id.
Missing-key policy: show exact blocker and official URL; do not fake hero receipts.
Security: never expose sponsor keys to the client.
Privacy: uploaded images are stored only for the launch session and may be deleted from the receipt view.
Testing: Playwright must cover start session, upload, fault toggle, replay creation, and mobile path.

## PRD coverage matrix
| Requirement | Priority | User case | Route/component | API/server action | Real data source | Contract/state | Test | Deploy evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `REQ-001` | P0 | HERO PATH | `/app` + `LaunchSessionPanel` | `POST /api/sessions` | D1 session row | `LaunchSession` | `tests/hero.spec.ts` | Cloudflare URL + session id | planned |
| `REQ-002` | P0 | HERO PATH | `/m/[sessionId]` + `MobileUpload` | `POST /api/media/upload` | R2 object | `ShopperMedia` | `tests/mobile.spec.ts` | R2 key in receipt | planned |
| `REQ-003` | P0 | HERO PATH | `ShopperMirror` | `POST /api/perfect/try-on` | Perfect Corp result | `TryOnResult` | `tests/perfect.spec.ts` | API job id/result URL | planned |
| `REQ-004` | P0 | HERO PATH | `AgentTrace` | `POST /api/agent/plan` | Crusoe response | `AgentRun` | `tests/agent.spec.ts` | model receipt | planned |
| `REQ-005` | P0 | UC3 | `ProviderHealth` | `GET /api/health/providers` | gateway/provider status | `ProviderStatus` | `tests/resilience.spec.ts` | status event | planned |
| `REQ-006` | P0 | UC3 | `FaultSwitch` | `POST /api/resilience/fault` | TrueFoundry event | `RecoveryEvent` | `tests/resilience.spec.ts` | event id | planned |
| `REQ-007` | P0 | UC2 | `LarkReplayCard` | `POST /api/lark/workflows` | Lark workflow id | `ReplayWorkflow` | `tests/lark.spec.ts` | workflow id | planned |
| `REQ-008` | P0 | all | `/app/session/[id]` + `ProofTimeline` | `GET /api/sessions/[id]/receipt` | D1 + R2 + APIs | `ProofReceipt` | `tests/receipt.spec.ts` | receipt URL | planned |
| `REQ-009` | P1 | UC2 | `/app/replays` | `POST /api/lark/invoke` | Lark execution id | `ReplayExecution` | `tests/lark.spec.ts` | execution id | planned |
| `REQ-010` | P1 | HERO PATH | `/m/[sessionId]` | client route | mobile session state | `MobileSession` | `tests/mobile.spec.ts` | mobile screenshot | planned |
| `REQ-011` | P1 | all | `CredentialBlocker` | `GET /api/config/status` | env status | `CredentialStatus` | `tests/config.spec.ts` | blocker screenshot | planned |
| `REQ-012` | P1 | submission | `SUBMISSION.md` | n/a | docs/screenshots/video URL | `SubmissionPackage` | manual review | Devpost receipt | planned |

## 13. Success metrics
Demo metric: a judge understands the product in 10 seconds.
Demo metric: the hero moment completes in 30 seconds.
Technical metric: at least two external sponsor backbones work with real credentials.
Technical metric: missing credentials are honest blockers, not fake success states.
Technical metric: the proof receipt contains at least four evidence rows.
Product metric: the story explains a buyer and a budget.
Product metric: the product can be described as launch readiness for AI retail.
Sponsor metric: Crusoe model use is visible in the trace.
Sponsor metric: Perfect Corp output is the consumer-facing visual result.
Sponsor metric: Lark workflow is a useful developer artifact.
Sponsor metric: TrueFoundry resilience behavior is visible under failure.
Submission metric: Devpost story starts with user pain, not the stack.
Submission metric: screenshots show the shopper mirror and proof receipt.
Submission metric: video includes pitch and demo because delivery mode is combined.
Quality metric: no public UI copy says "MVP", "hackathon", or "prototype".
Quality metric: no raw JSON appears as the default reviewer-visible surface.

## 14. Risks & Cut list
Risk: four sponsor integrations can exceed the remaining time.
Mitigation: build one hero path and keep every integration thin but real.
Risk: Perfect Corp credentials may not arrive in time.
Mitigation: block the Perfect flow honestly and still show the rest; do not fake try-on output.
Risk: TrueFoundry setup may be slower than the hackathon deadline.
Mitigation: document gateway key blocker and implement local fault path only as internal test evidence, not sponsor proof.
Risk: Lark workflow creation may require dashboard setup.
Mitigation: support CLI login and show exact `getlark` command.
Risk: Crusoe hackathon model alias may differ from official docs.
Mitigation: configure model by env and list both hackathon alias and official Nemotron fallback.
Risk: image uploads create privacy concerns.
Mitigation: use short-lived session media and delete/export controls.
Risk: UI becomes too developer-heavy for Perfect Corp.
Mitigation: keep the shopper mirror visually first.
Cut item 1: multi-product catalog search.
Cut item 2: GitHub/Linear repair integration.
Cut item 3: full user auth.
Cut item 4: multi-tenant workspace.
Cut item 5: custom analytics dashboards.
Cut item 6: automated deck export if combined video is already complete.
Do not cut: launch session.
Do not cut: shopper path.
Do not cut: Crusoe agent trace.
Do not cut: proof receipt.
Do not cut: honest missing-key blockers.
