# 赞助商 Key 获取

MirrorRun 不会把赞助商密钥写进源码，也不会把密钥暴露给浏览器 UI。

## 本地密钥文件

把 `.env.example` 复制为 `.env.local` 给 `next dev` 使用；如果要跑 Wrangler/OpenNext 预览，再复制为 `.dev.vars`。

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

## 浏览器 setup 链接

- Crusoe Managed Inference: <https://console.crusoecloud.com/request-foundry>
- Perfect Corp YouCam API: <https://yce.perfectcorp.com/api-console/en/redeem-code/>
- TrueFoundry AI Gateway: <https://www.truefoundry.com/docs/ai-gateway/intro-to-llm-gateway>
- Lark dashboard: <https://dashboard.getlark.ai/>
- StepFun TTS: <https://platform.stepfun.com/>

## 浏览器检查状态

2026-05-28（Asia/Shanghai）已用真实浏览器检查。没有把任何 secret 值复制进仓库或聊天。

| Sponsor | 已到达的页面 | 当前状态 | MirrorRun env |
| --- | --- | --- | --- |
| Crusoe | `https://console.crusoecloud.com/request-foundry` 和 Devpost 官方 sponsor instructions | 控制台个人 key 创建进入绑卡 gate；MirrorRun 使用 Devpost 官方 hackathon bearer 跑通 Managed Inference chat completions smoke。 | `CRUSOE_API_KEY` |
| Perfect Corp | `https://yce.perfectcorp.com/api-console/en/redeem-code/` | 已在 YouCam API console 创建 API key 和 secret，写入本地并同步到 Cloudflare Worker secrets。 | `PERFECT_API_KEY`, `PERFECT_API_SECRET`, `PERFECT_API_URL` |
| TrueFoundry | `https://app.truefoundry.com/` | 已在浏览器登录后创建 personal access token，写入本地并同步到 Cloudflare Worker secrets。 | `TRUEFOUNDRY_API_KEY`, `TRUEFOUNDRY_GATEWAY_URL` |
| Lark | `https://dashboard.getlark.ai/` | 已在 dashboard settings 创建 API key，写入本地并同步到 Cloudflare Worker secrets。 | `GETLARK_API_KEY`, `GETLARK_API_URL` |
| StepFun | `https://platform.stepfun.com/` | 已验证本地现有 StepFun key，并同步到 Cloudflare Worker secrets；最终旁白使用 `stepaudio-2.5-tts`。 | `STEP_API_KEY` |

## 每个 key 创建之后

1. 把 key 写入 `.env.local`。
2. 把 key 写入 `.dev.vars`。
3. 用 Wrangler 写入 Workers secrets。
4. 运行 `npm run check:env`。
5. 重新跑产品流程，确认 UI 显示 provider configured 状态，以及 provider job id、request id、workflow id、gateway event，或真实 provider error receipt。

## Cloudflare secret 命令

拿到真实值之后再运行。Wrangler 会提示输入 secret，不会把值打印出来。

```bash
npx wrangler secret put CRUSOE_API_KEY
npx wrangler secret put PERFECT_API_KEY
npx wrangler secret put PERFECT_API_SECRET
npx wrangler secret put TRUEFOUNDRY_API_KEY
npx wrangler secret put GETLARK_API_KEY
npx wrangler secret put STEP_API_KEY
```

不要把密钥贴到 issue、截图、Devpost 文案或聊天里。如果需要截图，只展示 configured 状态或 key 的后四位。

当前 Worker secret inventory 已包含全部六个 required secret name：`CRUSOE_API_KEY`、`PERFECT_API_KEY`、`PERFECT_API_SECRET`、`TRUEFOUNDRY_API_KEY`、`GETLARK_API_KEY`、`STEP_API_KEY`。
