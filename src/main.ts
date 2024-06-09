import { createApp } from 'vue'
import App from './App.vue'
import router from './router/route'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/scss/app.scss'
import NotifyPlugin from './hooks/notifyPlugin'
const app = createApp(App)
app.use(router)
app.use(NotifyPlugin)

app.mount('#app')
