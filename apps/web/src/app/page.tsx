'use client'

import Link from 'next/link'
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
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-10">
      <header>
        <h1 className="text-2xl font-semibold">Benford Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Apply
          {' '}
          <InfoTerm title="Benford's Law" text={BENFORDS_LAW_EXPLANATION}>
            Benford&apos;s Law
          </InfoTerm>
          {' '}
          digit-conformity analysis to public emissions data or your own dataset.
        </p>
      </header>

      <section className="rounded-md border border-border bg-card p-4">
        <div className="mb-3 inline-flex overflow-hidden rounded-md border border-border text-sm">
          <button
            type="button"
            onClick={() => setDataSource('owid')}
            className={`px-3 py-1.5 ${dataSource === 'owid' ? 'bg-accent text-accent-foreground' : ''}`}
          >
            Our World in Data
          </button>
          <button
            type="button"
            onClick={() => setDataSource('upload')}
            className={`px-3 py-1.5 ${dataSource === 'upload' ? 'bg-accent text-accent-foreground' : ''}`}
          >
            Upload your own CSV
          </button>
        </div>

        {dataSource === 'owid'
          ? (
              <div className="space-y-4">
                <EmissionTypeToggle />

                {emissionsQuery.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
                {emissionsQuery.isError && (
                  <p className="text-sm text-negative">
                    {emissionsQuery.error instanceof Error ? emissionsQuery.error.message : 'Failed to load emissions data.'}
                  </p>
                )}

                {dataset && (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <CountryPicker countries={dataset.countries} />
                      <YearSlider years={dataset.years} />
                    </div>
                    <Link href="/emissions" className="inline-block text-sm underline">
                      View raw data →
                    </Link>
                  </>
                )}
              </div>
            )
          : (
              <DatasetUpload />
            )}
      </section>

      <section>
        <TestTypeToggle />
      </section>

      <section className="space-y-4">
        {analysis.status === 'ok' && (
          <div className="rounded-md border border-border bg-card p-4">
            <div className="mb-3 flex justify-end">
              <ExportButtons analysis={analysis} source={exportSource} />
            </div>
            <DistributionView analysis={analysis} />
          </div>
        )}
        <ConformitySummary analysis={analysis} />
      </section>

      {dataSource === 'owid' && dataset && <CitationFooter dataset={dataset} />}
    </main>
  )
}
