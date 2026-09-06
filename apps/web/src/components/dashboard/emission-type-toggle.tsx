'use client'

import type { EmissionKind } from '@/lib/types'
import { InfoTerm } from '@/components/dashboard/info-term'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { useEmissionsDataset } from '@/hooks/use-emissions-dataset'
import { CO2_EQUIVALENTS_EXPLANATION, FOSSIL_EMISSIONS_EXPLANATION, GREENHOUSE_GAS_EXPLANATION } from '@/lib/education-copy'
import { useDashboardStore } from '@/store/dashboard-store'

export function EmissionTypeToggle() {
  const emissionKind = useDashboardStore(state => state.emissionKind)
  const setEmissionKind = useDashboardStore(state => state.setEmissionKind)
  const { data: dataset } = useEmissionsDataset(emissionKind)

  return (
    <div>
      {dataset && <h2 className="text-base font-semibold">{dataset.name}</h2>}

      <SegmentedControl<EmissionKind>
        value={emissionKind}
        onValueChange={setEmissionKind}
        aria-label="Emission type"
        className="mt-2"
        options={[
          { value: 'co2', label: 'CO₂' },
          { value: 'ghg', label: 'GHG' },
        ]}
      />

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
