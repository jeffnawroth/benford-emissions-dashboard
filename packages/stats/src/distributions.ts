/** Expected Benford's Law proportions (0-1, not percentages). */

export function expectedFirstDigit(d: number): number {
  return Math.log10(1 + 1 / d)
}

export function expectedSecondDigit(d: number): number {
  let sum = 0
  for (let d1 = 1; d1 <= 9; d1++)
    sum += Math.log10(1 + 1 / (10 * d1 + d))
  return sum
}

export function expectedFirstTwoDigits(n: number): number {
  return Math.log10(1 + 1 / n)
}

/** Index 0 = digit 1 .. index 8 = digit 9. */
export function expectedFirstDigitTable(): number[] {
  return Array.from({ length: 9 }, (_, i) => expectedFirstDigit(i + 1))
}

/** Index 0 = digit 0 .. index 9 = digit 9. */
export function expectedSecondDigitTable(): number[] {
  return Array.from({ length: 10 }, (_, i) => expectedSecondDigit(i))
}

/** Index 0 = "10" .. index 89 = "99". */
export function expectedFirstTwoDigitsTable(): number[] {
  return Array.from({ length: 90 }, (_, i) => expectedFirstTwoDigits(i + 10))
}
