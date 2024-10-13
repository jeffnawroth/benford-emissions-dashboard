/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import { registerPlugins } from '@/plugins'
// Plugins
import { createApp } from 'vue'
import App from './App.vue'

// Components

// Composables

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
