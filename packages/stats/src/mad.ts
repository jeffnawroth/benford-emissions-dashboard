export type BenfordTestType = 'firstDigit' | 'secondDigit' | 'firstTwoDigits'
export type ConformityLevel = 'close' | 'acceptable' | 'marginal' | 'nonconformity'

export function meanAbsoluteDeviation(
  observedProportions: number[],
  expectedProportions: number[],
): number {
  const k = observedProportions.length
  let sum = 0
  // Both arrays are always built with matching length (one entry per digit
  // category), so index i is always in range.
  for (let i = 0; i < k; i++)
    sum += Math.abs(observedProportions[i]! - expectedProportions[i]!)
  return sum / k
}

interface ConformityThresholds {
  close: number
  acceptable: number
  marginal: number
}

/** Nigrini's MAD conformity boundaries, keyed by test type. */
const THRESHOLDS: Record<BenfordTestType, ConformityThresholds> = {
  firstDigit: { close: 0.006, acceptable: 0.012, marginal: 0.015 },
  secondDigit: { close: 0.008, acceptable: 0.010, marginal: 0.012 },
  firstTwoDigits: { close: 0.0012, acceptable: 0.0018, marginal: 0.0022 },
}

export function madConformity(mad: number, testType: BenfordTestType): ConformityLevel {
  const thresholds = THRESHOLDS[testType]
  if (mad < thresholds.close)
    return 'close'
  if (mad < thresholds.acceptable)
    return 'acceptable'
  if (mad < thresholds.marginal)
    return 'marginal'
  return 'nonconformity'
}
