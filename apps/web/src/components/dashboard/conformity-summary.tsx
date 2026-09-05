'use client'

import type { BenfordAnalysisResult, ConformityLevel } from '@benford/stats'
import { InfoTerm } from '@/components/dashboard/info-term'
import { TEST_TYPE_LABEL } from '@/lib/digit-labels'
import { CHI_SQUARE_EXPLANATION, MAD_EXPLANATION } from '@/lib/education-copy'
import { useDashboardStore } from '@/store/dashboard-store'

const CONFORMITY_STYLE: Record<ConformityLevel, string> = {
  close: 'bg-positive/20 text-positive',
  acceptable: 'bg-positive/20 text-positive',
  marginal: 'bg-accent/20 text-accent',
  nonconformity: 'bg-negative/20 text-negative',
}

const CONFORMITY_LABEL: Record<ConformityLevel, string> = {
  close: 'Close conformity',
  acceptable: 'Acceptable conformity',
  marginal: 'Marginal conformity',
  nonconformity: 'Nonconformity',
}

export function ConformitySummary({ analysis }: { analysis: BenfordAnalysisResult }) {
  const dataSource = useDashboardStore(state => state.dataSource)
  const testLabel = TEST_TYPE_LABEL[analysis.testType]

  if (analysis.status === 'insufficient-data') {
    const suggestion = dataSource === 'upload'
      ? 'Upload a file with more rows.'
      : 'Select more countries or a later year cutoff.'

    return (
      <div className="rounded-md border border-border bg-card p-4 text-sm">
        <p className="font-medium">
          Not enough data for a reliable
          {' '}
          {testLabel}
          {' '}
          test
        </p>
        <p className="mt-1 text-muted-foreground">
          {analysis.n}
          {' '}
          of
          {' '}
          {analysis.minimumRequired}
          {' '}
          required data points.
          {' '}
          {suggestion}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-border bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${CONFORMITY_STYLE[analysis.mad.conformity]}`}>
          {CONFORMITY_LABEL[analysis.mad.conformity]}
        </span>
        <span className="text-sm text-muted-foreground">
          <InfoTerm title="Mean Absolute Deviation" text={MAD_EXPLANATION}>
            MAD
          </InfoTerm>
          {' '}
          =
          {' '}
          {analysis.mad.value.toFixed(5)}
        </span>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        <InfoTerm title="Chi-square goodness-of-fit" text={CHI_SQUARE_EXPLANATION}>
          Chi-square
        </InfoTerm>
        {' '}
        =
        {' '}
        {analysis.chiSquare.statistic.toFixed(2)}
        {' '}
        (df=
        {analysis.chiSquare.degreesOfFreedom}
        , p=
        {analysis.chiSquare.pValue.toFixed(4)}
        )
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        Based on
        {' '}
        {analysis.n}
        {' '}
        values
        {analysis.excludedCount > 0 && ` (${analysis.excludedCount} excluded as invalid)`}
        .
      </p>
    </div>
  )
}
