import { describe, expect, it } from 'vitest'
import { madConformity, meanAbsoluteDeviation } from './mad'

describe('meanAbsoluteDeviation', () => {
  it('is zero when observed exactly matches expected', () => {
    expect(meanAbsoluteDeviation([0.3, 0.7], [0.3, 0.7])).toBeCloseTo(0, 10)
  })

  it('averages the absolute per-digit deviations', () => {
    // |0.4-0.3| + |0.6-0.7| = 0.1 + 0.1 = 0.2, divided by k=2 -> 0.1
    expect(meanAbsoluteDeviation([0.4, 0.6], [0.3, 0.7])).toBeCloseTo(0.1, 10)
  })
})

describe('madConformity', () => {
  it('classifies firstDigit thresholds correctly', () => {
    expect(madConformity(0.0059, 'firstDigit')).toBe('close')
    expect(madConformity(0.006, 'firstDigit')).toBe('acceptable')
    expect(madConformity(0.0119, 'firstDigit')).toBe('acceptable')
    expect(madConformity(0.012, 'firstDigit')).toBe('marginal')
    expect(madConformity(0.0149, 'firstDigit')).toBe('marginal')
    expect(madConformity(0.015, 'firstDigit')).toBe('nonconformity')
    expect(madConformity(0.05, 'firstDigit')).toBe('nonconformity')
  })

  it('classifies secondDigit thresholds correctly', () => {
    expect(madConformity(0.0079, 'secondDigit')).toBe('close')
    expect(madConformity(0.008, 'secondDigit')).toBe('acceptable')
    expect(madConformity(0.010, 'secondDigit')).toBe('marginal')
    expect(madConformity(0.012, 'secondDigit')).toBe('nonconformity')
  })

  it('classifies firstTwoDigits thresholds correctly', () => {
    expect(madConformity(0.0011, 'firstTwoDigits')).toBe('close')
    expect(madConformity(0.0012, 'firstTwoDigits')).toBe('acceptable')
    expect(madConformity(0.0018, 'firstTwoDigits')).toBe('marginal')
    expect(madConformity(0.0022, 'firstTwoDigits')).toBe('nonconformity')
  })
})
