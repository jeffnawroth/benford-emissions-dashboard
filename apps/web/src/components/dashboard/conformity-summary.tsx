'use client'

import type { BenfordAnalysisResult, ConformityLevel } from '@benford/stats'
import type { BadgeProps } from '@/components/ui/badge'
import { AlertOctagon, AlertTriangle, Check, CheckCircle2, Info } from 'lucide-react'
import { InfoTerm } from '@/components/dashboard/info-term'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { TEST_TYPE_LABEL } from '@/lib/digit-labels'
import { CHI_SQUARE_EXPLANATION, MAD_EXPLANATION } from '@/lib/education-copy'
import { useDashboardStore } from '@/store/dashboard-store'

const CONFORMITY_ORDER: ConformityLevel[] = ['close', 'acceptable', 'marginal', 'nonconformity']

const CONFORMITY_BADGE_VARIANT: Record<ConformityLevel, NonNullable<BadgeProps['variant']>> = {
  close: 'success',
  acceptable: 'success-muted',
  marginal: 'warning',
  nonconformity: 'error',
}

const CONFORMITY_ICON: Record<ConformityLevel, typeof Check> = {
  close: CheckCircle2,
  acceptable: Check,
  marginal: AlertTriangle,
  nonconformity: AlertOctagon,
}

const CONFORMITY_LABEL: Record<ConformityLevel, string> = {
  close: 'Close conformity',
  acceptable: 'Acceptable conformity',
  marginal: 'Marginal conformity',
  nonconformity: 'Nonconformity',
}

const GAUGE_SEGMENT_COLOR: Record<ConformityLevel, string> = {
  close: 'bg-success',
  acceptable: 'bg-success',
  marginal: 'bg-warning',
  nonconformity: 'bg-error',
}

function ConformityGauge({ level }: { level: ConformityLevel }) {
  const activeIndex = CONFORMITY_ORDER.indexOf(level)
  return (
    <div className="mt-3 flex gap-1" role="presentation">
      {CONFORMITY_ORDER.map((segment, i) => (
        <div
          key={segment}
          className={`h-1.5 flex-1 rounded-full ${i <= activeIndex ? GAUGE_SEGMENT_COLOR[level] : 'bg-border'}`}
        />
      ))}
    </div>
  )
}

export function ConformitySummary({ analysis }: { analysis: BenfordAnalysisResult }) {
  const dataSource = useDashboardStore(state => state.dataSource)
  const testLabel = TEST_TYPE_LABEL[analysis.testType]

  if (analysis.status === 'insufficient-data') {
    const suggestion = dataSource === 'upload'
      ? 'Upload a file with more rows.'
      : 'Select more countries or a later year cutoff.'

    return (
      <Card role="status" aria-live="polite" className="flex gap-3 text-sm">
        <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
        <div>
          <p className="font-medium">
            Not enough data for a reliable
            {' '}
            {testLabel}
            {' '}
            test
          </p>
          <p className="mt-1 text-muted-foreground">
            <span className="font-mono tabular-nums">{analysis.n}</span>
            {' '}
            of
            {' '}
            <span className="font-mono tabular-nums">{analysis.minimumRequired}</span>
            {' '}
            required data points.
            {' '}
            {suggestion}
          </p>
        </div>
      </Card>
    )
  }

  const level = analysis.mad.conformity
  const Icon = CONFORMITY_ICON[level]

  return (
    <Card role="status" aria-live="polite">
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant={CONFORMITY_BADGE_VARIANT[level]}>
          <Icon className="size-3.5" aria-hidden="true" />
          {CONFORMITY_LABEL[level]}
        </Badge>
      </div>

      <p className="mt-3">
        <InfoTerm title="Mean Absolute Deviation" text={MAD_EXPLANATION}>
          <span className="text-sm text-muted-foreground">MAD</span>
        </InfoTerm>
        {' = '}
        <span className="font-mono text-2xl font-semibold tabular-nums md:text-3xl">
          {analysis.mad.value.toFixed(5)}
        </span>
      </p>
      <ConformityGauge level={level} />

      <hr className="my-3 border-divider" />

      <p className="text-xs text-muted-foreground">
        <InfoTerm title="Chi-square goodness-of-fit" text={CHI_SQUARE_EXPLANATION}>
          Chi-square
        </InfoTerm>
        {' '}
        =
        {' '}
        <span className="font-mono tabular-nums">{analysis.chiSquare.statistic.toFixed(2)}</span>
        {' '}
        (df=
        <span className="font-mono tabular-nums">{analysis.chiSquare.degreesOfFreedom}</span>
        , p=
        <span className="font-mono tabular-nums">{analysis.chiSquare.pValue.toFixed(4)}</span>
        )
      </p>

      <p className="mt-2 text-xs text-muted-foreground">
        Based on
        {' '}
        <span className="font-mono tabular-nums">{analysis.n}</span>
        {' '}
        values
        {analysis.excludedCount > 0 && (
          <>
            {' ('}
            <span className="font-mono tabular-nums">{analysis.excludedCount}</span>
            {' excluded as invalid)'}
          </>
        )}
        .
      </p>
    </Card>
  )
}
