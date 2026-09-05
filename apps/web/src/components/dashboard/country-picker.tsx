'use client'

import type { NormalizedCountry } from '@/lib/types'
import * as Checkbox from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useDashboardStore } from '@/store/dashboard-store'

export function CountryPicker({ countries }: { countries: NormalizedCountry[] }) {
  const [search, setSearch] = useState('')
  const selectedCountryIds = useDashboardStore(state => state.selectedCountryIds)
  const toggleCountry = useDashboardStore(state => state.toggleCountry)
  const setSelectedCountryIds = useDashboardStore(state => state.setSelectedCountryIds)

  const sorted = useMemo(
    () => [...countries].sort((a, b) => a.name.localeCompare(b.name)),
    [countries],
  )

  const filtered = useMemo(
    () => sorted.filter(country => country.name.toLowerCase().includes(search.toLowerCase())),
    [sorted, search],
  )

  const allSelected = countries.length > 0 && selectedCountryIds.size === countries.length
  const someSelected = selectedCountryIds.size > 0 && !allSelected

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search countries…"
        className="w-full rounded-md border border-border bg-card px-3 py-1.5 text-sm"
      />

      <label className="mt-2 flex items-center gap-2 border-b border-border pb-2 text-sm font-medium">
        <Checkbox.Root
          checked={someSelected ? 'indeterminate' : allSelected}
          onCheckedChange={(checked) => {
            setSelectedCountryIds(checked ? countries.map(c => c.id) : [])
          }}
          className="flex size-4 items-center justify-center rounded border border-border data-[state=checked]:bg-accent data-[state=indeterminate]:bg-accent"
        >
          <Checkbox.Indicator>
            {someSelected ? <Minus className="size-3 text-accent-foreground" /> : <Check className="size-3 text-accent-foreground" />}
          </Checkbox.Indicator>
        </Checkbox.Root>
        Select all (
        {selectedCountryIds.size}
        {' '}
        /
        {countries.length}
        )
      </label>

      <div className="mt-2 max-h-64 overflow-y-auto pr-1">
        {filtered.map(country => (
          <label key={country.id} className="flex items-center gap-2 py-1 text-sm">
            <Checkbox.Root
              checked={selectedCountryIds.has(country.id)}
              onCheckedChange={() => toggleCountry(country.id)}
              className="flex size-4 items-center justify-center rounded border border-border data-[state=checked]:bg-accent"
            >
              <Checkbox.Indicator>
                <Check className="size-3 text-accent-foreground" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            {country.name}
          </label>
        ))}
        {filtered.length === 0 && (
          <p className="py-2 text-sm text-muted-foreground">
            No countries match &ldquo;
            {search}
            &rdquo;.
          </p>
        )}
      </div>
    </div>
  )
}
