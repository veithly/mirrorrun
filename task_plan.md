# Task Plan: DevNetwork AI + ML Hackathon 2026

## Goal
Ship a prize-maximizing AI hackathon concept package for DevNetwork [AI + ML] Hackathon 2026, deadline May 28, 2026 10:00 AM PDT / May 29, 2026 01:00 Asia/Shanghai.

## States
- [x] S0 bounty-read
- [x] S1 ideation
- [x] S1b problem-prd-ui
- [x] S2 stack-decision
- [x] S3 frontend-design-contract
- [x] S4 project-build
- [x] S4b feature-implementation
- [x] S5 browser-testing + visual QA
- [x] S6 documentation
- [x] S7 slides
- [x] S8 demo-recording
- [ ] S9 video-editing
- [x] S10 submission package draft

## Decisions Made
- Delivery mode is `combined-pitch-demo`: Devpost asks for a video demo and does not expose a separate deck field in the public instructions.
- Prize strategy is multi-track: target Overall Winner, Crusoe, Perfect Corp, TrueFoundry, and Lark in one coherent product loop.
- Chosen concept is `MirrorRun`, the highest-scoring candidate for expected prize value.
- Stack branch is `AI`: sponsor AI and retail APIs are structurally necessary; no Web3 layer is needed.
- Public UI must look like a live retail reliability product, not a hackathon toy or chat wrapper.
- Visual lane is `operational-dashboard + beauty-retail editorial`: a control room with polished consumer try-on surfaces.

## Errors Encountered
- Devpost and AI DevSummit pages disagree on some prize totals and TrueFoundry amounts. The brief records both and optimizes for sponsor tracks confirmed in the Devpost gallery filters.
- Devpost rules page contains stale/typo dates (`2025`, `May 29`). The overview, schedule, and official Google instructions consistently point to May 28, 2026 10:00 AM PDT as the submission deadline.

## Status
Planning, PRD, stack, visual contract, deterministic UI mockups, build, feature implementation, sponsor key acquisition, Cloudflare deployment, production smoke, browser visual QA, deck assets, and raw demo recording are complete.

Current live evidence:
- Production URL: https://mirrorrun.veithly.workers.dev
- Production smoke: passed on 2026-05-28T07:18:46.262Z across `/`, `/app`, `/m/demo-smoke`, `/app/replays`, and `/about`.
- Sponsor secrets configured locally and in Cloudflare: Crusoe, Perfect Corp, TrueFoundry, Lark, and StepFun.
- Crusoe Managed Inference smoke reached the official chat completions endpoint with the Devpost hackathon bearer.

Remaining blockers:
- Render/export the final combined pitch-demo video and upload it as an unlisted YouTube video.
- Confirm Devpost team member display names.
- Fill and submit the Devpost form while logged in, after user confirmation on the final submit action.
