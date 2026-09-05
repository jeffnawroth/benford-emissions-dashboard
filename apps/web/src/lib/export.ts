import type { BenfordAnalysisOk } from '@benford/stats'
import { digitLabels, TEST_TYPE_LABEL } from '@/lib/digit-labels'

export interface ExportMetadata {
  /** Human-readable description of what was analyzed, e.g. dataset name or uploaded filename. */
  source: string
}

const CONFORMITY_LABEL: Record<BenfordAnalysisOk['mad']['conformity'], string> = {
  close: 'Close conformity',
  acceptable: 'Acceptable conformity',
  marginal: 'Marginal conformity',
  nonconformity: 'Nonconformity',
}

function csvEscape(value: string): string {
  return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value
}

function csvRow(cells: (string | number)[]): string {
  return cells.map(cell => csvEscape(String(cell))).join(',')
}

export function analysisToCsv(analysis: BenfordAnalysisOk, meta: ExportMetadata): string {
  const labels = digitLabels(analysis.testType, analysis.observedProportions.length)

  const lines = [
    csvRow(['Benford\'s Law analysis export']),
    csvRow(['Test type', TEST_TYPE_LABEL[analysis.testType]]),
    csvRow(['Source', meta.source]),
    csvRow(['Sample size (n)', analysis.n]),
    csvRow(['Excluded values', analysis.excludedCount]),
    csvRow(['MAD', analysis.mad.value]),
    csvRow(['MAD conformity', CONFORMITY_LABEL[analysis.mad.conformity]]),
    csvRow(['Chi-square', analysis.chiSquare.statistic]),
    csvRow(['Degrees of freedom', analysis.chiSquare.degreesOfFreedom]),
    csvRow(['p-value', analysis.chiSquare.pValue]),
    '',
    csvRow(['Digit', 'Expected %', 'Observed %', 'Deviation (pp)']),
  ]

  analysis.observedProportions.forEach((observed, i) => {
    const expected = analysis.expectedProportions[i] ?? 0
    lines.push(csvRow([
      labels[i] ?? String(i),
      (expected * 100).toFixed(4),
      (observed * 100).toFixed(4),
      ((observed - expected) * 100).toFixed(4),
    ]))
  })

  return lines.join('\n')
}

export function analysisToJson(analysis: BenfordAnalysisOk, meta: ExportMetadata): string {
  const labels = digitLabels(analysis.testType, analysis.observedProportions.length)

  return JSON.stringify({
    testType: analysis.testType,
    source: meta.source,
    n: analysis.n,
    excludedCount: analysis.excludedCount,
    mad: analysis.mad,
    chiSquare: analysis.chiSquare,
    digits: labels.map((label, i) => ({
      digit: label,
      expectedProportion: analysis.expectedProportions[i] ?? 0,
      observedProportion: analysis.observedProportions[i] ?? 0,
    })),
  }, null, 2)
}

export function triggerDownload(filename: string, content: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
