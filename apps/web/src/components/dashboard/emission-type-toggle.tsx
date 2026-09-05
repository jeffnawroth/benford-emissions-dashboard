'use client'

import type { EmissionKind } from '@/lib/types'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { InfoTerm } from '@/components/dashboard/info-term'
import { useEmissionsDataset } from '@/hooks/use-emissions-dataset'
import { CO2_EQUIVALENTS_EXPLANATION, FOSSIL_EMISSIONS_EXPLANATION, GREENHOUSE_GAS_EXPLANATION } from '@/lib/education-copy'
import { useDashboardStore } from '@/store/dashboard-store'

export function EmissionTypeToggle() {
  const emissionKind = useDashboardStore(state => state.emissionKind)
  const setEmissionKind = useDashboardStore(state => state.setEmissionKind)
  const { data: dataset } = useEmissionsDataset(emissionKind)

  return (
    <div>
      {dataset && <h2 className="text-lg font-semibold">{dataset.name}</h2>}

      <ToggleGroup.Root
        type="single"
        value={emissionKind}
        onValueChange={(value) => {
          if (value)
            setEmissionKind(value as EmissionKind)
        }}
        className="mt-2 inline-flex overflow-hidden rounded-md border border-border"
      >
        <ToggleGroup.Item
          value="co2"
          className="px-3 py-1.5 text-sm data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          CO₂
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="ghg"
          className="px-3 py-1.5 text-sm data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
        >
          GHG
        </ToggleGroup.Item>
      </ToggleGroup.Root>

      <p className="mt-2 text-sm text-muted-foreground">
        {emissionKind === 'co2'
          ? (
              <>
                Carbon dioxide (CO₂) emissions from
                {' '}
                <InfoTerm title="Fossil emissions" text={FOSSIL_EMISSIONS_EXPLANATION}>
                  fossil fuels and industry
                </InfoTerm>
                . Land-use change is not included.
              </>
            )
          : (
              <>
                <InfoTerm title="Greenhouse gas emissions" text={GREENHOUSE_GAS_EXPLANATION}>
                  Greenhouse gas emissions
                </InfoTerm>
                {' '}
                include carbon dioxide, methane and nitrous oxide from all sources. Measured in
                {' '}
                <InfoTerm title="Carbon dioxide equivalents (CO₂eq)" text={CO2_EQUIVALENTS_EXPLANATION}>
                  carbon dioxide-equivalents
                </InfoTerm>
                {' '}
                over a 100-year timescale.
              </>
            )}
      </p>
    </div>
  )
}
