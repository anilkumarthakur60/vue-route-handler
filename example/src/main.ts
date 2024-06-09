import { createApp } from 'vue'
import ExampleApp from './ExampleApp.vue'
import router from '../../src/router/route.ts'
import '../../src/assets/scss/app.scss'
const app = createApp(ExampleApp)
app.use(router)
app.mount('#app')
