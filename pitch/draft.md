# Pitch — MirrorRun (5 min, demo embedded)

---

## Slide 1 · Hero

**Headline:** Retail try-on needs a launch receipt.
**Subheadline:** MirrorRun launches a shopper path and proves what happens when the AI stack breaks.
**Visual:** `pitch/illustrations/hero-retail-control-room.png`
**Notes (30 s):** "The hard part is not making a try-on demo look good. The hard part is knowing what the shopper sees when the model, image API, or workflow server fails on launch day."

---

## Slide 2 · The Trade-Off

**Headline:** Pretty demos hide launch risk.

| Current path | What breaks |
| --- | --- |
| A static try-on prototype | No one knows if recovery works under provider trouble. |
| A separate ops dashboard | It misses the consumer journey that judges and shoppers actually touch. |
| A bug report in chat | QA cannot replay the exact image, prompt, and failure chain. |

**Visual:** `pitch/illustrations/slide-01-launch-failure.png`
**Notes (45 s):** "A retail team can show a polished image, but the proof lives somewhere else: model logs, API dashboards, and a QA thread. MirrorRun puts those pieces into one launch session."

---

## Slide 3 · Live Demo

**Headline:** Try-on, fault, recovery, replay.
**Visual:** Product recording or `docs/screenshots/flow.png`
**Caption:** Start a session, attach the shopper path, stream the agent trace, record the blocker or real provider id.
**Notes (180 s):** "First we create a launch session. The shopper path opens from a phone-sized route. The operator attaches the retail result, streams the Nemotron launch checklist, triggers recovery, and creates the replay workflow. When keys are missing, MirrorRun shows the exact credential blocker instead of pretending a sponsor call succeeded."

---

## Slide 4 · How It Works

**Headline:** Sponsor APIs become evidence.
**Visual:** `pitch/illustrations/slide-04-sponsor-architecture.png`
**Notes (45 s):** "There are four moving parts. Perfect Corp owns the shopper-visible try-on result. Crusoe and Nemotron write the launch plan. TrueFoundry records resilience behavior. Lark turns the session into a replay workflow."

---

## Slide 5 · Proof + Ask

**Headline:** Inspect the receipt.

| Action | Surface | Evidence |
| --- | --- | --- |
| Create session | `/app` | Session id and timeline row |
| Open phone path | `/m/[sessionId]` | QR/mobile first-run route |
| Run sponsor calls | Server routes | Job id, request id, workflow id, or credential blocker |

**Repo:** TBD public GitHub
**Demo:** Local now; Cloudflare after keys
**Video:** Combined pitch-demo after realness
**Looking for:** 3 retail teams willing to test launch receipts on real try-on flows.
**Visual:** `pitch/illustrations/slide-05-business-close.png`
**Notes (30 s):** "Everything in the receipt is meant to be checked. Try the shopper path, inspect the timeline, then swap the blockers for real sponsor keys and deploy the same flow."
