# Idea: MirrorRun

## One-sentence pitch
A retail launch room that creates a live try-on journey and proves it survives broken AI infrastructure.

## Target users
- Primary: AI retail product teams launching beauty, fashion, or personalized shopping flows.
- Secondary: QA leads, growth leads, and founders who need launch evidence before sending traffic.

## Problem statement
Retailers can create impressive AI/AR try-on demos, but the journey often breaks at the exact moment it matters: uploaded images fail, model calls timeout, tool servers return errors, recommendation text goes blank, and QA cannot reproduce the failure. A shopper sees a broken experience, a merchant loses trust, and the team has no clear proof of what happened.

## Core mechanism
MirrorRun connects the shopper-facing try-on path with an operator reliability room. A shopper photo becomes a Perfect Corp try-on result; a Crusoe Nemotron Hermes/NemoClaw agent creates the recommendation and launch checklist; TrueFoundry records/fails over model/tool behavior; Lark turns the exact journey into a replayable workflow.

## Why it is not an AI wrapper
The product still has value without an LLM because it captures shopper input, stores session state, calls a real try-on API, generates replay artifacts, and exposes reliability receipts. AI is used for planning, explanation, and recovery orchestration; the core system is a retail launch and proof loop.

## Domain fidelity
The domain is AI retail operations. The vocabulary and workflow are launch sessions, shopper journeys, try-on media, conversion risk, replay tests, provider health, failover, and receipts. Perfect Corp is used for the consumer retail experience; Lark and TrueFoundry are used for the engineering workflow that keeps that experience production-ready.

## Hero moment (10-30 seconds)
0:00 — The operator opens a launch session beside a live shopper mirror.
0:05 — A shopper photo produces a try-on result and recommendation receipt.
0:10 — The operator toggles `MCP failure` / `LLM brownout`.
0:20 — The shopper still receives a safe result, while the control room shows a recovery event and a Lark replay id.

## Showmanship design
- First screen: a split-screen retail mirror and launch control room.
- Coolness source: consumer try-on, live agent trace, and visible fault recovery in one loop.
- Audience participation: judge scans the QR path or triggers the operator fault.
- Demo climax: failure injection does not blank the shopper journey.
- Big-screen elements: before/after visual, provider health strip, recovery event, replay receipt.
- 15-second shareable clip: try-on generated, fault injected, journey recovered, replay saved.

## User cases
### User Case 1
- User: Retail PM.
- Pain: needs proof that a new personalized try-on flow is ready for shoppers.
- Action: starts a launch session and scans the shopper QR path.
- System: generates try-on output, recommendation copy, and a launch receipt.
- Result: PM has a visible shopper journey and proof bundle.
- Why valuable: makes the product story fit Perfect Corp and Overall judging.

### User Case 2
- User: QA lead.
- Pain: cannot reproduce a vague complaint about a broken mobile try-on path.
- Action: creates a Lark replay workflow from the session.
- System: records the steps, secrets context, screenshots, and run status.
- Result: QA can rerun the same path after a fix.
- Why valuable: satisfies Lark with a real developer workflow.

### User Case 3
- User: Engineering lead.
- Pain: agent flows fail when a provider or MCP server goes down.
- Action: injects a controlled model/tool failure.
- System: routes the request through the resilience policy and writes a recovery receipt.
- Result: engineering can show production-readiness instead of a happy-path only demo.
- Why valuable: satisfies TrueFoundry and increases Overall feasibility.

## Bounty-fit
| Rubric line | How we hit it |
| --- | --- |
| Progress | One running web app with upload, try-on result, agent trace, Lark workflow, and fault recovery proof. |
| Concept | Solves a concrete problem: launching AI retail journeys safely. |
| Feasibility | Retail SaaS wedge: "preflight and monitor personalized AI shopping experiences." |
| Multiple sponsor challenges | Each sponsor technology powers a different necessary part of the same loop. |

## Sponsor-fit
| Sponsor API / SDK / protocol | Why it is necessary |
| --- | --- |
| Crusoe Managed Inference + Nemotron | The Hermes/NemoClaw agent plans the shopper recommendation and recovery checklist. |
| Perfect Corp YouCam APIs | The shopper-facing try-on and skin/look/fashion output is the consumer experience. |
| TrueFoundry AI Gateway / resilience layer | The product must show behavior under LLM/MCP failure and graceful recovery. |
| Lark CLI / MCP | The session becomes a replayable developer workflow with artifacts. |

## MVP within budget
- Hour 0-2: app shell, upload bucket, session table, sponsor key smoke commands.
- Hour 2-6: shopper mirror route, image upload, Perfect API call or blocked key gate.
- Hour 6-10: Crusoe agent stream, recommendation card, agent trace timeline.
- Hour 10-14: Lark workflow creation/invocation and replay receipt.
- Hour 14-18: TrueFoundry fault switch and recovery event.
- Hour 18-24: visual polish, Playwright hero test, Cloudflare deploy, Devpost story.
- Hour 24-30: combined pitch-demo video and screenshots if time remains.

## Cut list
1. Multi-product catalog search; use one curated catalog set.
2. Full auth; use a public launch session and admin token during judging.
3. Multi-tenant analytics; keep one session workspace.
4. Complex skin-care medical claims; keep recommendations retail/styling oriented.
5. GitHub PR repair bot; export a repair plan only if Lark integration already works.
