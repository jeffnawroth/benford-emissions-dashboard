import { describe, expect, it } from 'vitest'
import { redirectToCanonicalHost } from './redirect'

describe('redirectToCanonicalHost', () => {
  it('redirects www to the bare canonical domain, preserving path and query', () => {
    const response = redirectToCanonicalHost(new URL('https://www.bed.jeffnawroth.me/emissions?foo=bar'))
    expect(response).not.toBeNull()
    expect(response!.status).toBe(301)
    expect(response!.headers.get('location')).toBe('https://bed.jeffnawroth.me/emissions?foo=bar')
  })

  it('does not redirect the canonical host', () => {
    expect(redirectToCanonicalHost(new URL('https://bed.jeffnawroth.me/'))).toBeNull()
  })

  it('does not redirect unrelated hosts', () => {
    expect(redirectToCanonicalHost(new URL('https://localhost:8787/'))).toBeNull()
  })
})
