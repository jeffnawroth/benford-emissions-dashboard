import { describe, expect, it } from 'vitest'
import { firstDigit, leadingDigits, secondDigit } from './digits'

describe('leadingDigits / firstDigit / secondDigit', () => {
  it('extracts digits from a simple integer', () => {
    expect(firstDigit(123)).toBe(1)
    expect(secondDigit(123)).toBe(2)
  })

  it('extracts digits from a value less than 1 (the old toString()[0] bug)', () => {
    expect(firstDigit(0.0523)).toBe(5)
    expect(secondDigit(0.0523)).toBe(2)
  })

  it('uses the absolute value for negative numbers', () => {
    expect(firstDigit(-77)).toBe(7)
    expect(secondDigit(-77)).toBe(7)
  })

  it('returns null for zero, NaN, and infinities', () => {
    expect(firstDigit(0)).toBeNull()
    expect(firstDigit(Number.NaN)).toBeNull()
    expect(firstDigit(Number.POSITIVE_INFINITY)).toBeNull()
    expect(firstDigit(Number.NEGATIVE_INFINITY)).toBeNull()
    expect(secondDigit(0)).toBeNull()
  })

  it('handles exact powers of ten', () => {
    expect(firstDigit(100)).toBe(1)
    expect(secondDigit(100)).toBe(0)
    expect(firstDigit(1000)).toBe(1)
    expect(secondDigit(1000)).toBe(0)
  })

  it('resolves floating-point boundary drift correctly', () => {
    // A human reading these decimal values would say leading digit 9,
    // second digit 9 for both cases despite being adjacent to a power of ten.
    expect(firstDigit(999.9999999999999)).toBe(9)
    expect(secondDigit(999.9999999999999)).toBe(9)
    expect(firstDigit(0.09999999999999999)).toBe(9)
  })

  it('handles very large and very small magnitudes', () => {
    expect(firstDigit(1.2e21)).toBe(1)
    expect(secondDigit(1.2e21)).toBe(2)
    expect(firstDigit(4.5e-15)).toBe(4)
    expect(secondDigit(4.5e-15)).toBe(5)
  })

  it('leadingDigits(value, 2) returns a two-digit integer 10-99', () => {
    expect(leadingDigits(456, 2)).toBe(45)
    expect(leadingDigits(0.00456, 2)).toBe(45)
    expect(leadingDigits(9, 2)).toBe(90)
  })
})
