'use client'

import type { BenfordAnalysisOk } from '@benford/stats'
import { digitLabels } from '@/lib/digit-labels'

function formatPercent(value: number) {
  return `${(value * 100).toFixed(2)}%`
}

// A Z column is legible at k=9/10 (firstDigit/secondDigit) but not at k=90
// (firstTwoDigits) — a 90-row column is a wall, not a table. Above that
// density, surface only the digits flagged at the stricter p<0.01 threshold
// as a compact summary line instead.
const MAX_DIGITS_FOR_Z_COLUMN = 10

// At OWID's full dataset scale, large sample sizes routinely push 20-40+ of
// the 90 digit-pairs past the p<0.01 threshold — listing every one produces
// a paragraph-length wall of numbers, the exact density failure this
// fallback exists to avoid. Above this count, report a total instead.
const MAX_FLAGGED_DIGITS_TO_LIST = 12

export function DistributionTable({ analysis }: { analysis: BenfordAnalysisOk }) {
  const labels = digitLabels(analysis.testType, analysis.observedProportions.length)
  const showZColumn = analysis.zScores.length <= MAX_DIGITS_FOR_Z_COLUMN
  const flaggedDigits = analysis.zScores.filter(z => z.significantAt01).map(z => z.digit)

  return (
    <div>
      {!showZColumn && flaggedDigits.length > 0 && (
        <p className="mb-2 text-xs text-muted-foreground">
          {flaggedDigits.length <= MAX_FLAGGED_DIGITS_TO_LIST
            ? (
                <>
                  Flagged digits (p&lt;0.01):
                  {' '}
                  <span className="font-mono">{flaggedDigits.join(', ')}</span>
                </>
              )
            : (
                <>
                  <span className="font-mono tabular-nums">{flaggedDigits.length}</span>
                  {' '}
                  of
                  {' '}
                  <span className="font-mono tabular-nums">{analysis.zScores.length}</span>
                  {' '}
                  digit-pairs flagged (p&lt;0.01) — see row markers below.
                </>
              )}
        </p>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted-foreground">
            <th className="py-1.5 font-medium">Digit</th>
            <th className="py-1.5 font-medium">Expected</th>
            <th className="py-1.5 font-medium">Observed</th>
            <th className="py-1.5 font-medium">Deviation</th>
            {showZColumn && <th className="py-1.5 font-medium">Z</th>}
          </tr>
        </thead>
        <tbody>
          {labels.map((label, i) => {
            const expected = analysis.expectedProportions[i]!
            const observed = analysis.observedProportions[i]!
            const deviation = observed - expected
            const zScore = analysis.zScores[i]
            const significant = zScore?.significantAt05 ?? false
            return (
              <tr
                key={label}
                className={`border-b border-border/50 border-l-2 ${significant ? (zScore?.significantAt01 ? 'border-l-error' : 'border-l-warning') : 'border-l-transparent'}`}
              >
                <td className="py-1 font-mono tabular-nums">{label}</td>
                <td className="py-1 font-mono tabular-nums">{formatPercent(expected)}</td>
                <td className="py-1 font-mono tabular-nums">{formatPercent(observed)}</td>
                <td className={`py-1 font-mono tabular-nums ${deviation > 0 ? 'text-success' : deviation < 0 ? 'text-error' : ''}`}>
                  {deviation >= 0 ? '+' : ''}
                  {formatPercent(deviation)}
                </td>
                {showZColumn && zScore && (
                  <td className="py-1 font-mono tabular-nums">
                    {zScore.z.toFixed(2)}
                    {zScore.significantAt01 ? '**' : zScore.significantAt05 ? '*' : ''}
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
      {showZColumn && (
        <p className="mt-2 text-xs text-muted-foreground">
          * p&lt;0.05  ** p&lt;0.01
        </p>
      )}
    </div>
  )
}
