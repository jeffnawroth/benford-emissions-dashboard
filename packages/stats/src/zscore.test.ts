import { describe, expect, it } from 'vitest'
import { digitZScore, isZSignificant } from './zscore'

describe('digitZScore', () => {
  it('is near zero when observed matches expected at large n', () => {
    const z = digitZScore(0.301, 0.301, 100_000)
    expect(z).toBeLessThan(0.5)
    expect(isZSignificant(z)).toBe(false)
  })

  it('is large and significant for a big deviation at large n', () => {
    const z = digitZScore(0.5, 0.301, 100_000)
    expect(z).toBeGreaterThan(10)
    expect(isZSignificant(z, 0.05)).toBe(true)
    expect(isZSignificant(z, 0.01)).toBe(true)
  })
})

describe('isZSignificant', () => {
  it('uses the standard critical values', () => {
    expect(isZSignificant(1.95, 0.05)).toBe(false)
    expect(isZSignificant(1.97, 0.05)).toBe(true)
    expect(isZSignificant(2.5, 0.01)).toBe(false)
    expect(isZSignificant(2.6, 0.01)).toBe(true)
  })
})
