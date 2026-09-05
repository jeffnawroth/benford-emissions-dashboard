import { describe, expect, it } from 'vitest'
import { analyzeBenford } from './analyze'

/** Powers of two are a textbook example of a first-digit-Benford-conforming sequence. */
function powersOfTwo(count: number): number[] {
  return Array.from({ length: count }, (_, i) => 2 ** (i + 1))
}

describe('analyzeBenford', () => {
  it('reports a close/acceptable conformity for a Benford-conforming dataset', () => {
    const result = analyzeBenford(powersOfTwo(1000), 'firstDigit')
    expect(result.status).toBe('ok')
    if (result.status !== 'ok')
      return
    expect(result.n).toBe(1000)
    expect(['close', 'acceptable']).toContain(result.mad.conformity)
    // A near-perfect fit has a large (non-tiny) p-value.
    expect(result.chiSquare.pValue).toBeGreaterThan(0.5)
  })

  it('reports nonconformity for a clearly non-Benford dataset', () => {
    // Every value in [1000, 1349] has leading digit 1 -> heavily concentrated,
    // the opposite of Benford's expected ~30% share for digit 1.
    const values = Array.from({ length: 350 }, (_, i) => 1000 + i)
    const result = analyzeBenford(values, 'firstDigit')
    expect(result.status).toBe('ok')
    if (result.status !== 'ok')
      return
    expect(result.mad.conformity).toBe('nonconformity')
    expect(result.chiSquare.pValue).toBeLessThan(0.001)
  })

  it('returns insufficient-data status below the minimum sample size', () => {
    const result = analyzeBenford(powersOfTwo(10), 'firstDigit')
    expect(result.status).toBe('insufficient-data')
    if (result.status !== 'insufficient-data')
      return
    expect(result.n).toBe(10)
    expect(result.minimumRequired).toBe(300)
  })

  it('excludes zeros/NaN/Infinity but keeps valid negative values', () => {
    const validPositives = powersOfTwo(300)
    const validNegatives = [-50, -60, -70, -80, -90]
    const invalid = [0, 0, 0, 0, 0, Number.NaN, Number.NaN, Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
    const values = [...validPositives, ...validNegatives, ...invalid]

    const result = analyzeBenford(values, 'firstDigit')
    expect(result.status).toBe('ok')
    if (result.status !== 'ok')
      return
    expect(result.excludedCount).toBe(invalid.length)
    expect(result.n).toBe(validPositives.length + validNegatives.length)
  })

  it('never produces NaN in its output for a valid dataset', () => {
    const result = analyzeBenford(powersOfTwo(1000), 'firstDigit')
    expect(result.status).toBe('ok')
    if (result.status !== 'ok')
      return
    expect(Number.isNaN(result.mad.value)).toBe(false)
    expect(Number.isNaN(result.chiSquare.pValue)).toBe(false)
    for (const z of result.zScores)
      expect(Number.isNaN(z.z)).toBe(false)
  })
})
