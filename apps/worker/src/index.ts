import type { EmissionKind, OwidData, OwidMetadata } from './normalize'
import { INDICATOR_IDS, normalizeOwidResponse } from './normalize'

export interface Env {
  ASSETS: Fetcher
}

// OWID indicators update infrequently (annual data); cache aggressively at the edge
// instead of the old app's behaviour of hitting the public API on every page load.
const CACHE_TTL_SECONDS = 60 * 60 * 24

function isEmissionKind(value: string): value is EmissionKind {
  return value === 'co2' || value === 'ghg'
}

async function fetchIndicator(id: number) {
  const [dataRes, metaRes] = await Promise.all([
    fetch(`https://api.ourworldindata.org/v1/indicators/${id}.data.json`),
    fetch(`https://api.ourworldindata.org/v1/indicators/${id}.metadata.json`),
  ])

  if (!dataRes.ok || !metaRes.ok)
    throw new Error(`OWID request failed for indicator ${id}`)

  const [data, metadata] = await Promise.all([
    dataRes.json<OwidData>(),
    metaRes.json<OwidMetadata>(),
  ])

  return normalizeOwidResponse(data, metadata)
}

async function handleEmissionsRequest(request: Request, kind: string, ctx: ExecutionContext): Promise<Response> {
  if (!isEmissionKind(kind))
    return Response.json({ error: `Unknown emission type "${kind}"` }, { status: 404 })

  const cache = caches.default
  const cacheKey = new Request(new URL(request.url).toString(), request)
  const cached = await cache.match(cacheKey)
  if (cached)
    return cached

  try {
    const dataset = await fetchIndicator(INDICATOR_IDS[kind])
    const response = Response.json(dataset, {
      headers: { 'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}` },
    })
    ctx.waitUntil(cache.put(cacheKey, response.clone()))
    return response
  }
  catch {
    return Response.json({ error: 'Failed to fetch emissions data from Our World in Data' }, { status: 502 })
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const emissionsMatch = url.pathname.match(/^\/api\/emissions\/([^/]+)$/)

    if (emissionsMatch)
      return handleEmissionsRequest(request, emissionsMatch[1]!, ctx)

    return env.ASSETS.fetch(request)
  },
} satisfies ExportedHandler<Env>
