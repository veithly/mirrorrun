# MirrorRun 部署

MirrorRun 使用 OpenNext 部署到 Cloudflare Workers。本地默认使用 JSON 和本地媒体目录；生产环境设置 `MIRRORRUN_STORAGE=cloudflare` 后使用 D1 和 R2。

## 需要的账号

| 服务 | 用途 | Secret |
| --- | --- | --- |
| Crusoe Managed Inference | Nemotron launch planner | `CRUSOE_API_KEY` |
| Perfect Corp YouCam API | 购物者可见的试穿结果 | `PERFECT_API_KEY`、必要时 `PERFECT_API_SECRET` |
| TrueFoundry AI Gateway | 恢复和 gateway 证据 | `TRUEFOUNDRY_API_KEY`、`TRUEFOUNDRY_GATEWAY_URL` |
| Lark | 创建 replay workflow | `GETLARK_API_KEY` |
| Cloudflare | Workers、D1、KV、R2 | Wrangler 登录 token |

Key 获取细节记录在 [../deployment/KEY_ACQUISITION.md](../deployment/KEY_ACQUISITION.md)。

## 本地运行

```bash
npm install
cp .env.example .env.local
npm run dev
```

录制前运行 `npm run check:env`。脚本只会显示 configured 或 missing，不会打印 secret value。

## Cloudflare 资源

```bash
npx wrangler d1 create mirrorrun-db
npx wrangler kv namespace create MIRRORRUN_STATUS
npx wrangler r2 bucket create mirrorrun-media
```

`wrangler.jsonc` 已经声明这些 binding：

| Binding | 类型 | 用途 |
| --- | --- | --- |
| `MIRRORRUN_DB` | D1 | Sessions、events、receipts、replay ids。 |
| `MIRRORRUN_STATUS` | KV | 小型状态和缓存。 |
| `NEXT_INC_CACHE_R2_BUCKET` | R2 | OpenNext incremental cache artifacts。 |
| `MIRRORRUN_MEDIA` | R2 | 购物者上传媒体和结果文件。 |

## Worker Secrets

```bash
npx wrangler secret put CRUSOE_API_KEY
npx wrangler secret put PERFECT_API_KEY
npx wrangler secret put PERFECT_API_SECRET
npx wrangler secret put TRUEFOUNDRY_API_KEY
npx wrangler secret put GETLARK_API_KEY
npx wrangler secret put STEP_API_KEY
```

不要把 secret value 写进源码、截图或提交表单。

## 部署

```bash
npm run build
npm run deploy
```

部署后，把 `APP_BASE_URL` 设置为 Workers URL，并做 smoke check：

```bash
npm run check:env
npm run test:e2e
DEMO_URL=https://mirrorrun.veithly.workers.dev npm run visual:qa
```

当前生产 URL 是：

```bash
DEMO_URL=https://mirrorrun.veithly.workers.dev npm run visual:qa
```

## 当前生产证据

生产环境已部署到 <https://mirrorrun.veithly.workers.dev>。2026-05-28 的 production smoke 已对 `/`、`/app`、`/m/demo-smoke`、`/app/replays` 和 `/about` 返回 HTTP 200，并且 smoke 报告没有浏览器 console error。

Cloudflare Workers secrets 已安装 Crusoe、Perfect Corp、TrueFoundry、Lark 和 StepFun。Crusoe 控制台个人 key 创建要求绑卡，因此当前 Managed Inference smoke 使用 Devpost 官方 hackathon bearer。
