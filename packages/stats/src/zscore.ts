/** Continuity-corrected per-digit Z-statistic (Nigrini). */
export function digitZScore(
  observedProportion: number,
  expectedProportion: number,
  n: number,
): number {
  const numerator = Math.abs(observedProportion - expectedProportion - 1 / (2 * n))
  const denominator = Math.sqrt((expectedProportion * (1 - expectedProportion)) / n)
  return numerator / denominator
}

const CRITICAL_VALUES = {
  0.05: 1.96,
  0.01: 2.576,
} as const

export function isZSignificant(z: number, alpha: 0.05 | 0.01 = 0.05): boolean {
  return z > CRITICAL_VALUES[alpha]
}
