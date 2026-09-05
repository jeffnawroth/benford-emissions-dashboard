import type { BenfordTestType } from '@benford/stats'

// Mirrors the labelOffset convention in packages/stats/src/analyze.ts's
// TEST_CONFIG: firstDigit labels start at 1, secondDigit at 0, firstTwoDigits at 10.
const LABEL_OFFSET: Record<BenfordTestType, number> = {
  firstDigit: 1,
  secondDigit: 0,
  firstTwoDigits: 10,
}

export function digitLabels(testType: BenfordTestType, count: number): string[] {
  const offset = LABEL_OFFSET[testType]
  return Array.from({ length: count }, (_, i) => String(i + offset))
}

export const TEST_TYPE_LABEL: Record<BenfordTestType, string> = {
  firstDigit: 'first digit',
  secondDigit: 'second digit',
  firstTwoDigits: 'first two digits',
}
