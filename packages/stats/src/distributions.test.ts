import { describe, expect, it } from 'vitest'
import {
  expectedFirstDigit,
  expectedFirstDigitTable,
  expectedFirstTwoDigitsTable,
  expectedSecondDigitTable,
} from './distributions'

function sum(values: number[]): number {
  return values.reduce((a, b) => a + b, 0)
}

describe('expectedFirstDigit', () => {
  it('matches the well-known Benford first-digit proportions', () => {
    expect(expectedFirstDigit(1)).toBeCloseTo(0.30103, 5)
    expect(expectedFirstDigit(9)).toBeCloseTo(0.04576, 5)
  })
})

describe('expected*Table', () => {
  it('each table sums to 1', () => {
    expect(sum(expectedFirstDigitTable())).toBeCloseTo(1, 9)
    expect(sum(expectedSecondDigitTable())).toBeCloseTo(1, 9)
    expect(sum(expectedFirstTwoDigitsTable())).toBeCloseTo(1, 9)
  })

  it('first-digit table has the correct length and monotonically decreases', () => {
    const table = expectedFirstDigitTable()
    expect(table).toHaveLength(9)
    for (let i = 1; i < table.length; i++)
      expect(table[i]!).toBeLessThan(table[i - 1]!)
  })

  it('second-digit table has the correct length', () => {
    expect(expectedSecondDigitTable()).toHaveLength(10)
  })

  it('first-two-digits table has the correct length', () => {
    expect(expectedFirstTwoDigitsTable()).toHaveLength(90)
  })
})
