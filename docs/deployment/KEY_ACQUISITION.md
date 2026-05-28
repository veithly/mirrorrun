# Sponsor Key Acquisition

MirrorRun keeps sponsor secrets out of source control and out of the browser UI.

## Local secret files

Create `.env.local` for `next dev` and `.dev.vars` for Wrangler/OpenNext preview.

```bash
CRUSOE_API_KEY=
CRUSOE_BASE_URL=https://api.inference.crusoecloud.com/v1
CRUSOE_MODEL=hack-crusoe/Nemotron-3-Nano-30B-A3B-FP8
PERFECT_API_KEY=
PERFECT_API_SECRET=
PERFECT_API_URL=
TRUEFOUNDRY_API_KEY=
TRUEFOUNDRY_GATEWAY_URL=
GETLARK_API_KEY=
GETLARK_API_URL=
APP_BASE_URL=http://localhost:3000
STEP_API_KEY=
STEP_BASE_URL=https://api.stepfun.com/v1
STEP_TTS_MODEL=stepaudio-2.5-tts
STEP_TTS_VOICE=cixingnansheng
STEP_TTS_INSTRUCTION="Confident, calm hackathon narration. Native English pronunciation for MirrorRun, Crusoe, Nemotron, TrueFoundry, Perfect Corp, and Lark. Speak at about 150 words per minute."
```

## Browser setup links

- Crusoe Managed Inference: <https://console.crusoecloud.com/request-foundry>
- Perfect Corp YouCam API: <https://yce.perfectcorp.com/api-console/en/redeem-code/>
- TrueFoundry AI Gateway: <https://www.truefoundry.com/docs/ai-gateway/intro-to-llm-gateway>
- Lark dashboard: <https://dashboard.getlark.ai/>
- StepFun TTS dashboard/API key: <https://platform.stepfun.com/>

## Browser run status

Checked on 2026-05-28 Asia/Shanghai with the real browser. No secret value was copied into the repo or chat.

| Sponsor | Browser endpoint reached | Current status | MirrorRun env |
| --- | --- | --- | --- |
| Crusoe | `https://console.crusoecloud.com/request-foundry` and the official Devpost sponsor instructions | Console personal key creation reached a card-required account setup gate. MirrorRun uses the official Devpost hackathon bearer for Managed Inference and the live chat completions smoke passed. | `CRUSOE_API_KEY` |
| Perfect Corp | `https://yce.perfectcorp.com/api-console/en/redeem-code/` | API key and API secret were created in the YouCam API console, stored locally, and synced to Cloudflare Worker secrets. | `PERFECT_API_KEY`, `PERFECT_API_SECRET`, `PERFECT_API_URL` |
| TrueFoundry | `https://app.truefoundry.com/` | Personal access token was created after browser login, stored locally, and synced to Cloudflare Worker secrets. | `TRUEFOUNDRY_API_KEY`, `TRUEFOUNDRY_GATEWAY_URL` |
| Lark | `https://dashboard.getlark.ai/` | API key was created in dashboard settings, stored locally, and synced to Cloudflare Worker secrets. | `GETLARK_API_KEY`, `GETLARK_API_URL` |
| StepFun | `https://platform.stepfun.com/` | Existing local StepFun key was verified by `check:env` and synced to Cloudflare Worker secrets for `stepaudio-2.5-tts` narration. | `STEP_API_KEY` |

## After each key is created

1. Add the key to `.env.local` for `next dev`.
2. Add the key to `.dev.vars` for local Wrangler/OpenNext preview.
3. Add the key to Workers secrets with `npx wrangler secret put <NAME>`.
4. Run `npm run check:env`.
5. Re-run the app flow and confirm the UI shows configured provider status plus a provider job id, request id, workflow id, gateway event, or exact live provider error receipt.

## Cloudflare secret commands

Run these only after the real values are available. Wrangler prompts for the secret value without printing it.

```bash
npx wrangler secret put CRUSOE_API_KEY
npx wrangler secret put PERFECT_API_KEY
npx wrangler secret put PERFECT_API_SECRET
npx wrangler secret put TRUEFOUNDRY_API_KEY
npx wrangler secret put GETLARK_API_KEY
npx wrangler secret put STEP_API_KEY
```

Current Worker secret inventory includes all six required secret names: `CRUSOE_API_KEY`, `PERFECT_API_KEY`, `PERFECT_API_SECRET`, `TRUEFOUNDRY_API_KEY`, `GETLARK_API_KEY`, and `STEP_API_KEY`.

Do not paste secret values into issue trackers, screenshots, Devpost prose, or chat. If a screenshot is needed, show only the configured status or the final four characters of a key.

## Verify without printing secrets

```bash
npm run check:env
```

The script only reports configured or missing status. It does not print secret values.
