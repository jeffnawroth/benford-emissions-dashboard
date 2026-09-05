// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  nextjs: true,
  typescript: true,
  ignores: ['**/.next/**', '**/dist/**', '**/.wrangler/**', '**/worker-configuration.d.ts'],
}, {
  rules: {
    // Next.js App Router requires exporting `metadata` alongside the default
    // component in layout/page files — Next's own Fast Refresh (Turbopack)
    // handles this fine, unlike the Vite-oriented refresh model this rule assumes.
    'react-refresh/only-export-components': 'off',
    // process.env is how Next.js exposes build-time env vars in client code;
    // `require('process')` doesn't apply outside a CommonJS/Node runtime.
    'node/prefer-global/process': 'off',
  },
})
