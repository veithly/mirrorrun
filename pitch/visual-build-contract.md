# Visual Build Contract: MirrorRun

## Source inputs
- PRD: `pitch/project_prd.md` sections 9-11.
- Mockups: `docs/ui-mockups/01-landing.png`, `02-app-overview.png`, `03-detail-or-flow.png`, `04-mobile-qr.png`.
- UI generation: deterministic HTML/CSS mockups under `docs/ui-mockups-src/`, with an imagegen style-board prompt available for final polish.

## Visual lane
- Lane: `operational-dashboard + beauty-retail editorial`.
- Why this lane fits: the product must feel like a serious retail launch control room while still showing a shopper-visible mirror result.
- Non-Tailwind visual signature: a split-screen mirror/control-room cockpit with a vertical proof timeline and media-first result cards.
- Forbidden defaults: default Next.js starter, generic Tailwind SaaS cards, unmodified shadcn dashboard, purple AI gradient hero, chat-only surface.

## Libraries
- Primary UI library: Mantine or Radix Themes for dense controls and tables.
- Supporting UI library: shadcn/ui primitives for buttons/dialogs/toasts; Recharts or ECharts for health strips and run timelines.
- Official docs checked:
  - Next.js/Tailwind versions should be resolved at install time with latest stable packages.
  - Lark CLI/MCP official docs checked for workflow commands and API key handling.
  - TrueFoundry AI Gateway docs checked for gateway and resilience features.
  - Crusoe Managed Inference docs checked for OpenAI-compatible endpoint and Nemotron model availability.
  - Perfect Corp API pages checked for retail/try-on API categories.
- Install commands:
  - `npx create-next-app@latest . --ts --tailwind --app`
  - `npm install @mantine/core @mantine/hooks @radix-ui/themes sonner recharts`
  - `npx shadcn@latest add button card dialog input label dropdown-menu skeleton separator`
  - `npm install @opennextjs/cloudflare wrangler`

## Route and component map
| Route | Mockup source | Hero/user-case beat | Components | Source marker |
| --- | --- | --- | --- | --- |
| `/` | `docs/ui-mockups/01-landing.png` | Product promise and prize-fit story | `HeroMirror`, `SponsorProofStrip`, `LaunchReceiptPreview` | `data-visual-lane="ops-retail-editorial" data-hero-composition="mirror-control-room"` |
| `/app` | `docs/ui-mockups/02-app-overview.png` | HERO PATH launch session | `ShopperMirror`, `AgentTrace`, `ProviderHealth`, `FaultSwitch` | `data-visual-lane="ops-retail-editorial" data-hero-composition="mirror-control-room"` |
| `/app/session/[id]` | `docs/ui-mockups/03-detail-or-flow.png` | Proof receipt and replay detail | `ProofTimeline`, `LarkReplayCard`, `GatewayEventCard`, `ResultMediaPanel` | `data-proof-surface="session-receipt"` |
| `/app/replays` | `docs/ui-mockups/03-detail-or-flow.png` | QA workflow management | `ReplayTable`, `RunStatusDrawer`, `CreateWorkflowButton` | `data-workflow-surface="lark-replay"` |
| mobile QR | `docs/ui-mockups/04-mobile-qr.png` | Shopper upload and safe result | `MobileUpload`, `StyleBriefPicker`, `ResultCard`, `RecoveryBanner` | `data-mobile-flow="shopper-qr"` |

## Desktop and mobile compositions
- Desktop 1920x1200: left side contains the shopper mirror and before/after output; right side contains agent trace, provider status, and proof receipt.
- Mobile 390x844: single-column shopper path with sticky bottom action, large media preview, and one compact recovery/proof strip.
- Touch-first action path: upload image, choose style, submit, view result; no hover-only controls.
- Desktop parity detail: every mobile result has a matching session receipt on desktop.

## Motion vocabulary
- Primary: subtle premium.
- Secondary: editorial cuts for moving from shopper result to proof receipt.
- Timing: 180-320 ms for cards and tabs; 400 ms for proof timeline reveal.
- Reduced motion: skip animated counters and use static state transitions.

## Brand direction
- Logo source: `logo-generator` required before build.
- Mark metaphor: mirror pane plus checkmark/replay path.
- Accent: coral-red for retail action, mint-green for recovered state, ink-black neutral.
- Typography: sober sans for controls; one editorial display face for page headers.
- No emoji as primary icons.

## Implementation checks
- Top product shell has `data-visual-lane="ops-retail-editorial"`.
- Top hero/app surface has `data-hero-composition="mirror-control-room"`.
- Default starter copy/assets are deleted.
- Brand pack appears in nav, favicon, OG, deck corner, and demo lower-third.
- `node ../hackathonhunter/scripts/audit_project.mjs . --phase ui-libs` must pass before feature work.
