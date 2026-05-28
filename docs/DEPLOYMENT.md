# MirrorRun Deployment

MirrorRun is designed for Cloudflare Workers through OpenNext. Local development uses JSON and local media files by default; production switches to Cloudflare D1 and R2 when `MIRRORRUN_STORAGE=cloudflare`.

## Required Accounts

| Service | Purpose | Secret |
| --- | --- | --- |
| Crusoe Managed Inference | Nemotron launch planner | `CRUSOE_API_KEY` |
| Perfect Corp YouCam API | Shopper-visible try-on result | `PERFECT_API_KEY`, `PERFECT_API_SECRET` when required |
| TrueFoundry AI Gateway | Resilience and gateway evidence | `TRUEFOUNDRY_API_KEY`, `TRUEFOUNDRY_GATEWAY_URL` |
| Lark | Replay workflow creation | `GETLARK_API_KEY` |
| Cloudflare | Workers, D1, KV, R2 | Wrangler login token |

Key acquisition details are tracked in [docs/deployment/KEY_ACQUISITION.md](./deployment/KEY_ACQUISITION.md).

## Local Run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Use `npm run check:env` before recording. The script reports only configured or missing status and never prints secret values.

## Cloudflare Resources

Create production resources, then copy the returned IDs into `wrangler.jsonc`.

```bash
npx wrangler d1 create mirrorrun-db
npx wrangler kv namespace create MIRRORRUN_STATUS
npx wrangler r2 bucket create mirrorrun-media
```

The checked-in `wrangler.jsonc` already names the expected bindings:

| Binding | Type | Purpose |
| --- | --- | --- |
| `MIRRORRUN_DB` | D1 | Sessions, events, receipts, replay ids. |
| `MIRRORRUN_STATUS` | KV | Small status/cache flags. |
| `NEXT_INC_CACHE_R2_BUCKET` | R2 | OpenNext incremental cache artifacts. |
| `MIRRORRUN_MEDIA` | R2 | Uploaded shopper media and result files. |

## Worker Secrets

Set every sponsor key through Wrangler. Do not put secret values in source control or screenshots.

```bash
npx wrangler secret put CRUSOE_API_KEY
npx wrangler secret put PERFECT_API_KEY
npx wrangler secret put PERFECT_API_SECRET
npx wrangler secret put TRUEFOUNDRY_API_KEY
npx wrangler secret put GETLARK_API_KEY
npx wrangler secret put STEP_API_KEY
```

Non-secret config may live in `wrangler.jsonc`:

```jsonc
{
  "vars": {
    "MIRRORRUN_STORAGE": "cloudflare",
    "APP_BASE_URL": "https://mirrorrun.veithly.workers.dev",
    "CRUSOE_BASE_URL": "https://api.inference.crusoecloud.com/v1",
    "CRUSOE_MODEL": "hack-crusoe/Nemotron-3-Nano-30B-A3B-FP8"
  }
}
```

## Deploy

```bash
npm run build
npm run deploy
```

After deployment, set `APP_BASE_URL` to the Workers URL and run a smoke pass:

```bash
npm run check:env
npm run test:e2e
DEMO_URL=https://mirrorrun.veithly.workers.dev npm run visual:qa
```

## Production Verification

Before Devpost submission:

| Check | Command or Action |
| --- | --- |
| Build | `npm run build` |
| TypeScript | `npm run typecheck` |
| Lint | `npm run lint` |
| Browser flow | `npm run test:e2e` |
| Visual QA | `DEMO_URL=https://mirrorrun.veithly.workers.dev npm run visual:qa` |
| Env status | `npm run check:env` |
| Cloudflare smoke | Open `/`, `/app`, `/m/new`, and `/about` from a fresh browser profile. |

## Current Production Evidence

Production is live at <https://mirrorrun.veithly.workers.dev>. The 2026-05-28 production smoke pass returned HTTP 200 for `/`, `/app`, `/m/demo-smoke`, `/app/replays`, and `/about`, with no browser console errors in the smoke report.

Sponsor secrets are installed in Cloudflare Workers secrets. Crusoe, Perfect Corp, TrueFoundry, Lark, and StepFun are configured without printing values to logs or documentation. Crusoe console personal key creation required card setup, so MirrorRun uses the official Devpost hackathon bearer for the Managed Inference smoke.
