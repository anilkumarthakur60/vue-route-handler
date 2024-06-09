import { createApp } from 'vue'
import App from './App.vue'
import router from './router/route'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/scss/app.scss'
const app = createApp(App)
app.use(router)
app.mount('#app')
