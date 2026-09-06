export const CANONICAL_HOST = 'bed.jeffnawroth.me'
const REDIRECT_HOSTS = new Set(['www.bed.jeffnawroth.me'])

/**
 * 301s a non-canonical hostname (currently just the old `www.` prefix) to
 * the canonical one, preserving path/query. Returns null when no redirect
 * is needed, so the caller falls through to normal request handling.
 */
export function redirectToCanonicalHost(url: URL): Response | null {
  if (!REDIRECT_HOSTS.has(url.hostname))
    return null

  const target = new URL(url)
  target.hostname = CANONICAL_HOST
  return Response.redirect(target.toString(), 301)
}
