import { createApp } from 'vue'
import ExampleApp from './ExampleApp.vue'
import router from '../../src/router/route.ts'
import '../../src/assets/scss/app.scss'
import NotifyPlugin from '../../src/hooks/notifyPlugin.ts'

const app = createApp(ExampleApp)
app.use(router)
app.use(NotifyPlugin)
app.mount('#app')
