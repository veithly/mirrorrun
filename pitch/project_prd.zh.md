# 产品需求文档：MirrorRun

## 1. 项目背景
MirrorRun 是为 DevNetwork [AI + ML] Hackathon 2026 设计的参赛级但创业公司感的产品。
本次比赛奖励 progress、concept 和 feasibility。
赞助商结构奖励对 Crusoe、Perfect Corp、TrueFoundry 和 Lark 的深度使用。
截止时间是 2026 年 5 月 28 日上午 10:00 PDT。
战略目标是最大化预期奖项价值，而不只是现金。
产品必须符合多个赞助商挑战，同时不能变成赞助商 logo 清单。
选定机会是 AI 零售发布就绪度。
零售团队正在发布虚拟试穿、皮肤分析、时尚个性化和推荐旅程。
这些旅程会在图片 API、LLM 调用、MCP 工具或浏览器测试故障时失败。
大多数 demo 会把这种脆弱性藏在单一 happy path 后面。
MirrorRun 同时展示购物者体验和发布证明。
购物者看到精致的试穿旅程。
操作员看到 agent trace、provider health、recovery event 和 replay workflow。
公开故事很简单：在购物者到来之前，让 AI 零售体验既漂亮又可靠。
内部构建姿态是紧急务实：一个 hero path、一个 replay path、一个 recovery path。
公开产品不能看起来像 hackathon prototype。
公开文案必须避免 "MVP"、"hackathon"、"prototype" 或 stack-first 表述。
提交文案可以引用赞助商，因为 Devpost 要求说明 challenge fit。
App UI 应该面向零售产品团队，而不只是开发者。
证明界面应该面向赞助商和评委。

## 2. 问题定义
零售商可以很快做出令人印象深刻的试穿截图。
但他们很难证明端到端购物者旅程能够承受真实流量。
产品经理看不出试穿失败是由图片上传、模型推理、MCP 工具故障还是 QA 漂移导致的。
QA 负责人无法复现类似 "the look broke on mobile" 的模糊支持反馈。
工程负责人无法展示模型基础设施失败时的 graceful degradation。
购物者不关心哪个 provider 失败；他们只看到破损的购买旅程。
当前 workaround 是手动 QA 加截图加事故后猜测。
手动 QA 会丢失精确步骤。
截图会漏掉模型和工具的时序。
Provider dashboard 不解释用户侧影响。
通用 observability dashboard 不显示零售旅程。
通用 AI agent 不生成可 replay 的 proof artifact。
痛点时刻是 launch review：团队有漂亮 demo，但没有 reliability receipt。
MirrorRun 解决这个时刻。
它把真实购物者路径和证明路径结合起来。
它展示发生了什么、什么恢复了、团队如何 replay。
问题不是 "推荐更好的美妆产品"。
问题是 "不靠盲目信任来发布 AI retail flows"。
获胜 demo 必须在 30 秒内让这种区别可见。

## 3. 目标用户
Primary user：AI retail product manager。
PM 负责 conversion、launch confidence 和可见购物者体验。
Secondary user：QA lead。
QA lead 负责 reproducible workflows、screenshots 和 regression evidence。
Secondary user：engineering lead。
Engineering lead 负责 model/tool reliability 和 fallback behavior。
Tertiary user：小型电商品牌 founder 或 growth lead。
Founder 需要一个能发展成 startup 的产品故事。
非目标用户：寻找 beauty chatbot 的普通消费者。
非目标用户：只想要 metrics 的基础设施团队。
PM 需要 launch session。
QA lead 需要 replay workflow。
Engineering lead 需要 resilience receipt。
Shopper 需要 mobile-first、低摩擦试穿。
Judge 需要一个把这些角色绑在一起的单一故事。

## 4. 用户痛点
Pain point 1：购物者路径视觉上有吸引力但技术上脆弱。
Pain point 2：失败很难从支持反馈中复现。
Pain point 3：模型和工具 outage 只是抽象讨论，没有被演示。
Pain point 4：零售团队无法把 conversion risk 和 infrastructure health 连接起来。
Pain point 5：赞助商 API 可能被表面使用，从而削弱评审。
Pain point 6：hackathon demo 可能看起来像 stack demo，而不是 product。
Current workaround：手动运行试穿、截图、把备注粘到 issue tracker。
Why current workaround fails：它不捕获 timing、fallback path、workflow id 或 result media。
Must-have need：一个把 shopper image、try-on output、agent trace、recovery event 和 replay id 绑定起来的 proof receipt。
Nice-to-have need：导出 GitHub 或 Linear repair plan。
Delight layer：评委可以触发 failure，并看到 shopper path 恢复而不是 blank。
Trust standard：每个外部 receipt 必须是真实的，或明确标记为缺少凭据导致 blocked。
Safety standard：避免医疗皮肤护理声明，推荐保持 retail/styling 方向。

## 5. 核心需求与优先级
REQ-001 P0：App 必须创建带稳定 session id 的 launch session。
REQ-002 P0：移动购物者路径必须接受图片上传或 demo-safe image source。
REQ-003 P0：当凭据存在时，产品必须调用 Perfect Corp 完成真实 try-on、skin、look、fashion 或等价零售视觉结果。
REQ-004 P0：产品必须调用带 Nemotron 模型的 Crusoe Managed Inference，用于 recommendation 和 launch checklist planning。
REQ-005 P0：操作员 control room 必须显示可读 agent trace 和 provider health strip。
REQ-006 P0：产品必须展示 LLM 或 MCP failure 的 fault/recovery path，默认界面不能显示 raw JSON。
REQ-007 P0：产品必须从 launch session 创建或准备 Lark replay workflow。
REQ-008 P0：产品必须持久化包含 media、trace、workflow 和 recovery evidence 的 proof receipt。
REQ-009 P1：详情页必须暴露 replay command 和 artifact list。
REQ-010 P1：App 必须提供 QR-ready mobile path，touch target 至少 44 px。
REQ-011 P1：缺少 sponsor credentials 时，只阻塞依赖该凭据的 flow，并显示精确 env var 名称和官方 key URL。
REQ-012 P1：Devpost submission package 必须包含 screenshots、video plan 和 sponsor challenge mapping。
REQ-013 P2：导出 GitHub 或 Linear repair plan。
REQ-014 P2：增加 multi-catalog product matching。
REQ-015 P2：增加 team auth 和 multi-tenant workspace support。
Priority rule：P0 定义 recorded demo。
Priority rule：P1 增强 judging confidence。
Priority rule：P2 在时间紧张时 cut。
任何需求都不能在 hero path 中用 fake data 表示。
Seed data 只允许用于 empty state 或 credential-blocked local preview。

## 6. 方案概述
MirrorRun 有两个同步体验。
体验一是 shopper mirror。
购物者打开移动 URL，上传照片，选择 style brief，并收到 result card。
当 credentials 可用时，result card 由 Perfect Corp 驱动。
体验二是 operator control room。
操作员打开 `/app`，开始 launch session，观看 agent trace，并查看 provider health。
Crusoe Nemotron agent 生成 recommendation、risk checklist 和 replay plan。
配置后，TrueFoundry 集成捕获 gateway 或 resilience behavior。
Lark 集成创建或准备一个可以 replay shopper path 的 workflow。
所有事件都存储在 session proof receipt 中。
Demo 围绕一个明确问题构建：漂亮的 try-on flow 出故障时会怎样？
MirrorRun 的回答是展示 recovery，而不是 blank screen。
产品长期 wedge 是 "preflight for AI retail experiences"。
Business buyer 是希望 conversion-safe personalization 的零售团队。
Developer buyer 是需要 reproducible evidence 的 QA/engineering 团队。
赞助商价值不藏在代码里；每个赞助商都有可见产品角色。

## 7. 用户流程
Flow A：launch session。
Step 1：operator 打开 `/app`。
Step 2：operator 点击 `Start launch session`。
Step 3：system 在 D1 中创建 `session_id`。
Step 4：system 显示 mobile shopper path 的 QR link。
Step 5：operator 看到空的 proof timeline。
Flow B：shopper try-on。
Step 1：shopper 打开 `/m/{session_id}` 或扫描 QR。
Step 2：shopper 上传 image。
Step 3：shopper 选择 style brief。
Step 4：backend 将 image 存入 R2。
Step 5：如果 credentials 已配置，backend 调用 Perfect Corp。
Step 6：UI 显示 before/after result 或诚实的 credential blocker。
Flow C：agent planning。
Step 1：backend 将 session context 发送到 Crusoe Nemotron。
Step 2：agent 返回 recommendation、checklist 和 replay plan。
Step 3：frontend 将 trace streaming 到 control room。
Step 4：proof receipt 存储 model 和 trace metadata。
Flow D：resilience proof。
Step 1：operator 切换 controlled failure mode。
Step 2：backend 通过 resilience path 路由。
Step 3：UI 显示 degraded provider/tool state。
Step 4：shopper card 保持可用。
Step 5：receipt 存储 recovery event。
Flow E：Lark replay。
Step 1：operator 点击 `Create replay`。
Step 2：backend 从 session steps 构建 Lark workflow description。
Step 3：如果 `GETLARK_API_KEY` 存在，则创建或 invoke workflow。
Step 4：如果 key 缺失，UI 显示精确 setup instructions。
Step 5：receipt 存储 workflow id 或 blocked-key status。

## 8. User Cases（至少两个）
User Case 1 HERO PATH：retail PM 发布 shopper try-on journey。
PM 开始 session。
PM 扫描 QR link。
Shopper 上传 image。
Result 出现在 control room 旁边。
PM 看到一个包含 media 和 agent trace 的 proof receipt。
该 case 重要，因为它创造 Perfect Corp 和 Overall judging value。
User Case 2：QA lead 将旅程转换为可 replay 的 workflow。
QA lead 打开 session detail page。
QA lead 点击 `Create replay`。
System 创建或准备 Lark workflow。
Proof receipt 显示 workflow id、artifacts 和 rerun command。
该 case 重要，因为它给 Lark 一个真实 developer workflow。
User Case 3：engineering lead 证明 failure 下的 resilience。
Engineering lead 切换 model/tool failure。
System 记录 failure 和 recovery。
Shopper path 保持可用。
Proof receipt 显示 gateway 或 policy evidence。
该 case 重要，因为它指向 TrueFoundry 和 feasibility。

## 9. Demo 关键路径与 Hero Moment
Primary demo path 应该控制在 90 秒 screen time 以内。
1. 打开 `/app` 并开始 `Spring Launch` session。
2. 展示 QR/mobile shopper path。
3. 上传 image 并选择 style brief。
4. 展示 try-on result 或 configured-key proof。
5. 展示 Crusoe Nemotron trace 生成 recommendation 和 launch checklist。
6. 切换 `MCP failure` 或 `LLM brownout`。
7. 展示 recovered shopper card。
8. 展示 TrueFoundry recovery event。
9. 点击 `Create replay`。
10. 展示 Lark workflow id 或精确 credential blocker。
Hero Moment 5 秒：
0:00 — try-on result 可见，launch status 为 green。
0:01 — operator 切换 failure switch。
0:03 — health strip 显示失败的 MCP 或 LLM dependency。
0:05 — shopper card 仍然可用，proof timeline 增加 `Recovered`。
Secondary visible beat for combined video：
Proof page 显示一个包含 image result、agent trace、gateway event 和 Lark replay id 的 receipt。
Demo 必须避免 raw JSON 作为默认视觉。
Demo 必须展示 visible recovery，而不只是文字说 "fallback worked"。

## 10. 页面 / 模块规划（>= 3 个交互面）
Surface 1：`/`。
Purpose：面向 judges 和 Devpost reviewers 的公开 product landing page。
Components：`HeroMirror`、`SponsorProofStrip`、`LaunchReceiptPreview`、`VideoCTA`。
Interactive behavior：打开 live app，并展示 screenshot/video links。
Surface 2：`/app`。
Purpose：主要 operator control room。
Components：`LaunchSessionPanel`、`ShopperMirror`、`AgentTrace`、`ProviderHealth`、`FaultSwitch`。
Interactive behavior：start session、trigger agent run、inject failure、create replay。
Surface 3：`/m/[sessionId]`。
Purpose：QR/mobile shopper path。
Components：`MobileUpload`、`StyleBriefPicker`、`ResultCard`、`RecoveryBanner`。
Interactive behavior：upload image、choose style、submit、see result。
Surface 4：`/app/session/[id]`。
Purpose：proof receipt detail。
Components：`ProofTimeline`、`MediaEvidence`、`GatewayEventCard`、`LarkReplayCard`。
Interactive behavior：inspect receipt、copy replay command、open artifacts。
Surface 5：`/app/replays`。
Purpose：workflow management。
Components：`ReplayTable`、`RunStatusDrawer`、`CreateWorkflowButton`。
Interactive behavior：generate workflow、invoke rerun、inspect status。
Surface 6：`/about`。
Purpose：architecture 和 sponsor-fit explanation。
Components：`ArchitectureDiagram`、`DataFlow`、`SponsorUse`。
Interactive behavior：copy smoke commands 并打开 source links。
Route table：
| Route | Responsibility | Primary module |
| --- | --- | --- |
| `/` | Public product story | `HeroMirror` |
| `/app` | Operator control room | `LaunchSessionPanel` |
| `/m/[sessionId]` | QR shopper path | `MobileUpload` |
| `/app/session/[id]` | Proof receipt | `ProofTimeline` |
| `/app/replays` | QA replay workflows | `ReplayTable` |
Minimum for submission：`/`、`/app`、`/m/[sessionId]`、`/app/session/[id]`。
Nice-to-have：如果时间允许，`/app/replays` 作为独立 route。

## 11. 视觉方向与 UI 原则
Visual style lane：`operational-dashboard + beauty-retail editorial`。
Primary UI library：Mantine 或 Radix Themes，用于 dense controls。
Supporting UI library：shadcn/ui primitives，用于 buttons、cards、dialogs、inputs、labels、skeletons 和 toasts。
Supporting visualization library：Recharts 或 ECharts，用于 health strips 和 timelines。
Component list：launch session shell、shopper mirror、agent trace、provider health strip、fault switch、replay receipt、mobile upload。
Non-Tailwind visual signature：带 editorial receipt cards 的 split-screen mirror/control-room cockpit。
Logo source：`logo-generator` 必须生成六个 variants 和最终 SVG brand pack。
Avatar source：DiceBear `lorelei` 或 initial-based operator avatars；primary icons 不使用 emoji glyphs。
Generated image assets：UI mockups、OG card 和四张 deck illustrations。
Generated-image asset plan：UI mockups、OG card 和四张 deck illustrations。
Hero composition：左侧 mirror，右侧 reliability proof room。
Visual differentiation note：不是 purple AI assistant，也不是 generic observability dashboard。
Forbidden lookalikes：chatbot app、static try-on gallery、default shadcn admin shell、dark blue SaaS dashboard。
QR mobile access plan：desktop 显示 QR；mobile 直接打开 `/m/[sessionId]`。
Mobile primary flow：upload image、select style、submit、read result 和 recovery note。
Desktop parity plan：desktop 拥有完整 proof timeline、provider health 和 replay controls。
Motion vocabulary：subtle premium with editorial cuts。
Accessibility：buttons 需要 focus rings；uploads 需要 labels；mobile tap targets 至少 44 px。
Performance：landing page 在 media 之前应小于 500 KB。
Copy principle：公开 UI 使用 "launch"、"recover"、"replay" 和 "receipt"；避免 "hackathon"、"MVP" 和 model-name hero copy。

## 12. 技术约束
Framework：latest stable Next.js App Router。
Styling：latest stable Tailwind，仅作为 utility substrate。
Backend：Next.js Route Handlers 和 Server Actions。
Deployment target：通过 OpenNext 到 Cloudflare Workers。
State：Cloudflare D1，用于 sessions、events、replays 和 receipts。
Media：Cloudflare R2，用于 uploaded images 和 generated result images。
Cache：Cloudflare KV，用于 run status 和 short-lived mobile session state。
Streaming：Server-Sent Events，用于 agent trace 和 status updates。
Required env：`CRUSOE_API_KEY`。
Official key URL：https://console.crusoecloud.com/request-foundry。
Required env：`CRUSOE_BASE_URL`。
Official docs：https://docs.crusoecloud.com/managed-inference/overview/。
Required env：`CRUSOE_MODEL`。
Hackathon source：https://devnetwork-ai-ml-hack-2026.devpost.com/details/sponsors。
Required env：`PERFECT_API_KEY`。
Official key URL：https://yce.perfectcorp.com/api-console/en/redeem-code/。
Required env：`PERFECT_API_SECRET`，如果 selected endpoint 需要。
Official API page：https://www.perfectcorp.com/business/ai-apis/。
Required env：`TRUEFOUNDRY_API_KEY`。
Official docs：https://www.truefoundry.com/docs/ai-gateway/intro-to-llm-gateway。
Required env：`GETLARK_API_KEY`。
Official key source：https://dashboard.getlark.ai/。
Real data source：R2 中的 user-uploaded media。
Real data source：Perfect Corp API job/result。
Real data source：Crusoe Managed Inference response。
Real data source：TrueFoundry gateway event 或 policy receipt。
Real data source：Lark workflow id/execution id。
Missing-key policy：显示精确 blocker 和 official URL；不要 fake hero receipts。
Security：绝不把 sponsor keys 暴露到 client。
Privacy：uploaded images 只为 launch session 存储，并可从 receipt view 删除或导出。
Testing：Playwright 必须覆盖 start session、upload、fault toggle、replay creation 和 mobile path。

## PRD coverage matrix
| Requirement | Priority | User case | Route/component | API/server action | Real data source | Contract/state | Test | Deploy evidence | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `REQ-001` | P0 | HERO PATH | `/app` + `LaunchSessionPanel` | `POST /api/sessions` | D1 session row | `LaunchSession` | `tests/hero.spec.ts` | Cloudflare URL + session id | planned |
| `REQ-002` | P0 | HERO PATH | `/m/[sessionId]` + `MobileUpload` | `POST /api/media/upload` | R2 object | `ShopperMedia` | `tests/mobile.spec.ts` | R2 key in receipt | planned |
| `REQ-003` | P0 | HERO PATH | `ShopperMirror` | `POST /api/perfect/try-on` | Perfect Corp result | `TryOnResult` | `tests/perfect.spec.ts` | API job id/result URL | planned |
| `REQ-004` | P0 | HERO PATH | `AgentTrace` | `POST /api/agent/plan` | Crusoe response | `AgentRun` | `tests/agent.spec.ts` | model receipt | planned |
| `REQ-005` | P0 | UC3 | `ProviderHealth` | `GET /api/health/providers` | gateway/provider status | `ProviderStatus` | `tests/resilience.spec.ts` | status event | planned |
| `REQ-006` | P0 | UC3 | `FaultSwitch` | `POST /api/resilience/fault` | TrueFoundry event | `RecoveryEvent` | `tests/resilience.spec.ts` | event id | planned |
| `REQ-007` | P0 | UC2 | `LarkReplayCard` | `POST /api/lark/workflows` | Lark workflow id | `ReplayWorkflow` | `tests/lark.spec.ts` | workflow id | planned |
| `REQ-008` | P0 | all | `/app/session/[id]` + `ProofTimeline` | `GET /api/sessions/[id]/receipt` | D1 + R2 + APIs | `ProofReceipt` | `tests/receipt.spec.ts` | receipt URL | planned |
| `REQ-009` | P1 | UC2 | `/app/replays` | `POST /api/lark/invoke` | Lark execution id | `ReplayExecution` | `tests/lark.spec.ts` | execution id | planned |
| `REQ-010` | P1 | HERO PATH | `/m/[sessionId]` | client route | mobile session state | `MobileSession` | `tests/mobile.spec.ts` | mobile screenshot | planned |
| `REQ-011` | P1 | all | `CredentialBlocker` | `GET /api/config/status` | env status | `CredentialStatus` | `tests/config.spec.ts` | blocker screenshot | planned |
| `REQ-012` | P1 | submission | `SUBMISSION.md` | n/a | docs/screenshots/video URL | `SubmissionPackage` | manual review | Devpost receipt | planned |

## 13. 成功指标
Demo metric：评委在 10 秒内理解产品。
Demo metric：hero moment 在 30 秒内完成。
Technical metric：至少两个外部 sponsor backbones 在真实凭据下工作。
Technical metric：缺少 credentials 是 honest blockers，而不是 fake success states。
Technical metric：proof receipt 包含至少四行 evidence。
Product metric：故事解释 buyer 和 budget。
Product metric：产品可以被描述为 launch readiness for AI retail。
Sponsor metric：Crusoe model use 在 trace 中可见。
Sponsor metric：Perfect Corp output 是 consumer-facing visual result。
Sponsor metric：Lark workflow 是 useful developer artifact。
Sponsor metric：TrueFoundry resilience behavior 在 failure 下可见。
Submission metric：Devpost story 从 user pain 开始，而不是 stack。
Submission metric：screenshots 展示 shopper mirror 和 proof receipt。
Submission metric：video 包含 pitch 和 demo，因为 delivery mode 是 combined。
Quality metric：公开 UI copy 不说 "MVP"、"hackathon" 或 "prototype"。
Quality metric：raw JSON 不作为默认 reviewer-visible surface。

## 14. 风险与 Cut List
Risk：四个 sponsor integrations 可能超过剩余时间。
Mitigation：构建一个 hero path，并保持每个 integration thin but real。
Risk：Perfect Corp credentials 可能无法及时拿到。
Mitigation：诚实阻塞 Perfect flow，并继续展示其余部分；不要 fake try-on output。
Risk：TrueFoundry setup 可能比 hackathon deadline 更慢。
Mitigation：记录 gateway key blocker，只把 local fault path 作为 internal test evidence，而不是 sponsor proof。
Risk：Lark workflow creation 可能需要 dashboard setup。
Mitigation：支持 CLI login，并显示精确 `getlark` command。
Risk：Crusoe hackathon model alias 可能与官方 docs 不同。
Mitigation：通过 env 配置 model，并列出 hackathon alias 和 official Nemotron fallback。
Risk：image uploads 产生 privacy concerns。
Mitigation：使用 short-lived session media，并提供 delete/export controls。
Risk：UI 对 Perfect Corp 来说过于 developer-heavy。
Mitigation：让 shopper mirror 在视觉上优先。
Cut item 1：multi-product catalog search。
Cut item 2：GitHub/Linear repair integration。
Cut item 3：full user auth。
Cut item 4：multi-tenant workspace。
Cut item 5：custom analytics dashboards。
Cut item 6：如果 combined video 已完成，则 cut automated deck export。
Do not cut：launch session。
Do not cut：shopper path。
Do not cut：Crusoe agent trace。
Do not cut：proof receipt。
Do not cut：honest missing-key blockers。
