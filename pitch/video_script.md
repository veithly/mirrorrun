# Combined Pitch-Demo Script: MirrorRun

## Target
- Duration: 4-5 minutes.
- Mode: `combined-pitch-demo`.
- Resolution: 1920x1200.
- Composer: HyperFrames.
- Demo plate: production build, not Next.js dev mode.

## Chapter 1 — Hook (0:00-0:35)
Narration:
"AI retail demos are easy to make beautiful. Launching them is harder. When the image API stalls, the model call browns out, or a tool server fails, the shopper sees a broken journey and the team loses the trail. MirrorRun is a launch room for AI retail experiences."

Visual:
Slide 1 illustration, then quick cut to the split mirror/control room.

## Chapter 2 — Shopper path (0:35-1:30)
Narration:
"We start a launch session and open the shopper path. The shopper uploads a photo and chooses a style brief. Perfect Corp powers the retail visual result, so the consumer-facing moment is real, not a static card."

Visual:
Open `/app`, create session, show QR/mobile surface, upload image, display result.

## Chapter 3 — Agent trace (1:30-2:10)
Narration:
"On the operator side, a Crusoe-hosted Nemotron Hermes/NemoClaw agent writes the recommendation, checks launch risk, and turns the session into a replay plan. The trace is visible because judges and teams should not have to trust a hidden black box."

Visual:
Component-lift focus on `AgentTrace`; show recommendation/checklist.

## Chapter 4 — Recovery moment (2:10-3:00)
Narration:
"Now we break the infrastructure on purpose. The control room marks the MCP or model dependency unhealthy. Instead of going blank, the shopper path receives a safe recovered response, and the proof timeline records the recovery event."

Visual:
Click `FaultSwitch`; health strip changes; recovery event appears; shopper card remains visible.

## Chapter 5 — Lark replay (3:00-3:45)
Narration:
"The same session becomes a Lark workflow. QA gets a reproducible replay, artifacts, and a rerun command. This is the difference between a pretty demo and a launch process."

Visual:
Open `/app/session/[id]`, click `Create replay`, show workflow id or credential blocker if key missing.

## Chapter 6 — Close (3:45-4:30)
Narration:
"MirrorRun is launch readiness for AI retail: one shopper journey, one operator room, one proof receipt. Perfect Corp makes the experience visible. Crusoe and Nemotron plan it. TrueFoundry proves resilience. Lark makes it replayable."

Visual:
Slide 5, then final product receipt with all proof rows.

## Required Recording Evidence
- `pitch/recording/raw.webm`.
- `pitch/recording/cues.json`.
- `npm run record:demo` produces a repeatable honest-blocker capture until sponsor keys are installed.
- `pitch/recording/cues-tight.json`.
- `pitch/polish-combined/index.html`.
- `pitch/recording/combined.mp4`.
- YouTube unlisted URL in `SUBMISSION.md`.

## Cut Rule
If one sponsor key is unavailable, keep that sponsor's flow honest as a credential blocker and record the other real flows. Do not fake receipts.
