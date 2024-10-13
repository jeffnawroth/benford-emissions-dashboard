<script setup lang="ts">
import { useCountryEmissionStore } from '@/stores/countryEmission'
import { storeToRefs } from 'pinia'

const { selectedEmissionType } = storeToRefs(useCountryEmissionStore())
</script>

<template>
  <template
    v-if="selectedEmissionType.shortHand === 'CO₂' "
  >
    Carbon dioxide (CO₂) emissions from

    <Co2SubtitleTooltip activator="fossil fuels and industry" />.
    Land-use change is not included.
  </template>

  <template v-else>
    <GhgSubtitleTooltip>
      <template #first-activator>
        Greenhouse gas emissions
      </template>
    </GhgSubtitleTooltip>

    include carbon dioxide, methane and nitrous oxide from all sources, including land-use change. They are measured
    in tonnes of

    <GhgSubtitleTooltip>
      <template #second-activator>
        carbon dioxide-equivalents
      </template>
    </GhgSubtitleTooltip>  over a 100-year timescale.
  </template>
</template>
