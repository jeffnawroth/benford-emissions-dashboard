import type { BenfordTestType, ConformityLevel } from './mad'
import { chiSquarePValue, chiSquareStatistic } from './chiSquare'
import { firstDigit, leadingDigits, secondDigit } from './digits'
import {
  expectedFirstDigitTable,
  expectedFirstTwoDigitsTable,
  expectedSecondDigitTable,
} from './distributions'
import { madConformity, meanAbsoluteDeviation } from './mad'
import { digitZScore, isZSignificant } from './zscore'

/** Nigrini-recommended minimum sample sizes for a reliable test. */
const MINIMUM_N: Record<BenfordTestType, number> = {
  firstDigit: 300,
  secondDigit: 500,
  firstTwoDigits: 1000,
}

interface DigitTestConfig {
  k: number
  labelOffset: number
  expectedTable: () => number[]
  digitOf: (value: number) => number | null
}

const TEST_CONFIG: Record<BenfordTestType, DigitTestConfig> = {
  firstDigit: {
    k: 9,
    labelOffset: 1,
    expectedTable: expectedFirstDigitTable,
    digitOf: firstDigit,
  },
  secondDigit: {
    k: 10,
    labelOffset: 0,
    expectedTable: expectedSecondDigitTable,
    digitOf: secondDigit,
  },
  firstTwoDigits: {
    k: 90,
    labelOffset: 10,
    expectedTable: expectedFirstTwoDigitsTable,
    digitOf: (value: number) => leadingDigits(value, 2),
  },
}

export interface ZScoreResult {
  digit: number
  z: number
  significantAt05: boolean
  significantAt01: boolean
}

export interface BenfordAnalysisOk {
  status: 'ok'
  testType: BenfordTestType
  n: number
  excludedCount: number
  observedCounts: number[]
  observedProportions: number[]
  expectedProportions: number[]
  chiSquare: {
    statistic: number
    degreesOfFreedom: number
    pValue: number
  }
  mad: {
    value: number
    conformity: ConformityLevel
  }
  zScores: ZScoreResult[]
}

export interface BenfordAnalysisInsufficientData {
  status: 'insufficient-data'
  testType: BenfordTestType
  n: number
  excludedCount: number
  minimumRequired: number
}

export type BenfordAnalysisResult = BenfordAnalysisOk | BenfordAnalysisInsufficientData

export function analyzeBenford(values: number[], testType: BenfordTestType): BenfordAnalysisResult {
  const config = TEST_CONFIG[testType]
  const observedCounts: number[] = Array.from<number>({ length: config.k }).fill(0)

  let n = 0
  let excludedCount = 0

  for (const value of values) {
    const digit = config.digitOf(value)
    if (digit === null) {
      excludedCount += 1
      continue
    }
    const index = digit - config.labelOffset
    observedCounts[index] = (observedCounts[index] ?? 0) + 1
    n += 1
  }

  const minimumRequired = MINIMUM_N[testType]
  if (n < minimumRequired) {
    return {
      status: 'insufficient-data',
      testType,
      n,
      excludedCount,
      minimumRequired,
    }
  }

  const expectedProportions = config.expectedTable()
  const observedProportions = observedCounts.map(count => count / n)

  const chiSquareStat = chiSquareStatistic(observedCounts, expectedProportions, n)
  const degreesOfFreedom = config.k - 1
  const pValue = chiSquarePValue(chiSquareStat, degreesOfFreedom)

  const madValue = meanAbsoluteDeviation(observedProportions, expectedProportions)
  const conformity = madConformity(madValue, testType)

  const zScores: ZScoreResult[] = observedProportions.map((observed, i) => {
    // observedProportions and expectedProportions always have matching
    // length (one entry per digit category), so index i is always in range.
    const expected = expectedProportions[i]!
    const z = digitZScore(observed, expected, n)
    return {
      digit: i + config.labelOffset,
      z,
      significantAt05: isZSignificant(z, 0.05),
      significantAt01: isZSignificant(z, 0.01),
    }
  })

  return {
    status: 'ok',
    testType,
    n,
    excludedCount,
    observedCounts,
    observedProportions,
    expectedProportions,
    chiSquare: {
      statistic: chiSquareStat,
      degreesOfFreedom,
      pValue,
    },
    mad: {
      value: madValue,
      conformity,
    },
    zScores,
  }
}
