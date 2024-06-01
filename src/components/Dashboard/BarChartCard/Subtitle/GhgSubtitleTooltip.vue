<script setup lang="ts">
const first_text = 'A greenhouse gas (GHG) is a gas that causes the atmosphere to warm by absorbing and emitting radiant energy. Greenhouse gases absorb radiation that is radiated by Earth, preventing this heat from escaping to space. Carbon dioxide (CO₂) is the most well-known greenhouse gas, but there are others including methane, nitrous oxide, and in fact, water vapor. Human-made emissions of greenhouse gases from fossil fuels, industry, and agriculture are the leading cause of global climate change. Greenhouse gas emissions measure the total amount of all greenhouse gases that are emitted. These are often quantified in carbon dioxide equivalents (CO₂eq) which take account of the amount of warming that each molecule of different gases creates. '
const second_text = 'Carbon dioxide is the most important greenhouse gas, but not the only one. To capture all greenhouse gas emissions, researchers express them in “carbon dioxide equivalents” (CO₂eq). This takes all greenhouse gases into account, not just CO₂. To express all greenhouse gases in carbon dioxide equivalents (CO₂eq), each one is weighted by its global warming potential (GWP) value. GWP measures the amount of warming a gas creates compared to CO₂. CO₂ is given a GWP value of one. If a gas had a GWP of 10 then one kilogram of that gas would generate ten times the warming effect as one kilogram of CO₂. Carbon dioxide equivalents are calculated for each gas by multiplying the mass of emissions of a specific greenhouse gas by its GWP factor. This warming can be stated over different timescales. To calculate CO₂eq over 100 years, we’d multiply each gas by its GWP over a 100-year timescale (GWP100). Total greenhouse gas emissions – measured in CO₂eq – are then calculated by summing each gas’ CO₂eq value. '
</script>

<template>
  <SubtitleTooltip
    :text="first_text"
    title="Greenhouse gas emissions"
  >
    <template #activator>
      <slot name="first-activator" />
    </template>
  </SubtitleTooltip>

  <SubtitleTooltip
    :text="second_text"
    title="Carbon dioxide equivalents (CO₂eq)"
  >
    <template #activator>
      <slot name="second-activator" />
    </template>
  </SubtitleTooltip>
</template>
