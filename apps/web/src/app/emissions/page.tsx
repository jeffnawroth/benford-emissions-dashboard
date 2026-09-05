'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { EmissionTypeToggle } from '@/components/dashboard/emission-type-toggle'
import { useEmissionsDataset } from '@/hooks/use-emissions-dataset'
import { useDashboardStore } from '@/store/dashboard-store'

const PAGE_SIZE = 100

export default function EmissionsPage() {
  const emissionKind = useDashboardStore(state => state.emissionKind)
  const { data: dataset, isLoading, isError } = useEmissionsDataset(emissionKind)
  const [search, setSearch] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  // Reset paging whenever the filter or the underlying dataset changes —
  // adjusted during render (React's recommended alternative to a
  // useEffect(() => setState(...), [deps]) for this exact case) rather than
  // as a post-render effect, since it's just deriving state from a prop change.
  const resetKey = `${emissionKind}:${search}`
  const [prevResetKey, setPrevResetKey] = useState(resetKey)
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey)
    setVisibleCount(PAGE_SIZE)
  }

  const countryNameById = useMemo(() => {
    const map = new Map<number, string>()
    dataset?.countries.forEach(country => map.set(country.id, country.name))
    return map
  }, [dataset])

  // A full OWID indicator can hold 30,000+ country/year rows — rendering all
  // of them into the DOM at once is a real scroll/paint performance problem,
  // not just a large number. Page it client-side instead.
  const matchingRows = useMemo(() => {
    if (!dataset)
      return []
    return dataset.records
      .map(record => ({ ...record, countryName: countryNameById.get(record.countryId) ?? 'Unknown' }))
      .filter(record => record.countryName.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.countryName.localeCompare(b.countryName) || a.year - b.year)
  }, [dataset, countryNameById, search])

  const rows = matchingRows.slice(0, visibleCount)

  return (
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-10">
      <Link href="/" className="text-sm underline">
        ← Back to dashboard
      </Link>

      <h1 className="text-2xl font-semibold">Raw data</h1>
      <EmissionTypeToggle />

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {isError && <p className="text-sm text-negative">Failed to load emissions data.</p>}

      {dataset && (
        <>
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search countries…"
            className="w-full rounded-md border border-border bg-card px-3 py-1.5 text-sm"
          />

          <div className="max-h-[60vh] overflow-y-auto rounded-md border border-border">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border text-left">
                  <th className="px-3 py-2 font-medium">Country</th>
                  <th className="px-3 py-2 font-medium">Year</th>
                  <th className="px-3 py-2 font-medium">
                    Value (
                    {dataset.unit}
                    )
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(record => (
                  <tr key={`${record.countryId}-${record.year}`} className="border-b border-border/50">
                    <td className="px-3 py-1.5">{record.countryName}</td>
                    <td className="px-3 py-1.5">{record.year}</td>
                    <td className="px-3 py-1.5">{record.value.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>
              Showing
              {' '}
              {rows.length}
              {' '}
              of
              {' '}
              {matchingRows.length}
              {' '}
              matching records (
              {dataset.records.length}
              {' '}
              total)
            </p>
            {visibleCount < matchingRows.length && (
              <button
                type="button"
                onClick={() => setVisibleCount(count => count + PAGE_SIZE)}
                className="rounded-md border border-border px-2 py-1 underline"
              >
                Load more
              </button>
            )}
          </div>
        </>
      )}
    </main>
  )
}
