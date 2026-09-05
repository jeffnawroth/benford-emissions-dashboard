/**
 * Extracts leading digits from a number for Benford's Law analysis.
 *
 * Uses `Number.prototype.toExponential`, which produces a correctly-rounded
 * decimal representation of the underlying double, rather than string-slicing
 * the default `toString()` output (`value.toString()[0]`) or normalizing the
 * mantissa via repeated division by `10 ** exp` — both of those silently drift
 * at extreme magnitudes (e.g. `4.5e-15` can compute a mantissa of
 * `4.499999999999999` instead of `4.5` once floating-point error from the
 * division compounds with the exponent).
 */
export function leadingDigits(value: number, count: 1 | 2): number | null {
  if (!Number.isFinite(value) || value === 0)
    return null

  // 16 significant digits (1 before the decimal point + 15 after) is within
  // a double's reliable precision; asking for one more reveals representation
  // noise in the least-significant digit rather than the value's true digits
  // (e.g. the double nearest 4.5e-15 is actually ~4.4999999999999998e-15).
  const exponential = Math.abs(value).toExponential(15)
  const mantissaDigits = exponential.slice(0, exponential.indexOf('e')).replace('.', '')

  if (count === 1)
    return Number(mantissaDigits[0])

  return Number(mantissaDigits.slice(0, 2))
}

export function firstDigit(value: number): number | null {
  return leadingDigits(value, 1)
}

export function secondDigit(value: number): number | null {
  const twoDigits = leadingDigits(value, 2)
  if (twoDigits === null)
    return null
  return twoDigits % 10
}
