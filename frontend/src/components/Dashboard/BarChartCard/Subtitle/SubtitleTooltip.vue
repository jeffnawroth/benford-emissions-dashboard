<script setup lang="ts">
const { text } = withDefaults(defineProps<Props>(), {
  text: '',
  activator: '',
  title: '',
})
// Props
interface Props {
  text?: string
  activator?: string
  title?: string
}

const splittedText = text.split(/(?<=\.)\s+/)
</script>

<template>
  <v-menu
    open-on-hover
    max-height="350"
    max-width="350"
  >
    <template #activator="{ props }">
      <span
        class="text-decoration-underline"
        v-bind="props"
      >

        <slot name="activator">
          {{ activator }}
        </slot>

      </span>
    </template>

    <v-card
      color="surface-variant"
    >
      <v-card-title class="title">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot
          name="text"
        >
          <div
            v-for="(textPart, index) in splittedText"
            :key="textPart"
          >
            <p>
              {{ textPart }}
            </p>

            <br v-if="index !== splittedText.length - 1">
          </div>
        </slot>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<style scoped>
.title{
  white-space: normal;
}
</style>
