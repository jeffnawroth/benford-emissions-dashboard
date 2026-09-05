import type { EmissionKind, NormalizedDataset } from './types'

// In production the Next.js static export is served by the same Worker that
// answers /api/*, so a relative path is same-origin. In local dev, `next dev`
// and `wrangler dev` run on separate ports — point NEXT_PUBLIC_API_BASE_URL
// at the wrangler dev server (see apps/web/.env.local.example).
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

export async function fetchEmissionsDataset(kind: EmissionKind): Promise<NormalizedDataset> {
  const response = await fetch(`${API_BASE_URL}/api/emissions/${kind}`)

  if (!response.ok)
    throw new Error(`Failed to load ${kind} emissions dataset (${response.status})`)

  return response.json() as Promise<NormalizedDataset>
}
