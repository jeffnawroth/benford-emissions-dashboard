import type { BenfordAnalysisOk } from '@benford/stats'
import { describe, expect, it } from 'vitest'
import { analysisToCsv, analysisToJson } from '@/lib/export'

const analysis: BenfordAnalysisOk = {
  status: 'ok',
  testType: 'firstDigit',
  n: 300,
  excludedCount: 2,
  observedCounts: [90, 60, 40, 30, 20, 20, 15, 15, 10],
  observedProportions: [0.30, 0.20, 0.1333, 0.10, 0.0667, 0.0667, 0.05, 0.05, 0.0333],
  expectedProportions: [0.30103, 0.17609, 0.12494, 0.09691, 0.07918, 0.06695, 0.05799, 0.05115, 0.04576],
  chiSquare: { statistic: 3.21, degreesOfFreedom: 8, pValue: 0.921 },
  mad: { value: 0.0041, conformity: 'close' },
  zScores: [],
}

describe('analysisToCsv', () => {
  it('includes summary metadata and one row per digit', () => {
    const csv = analysisToCsv(analysis, { source: 'Test source' })
    const lines = csv.split('\n')
    expect(lines[1]).toBe('Test type,first digit')
    expect(lines).toContain('Source,Test source')
    expect(lines).toContain('Sample size (n),300')
    // header + 9 digit rows after the blank separator line
    const headerIndex = lines.indexOf('Digit,Expected %,Observed %,Deviation (pp)')
    expect(headerIndex).toBeGreaterThan(0)
    expect(lines.length - headerIndex - 1).toBe(9)
  })

  it('escapes commas in the source field', () => {
    const csv = analysisToCsv(analysis, { source: 'Name, with a comma' })
    expect(csv).toContain('"Name, with a comma"')
  })

  it('uses digit labels appropriate to the test type', () => {
    const secondDigitAnalysis: BenfordAnalysisOk = { ...analysis, testType: 'secondDigit', observedProportions: analysis.observedProportions.concat(0.02), expectedProportions: analysis.expectedProportions.concat(0.01) }
    const csv = analysisToCsv(secondDigitAnalysis, { source: 'x' })
    expect(csv).toContain('0,')
  })
})

describe('analysisToJson', () => {
  it('produces valid JSON with digit breakdown', () => {
    const json = JSON.parse(analysisToJson(analysis, { source: 'Test source' }))
    expect(json.n).toBe(300)
    expect(json.source).toBe('Test source')
    expect(json.digits).toHaveLength(9)
    expect(json.digits[0]).toEqual({ digit: '1', expectedProportion: 0.30103, observedProportion: 0.30 })
    expect(json.mad.conformity).toBe('close')
  })
})
