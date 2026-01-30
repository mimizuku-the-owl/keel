# ⚓ Keel

**Agent monitoring, cost control, and alerting for personal AI agents.**

Keel is the operational backbone for your AI agents — track costs, set budgets, configure alerts, and see what your agents are doing in real-time.

Built for the [Clawdbot](https://github.com/clawdbot/clawdbot) / OpenClaw ecosystem but designed to work with any AI agent platform.

## Features

- 💰 **Cost Explorer** — Real-time token/dollar tracking per agent, session, and day. Budget caps with hard stops.
- 🚨 **Alert Engine** — Configurable thresholds for cost spikes, agent offline, error rates, session loops, and more.
- 📊 **Health Dashboard** — Agent status, uptime, active sessions, heartbeat history at a glance.
- 📜 **Activity Feed** — "What did my agent do?" timeline without reading raw logs.
- 🔔 **Notifications** — Discord webhooks, email, custom webhooks — deliver alerts where you need them.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** [Convex](https://convex.dev) (self-hosted) — reactive database with real-time subscriptions
- **Runtime:** Bun / Node.js
- **Gateway Integration:** Connects to Clawdbot gateway WebSocket for live data

## Quick Start

### 1. Start Convex (self-hosted)

```bash
cd infra
docker compose up -d
docker compose exec backend ./generate_admin_key.sh
```

### 2. Configure

Create `.env.local`:

```bash
CONVEX_SELF_HOSTED_URL=http://127.0.0.1:3210
CONVEX_SELF_HOSTED_ADMIN_KEY=<your-admin-key>
VITE_CONVEX_URL=http://127.0.0.1:3210
```

### 3. Install & Run

```bash
bun install
npx convex dev --once  # Push schema
bun run dev            # Start frontend
```

Visit `http://localhost:5173` for the dashboard and `http://localhost:6791` for the Convex dashboard.

## Architecture

```
┌──────────────┐     WebSocket      ┌──────────────────┐
│  Clawdbot    │ ─────────────────▸ │  Keel Collector   │
│  Gateway     │                    │  (planned)        │
└──────────────┘                    └────────┬──────────┘
                                             │
                                    Convex Mutations
                                             │
                                    ┌────────▼──────────┐
                                    │  Convex Backend    │
                                    │  (self-hosted)     │
                                    └────────┬──────────┘
                                             │
                                    Real-time Queries
                                             │
                                    ┌────────▼──────────┐
                                    │  Keel Dashboard    │
                                    │  (React + Vite)    │
                                    └───────────────────┘
```

## Status

🚧 **v0.1.0 — Under active development**

Built by [mimizuku-the-owl](https://github.com/mimizuku-the-owl) 🦉

## License

MIT
