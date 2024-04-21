// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue/max-attributes-per-line': 'error',
    },
  },
  ignores: ['src/vite-env.d.ts'],
})
