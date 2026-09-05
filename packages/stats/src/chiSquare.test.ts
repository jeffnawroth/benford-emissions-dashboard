import { describe, expect, it } from 'vitest'
import { chiSquarePValue, chiSquareStatistic } from './chiSquare'

describe('chiSquareStatistic', () => {
  it('is zero when observed exactly matches expected', () => {
    const expectedProportions = [0.5, 0.5]
    const n = 100
    const observedCounts = [50, 50]
    expect(chiSquareStatistic(observedCounts, expectedProportions, n)).toBeCloseTo(0, 10)
  })

  it('increases as observed deviates from expected', () => {
    const expectedProportions = [0.5, 0.5]
    const n = 100
    const small = chiSquareStatistic([55, 45], expectedProportions, n)
    const large = chiSquareStatistic([90, 10], expectedProportions, n)
    expect(large).toBeGreaterThan(small)
  })
})

describe('chiSquarePValue', () => {
  // Reference values are the standard chi-square critical-value table for df=8:
  // upper-tail area 0.995 -> 1.344, 0.10 -> 13.362, 0.05 -> 15.507, 0.01 -> 20.090, 0.005 -> 21.955.
  it('reproduces standard chi-square critical values for df=8', () => {
    expect(chiSquarePValue(1.344, 8)).toBeCloseTo(0.995, 2)
    expect(chiSquarePValue(13.362, 8)).toBeCloseTo(0.10, 2)
    expect(chiSquarePValue(15.507, 8)).toBeCloseTo(0.05, 2)
    expect(chiSquarePValue(20.090, 8)).toBeCloseTo(0.01, 2)
    expect(chiSquarePValue(21.955, 8)).toBeCloseTo(0.005, 2)
  })

  it('returns 1 for a statistic of 0', () => {
    expect(chiSquarePValue(0, 8)).toBe(1)
  })

  it('returns a p-value near 0 for a very large statistic', () => {
    expect(chiSquarePValue(1000, 8)).toBeLessThan(1e-100)
  })
})
