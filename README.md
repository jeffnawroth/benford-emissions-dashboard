
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) ![GitHub Release](https://img.shields.io/github/v/release/jeffnawroth/benford-emissions-dashboard) ![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/jeffnawroth/benford-emissions-dashboard/ci.yml)

# Benford Emissions Dashboard

Apply [Benford's Law](https://en.wikipedia.org/wiki/Benford%27s_law) digit-conformity analysis to CO2/GHG emissions data from [Our World in Data](https://ourworldindata.org/), or to your own uploaded CSV, to spot anomalies in reported figures.

## Demo

You can visit a demo of the [Benford Emissions Dashboard](https://bed.jeffnawroth.me) here

<!-- Insert GIF of Demo here -->

## Run Locally

Clone the project

```bash
  git clone https://github.com/jeffnawroth/benford-emissions-dashboard
```

Go to the project directory

```bash
  cd benford-emissions-dashboard
```

Install dependencies

```bash
  pnpm install
```

Start the frontend (Next.js dev server, port 3000)

```bash
  pnpm dev
```

In a second terminal, start the API worker (Wrangler dev server, port 8787) — the frontend calls it at `NEXT_PUBLIC_API_BASE_URL` (see `apps/web/.env.local.example`)

```bash
  pnpm --filter @benford/worker dev
```

## Tech Stack

Next.js (static export) + React, Tailwind CSS, Radix UI, TanStack Query, Zustand, Chart.js — deployed as a Cloudflare Worker (static assets + a small edge API that proxies/caches/normalizes the Our World in Data API). The Benford statistics themselves live in a framework-independent package, `packages/stats`.

## Authors

[@jeffnawroth](https://www.github.com/jeffnawroth)

## License

[MIT](https://choosealicense.com/licenses/mit/)
