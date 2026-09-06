'use client'

import Link from 'next/link'
import { BenfordMark } from '@/components/benford-mark'
import { CitationFooter } from '@/components/dashboard/citation-footer'
import { ConformitySummary } from '@/components/dashboard/conformity-summary'
import { CountryPicker } from '@/components/dashboard/country-picker'
import { DatasetUpload } from '@/components/dashboard/dataset-upload'
import { DistributionView } from '@/components/dashboard/distribution-view'
import { EmissionTypeToggle } from '@/components/dashboard/emission-type-toggle'
import { ExportButtons } from '@/components/dashboard/export-buttons'
import { InfoTerm } from '@/components/dashboard/info-term'
import { TestTypeToggle } from '@/components/dashboard/test-type-toggle'
import { YearSlider } from '@/components/dashboard/year-slider'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBenfordAnalysis } from '@/hooks/use-benford-analysis'
import { BENFORDS_LAW_EXPLANATION } from '@/lib/education-copy'
import { useDashboardStore } from '@/store/dashboard-store'

export default function HomePage() {
  const dataSource = useDashboardStore(state => state.dataSource)
  const setDataSource = useDashboardStore(state => state.setDataSource)
  const emissionKind = useDashboardStore(state => state.emissionKind)
  const uploadedDataset = useDashboardStore(state => state.uploadedDataset)
  const { emissionsQuery, dataset, analysis } = useBenfordAnalysis()

  const exportSource = dataSource === 'upload' && uploadedDataset
    ? `Uploaded: ${uploadedDataset.fileName} (column: ${uploadedDataset.columnName})`
    : dataset
      ? `${dataset.name} (${emissionKind.toUpperCase()}), Our World in Data`
      : 'Unknown source'

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8 md:px-6 md:py-10 lg:px-8">
      <header className="flex items-start gap-3">
        <BenfordMark className="mt-1.5 h-5 w-auto text-accent" />
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">Benford Dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Apply
            {' '}
            <InfoTerm title="Benford's Law" text={BENFORDS_LAW_EXPLANATION}>
              Benford&apos;s Law
            </InfoTerm>
            {' '}
            digit-conformity analysis to public emissions data or your own dataset.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <div role="group" aria-label="Data source" className="inline-flex overflow-hidden rounded-sm border border-border text-sm">
          {/* Deliberately plain <button> elements, not <SegmentedControl>/ToggleGroup:
              Radix ToggleGroup renders role="radio" on its items, and
              app/page.test.tsx asserts getByRole('button', ...) for these two controls. */}
          <button
            type="button"
            onClick={() => setDataSource('owid')}
            className={`px-3 py-1.5 font-medium transition-colors ${dataSource === 'owid' ? 'bg-accent text-accent-foreground' : 'hover:bg-surface-elevated'}`}
          >
            Our World in Data
          </button>
          <button
            type="button"
            onClick={() => setDataSource('upload')}
            className={`px-3 py-1.5 font-medium transition-colors ${dataSource === 'upload' ? 'bg-accent text-accent-foreground' : 'hover:bg-surface-elevated'}`}
          >
            Upload your own CSV
          </button>
        </div>

        <Badge variant="info">
          {dataSource === 'owid' ? 'Live: Our World in Data' : 'Custom upload'}
        </Badge>
      </div>

      <div className="space-y-6 lg:grid lg:grid-cols-[320px_1fr] lg:items-start lg:gap-6 lg:space-y-0">
        <aside className="space-y-6">
          <Card>
            {dataSource === 'owid'
              ? (
                  <div className="space-y-4">
                    <EmissionTypeToggle />

                    {emissionsQuery.isLoading && (
                      <p role="status" aria-live="polite" className="text-sm text-muted-foreground">Loading…</p>
                    )}
                    {emissionsQuery.isError && (
                      <p role="status" aria-live="assertive" className="text-sm text-error">
                        {emissionsQuery.error instanceof Error ? emissionsQuery.error.message : 'Failed to load emissions data.'}
                      </p>
                    )}

                    {dataset && (
                      <>
                        <CountryPicker countries={dataset.countries} />
                        <YearSlider years={dataset.years} />
                      </>
                    )}
                  </div>
                )
              : (
                  <DatasetUpload />
                )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Digit test</CardTitle>
            </CardHeader>
            <CardContent>
              <TestTypeToggle />
            </CardContent>
          </Card>

          {dataSource === 'owid' && dataset && (
            <Link href="/emissions" className="inline-block text-sm text-accent underline underline-offset-2">
              View raw data →
            </Link>
          )}
        </aside>

        <section className="space-y-6">
          {analysis.status === 'ok' && (
            <Card>
              <div className="mb-3 flex justify-end">
                <ExportButtons analysis={analysis} source={exportSource} />
              </div>
              <DistributionView analysis={analysis} />
            </Card>
          )}
          <ConformitySummary analysis={analysis} />
        </section>
      </div>

      {dataSource === 'owid' && dataset && <CitationFooter dataset={dataset} />}
    </main>
  )
}
