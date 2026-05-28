# User Cases: MirrorRun

## User case 1 — Launch a shopper try-on journey (HERO PATH)
- User: Retail product manager.
- Situation: The team is about to launch a personalized try-on flow for a beauty or fashion campaign.
- Pain: The demo looks good in a meeting, but the PM cannot prove what happens if image processing, model reasoning, or tool calls fail.
- Trigger: PM starts a new launch session and scans the QR path as a shopper.
- Desired outcome: A shopper-visible try-on result plus an operator-visible launch receipt.
- Product response: MirrorRun uploads the shopper image, calls Perfect Corp, asks the Crusoe Nemotron agent for the recommendation and checklist, stores the session, and displays a proof timeline.
- Demo-visible moment: The before/after mirror appears beside a live agent trace and session receipt.

## User case 2 — Convert the same journey into a replayable Lark workflow
- User: QA lead.
- Situation: A support ticket says "try-on broke on mobile after I changed looks."
- Pain: The report is too vague to reproduce, and manual QA loses the exact steps.
- Trigger: QA opens the MirrorRun session detail page and clicks `Create replay`.
- Desired outcome: A Lark workflow that can rerun the exact shopper path with artifacts.
- Product response: MirrorRun writes a deterministic Lark workflow description, attaches required secret context names, invokes the workflow when authorized, and stores the workflow id/run status.
- Demo-visible moment: The proof page shows the Lark workflow id, status, screenshot/artifact slots, and a rerun command.

## User case 3 — Prove the journey survives AI infrastructure chaos
- User: Engineering lead.
- Situation: The team needs to show that agent infrastructure does not collapse when an LLM provider or MCP server errors out.
- Pain: Most AI retail demos are happy-path only; judges and buyers cannot see production readiness.
- Trigger: The operator toggles `LLM brownout` or `MCP failure` in the control room.
- Desired outcome: The shopper still sees a safe response, and the control room records the recovery path.
- Product response: MirrorRun routes through the configured resilience policy, shows provider/tool state, records the fallback decision, and adds the event to the proof receipt.
- Demo-visible moment: The failure light turns red, then the recovered status appears while the shopper card remains usable.

## Hero demo path
1. Open `/app` on desktop and start a `Spring Launch` session.
2. Scan or open the mobile shopper path.
3. Upload a face/outfit image and choose one style brief.
4. Show the Perfect Corp result placeholder only if the key is missing; otherwise show the real generated try-on.
5. Watch the Crusoe Nemotron trace create recommendation and risk checklist.
6. Trigger the failure switch.
7. Show recovered shopper response, TrueFoundry event, and Lark replay receipt.

## Secondary demo path
1. Open `/app/replays`.
2. Select the latest session.
3. Generate or display the Lark workflow command.
4. Show screenshots/log artifact slots and rerun status.

## Edge path
1. Missing Perfect or Lark key is detected.
2. UI blocks that integration with exact missing env var and official key URL.
3. Other working sponsor flows remain visible and honest.
