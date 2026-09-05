/** Chi-square goodness-of-fit test against a Benford expected distribution. */

export function chiSquareStatistic(
  observedCounts: number[],
  expectedProportions: number[],
  n: number,
): number {
  let statistic = 0
  for (let i = 0; i < observedCounts.length; i++) {
    // observedCounts and expectedProportions are always built with matching
    // length (one entry per digit category), so index i is always in range.
    const expectedCount = expectedProportions[i]! * n
    statistic += (observedCounts[i]! - expectedCount) ** 2 / expectedCount
  }
  return statistic
}

/** Lanczos approximation of ln(Gamma(x)) for x > 0. */
function logGamma(x: number): number {
  const g = 7
  const coefficients = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ]

  if (x < 0.5) {
    // Reflection formula.
    return Math.log(Math.PI / Math.sin(Math.PI * x)) - logGamma(1 - x)
  }

  const xShifted = x - 1
  // `coefficients` is a fixed 9-element literal and the loop below only
  // ever indexes 0..8, so every access here is in range.
  let a = coefficients[0]!
  const t = xShifted + g + 0.5
  for (let i = 1; i < g + 2; i++)
    a += coefficients[i]! / (xShifted + i)

  return 0.5 * Math.log(2 * Math.PI) + (xShifted + 0.5) * Math.log(t) - t + Math.log(a)
}

const EPS = 3e-16
const MAX_ITERATIONS = 500

/** Regularized lower incomplete gamma function P(a, x) via series expansion. */
function lowerIncompleteGammaSeries(a: number, x: number): number {
  if (x === 0)
    return 0

  const gln = logGamma(a)
  let ap = a
  let sum = 1 / a
  let del = sum
  for (let n = 0; n < MAX_ITERATIONS; n++) {
    ap += 1
    del *= x / ap
    sum += del
    if (Math.abs(del) < Math.abs(sum) * EPS)
      break
  }
  return sum * Math.exp(-x + a * Math.log(x) - gln)
}

/** Regularized upper incomplete gamma function Q(a, x) via continued fraction. */
function upperIncompleteGammaContinuedFraction(a: number, x: number): number {
  const gln = logGamma(a)
  const FPMIN = 1e-300

  let b = x + 1 - a
  let c = 1 / FPMIN
  let d = 1 / b
  let h = d

  for (let i = 1; i <= MAX_ITERATIONS; i++) {
    const an = -i * (i - a)
    b += 2
    d = an * d + b
    if (Math.abs(d) < FPMIN)
      d = FPMIN
    c = b + an / c
    if (Math.abs(c) < FPMIN)
      c = FPMIN
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < EPS)
      break
  }

  return Math.exp(-x + a * Math.log(x) - gln) * h
}

/**
 * Upper-tail p-value P(X > statistic) for a chi-square distribution with
 * `degreesOfFreedom` degrees of freedom, computed as the regularized upper
 * incomplete gamma function Q(df/2, statistic/2).
 */
export function chiSquarePValue(statistic: number, degreesOfFreedom: number): number {
  if (statistic <= 0)
    return 1

  const a = degreesOfFreedom / 2
  const x = statistic / 2

  if (x < a + 1)
    return 1 - lowerIncompleteGammaSeries(a, x)

  return upperIncompleteGammaContinuedFraction(a, x)
}
