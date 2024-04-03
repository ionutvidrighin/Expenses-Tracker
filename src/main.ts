import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import persistPiniaStore from './utils/persistStore'
import 'primeicons/primeicons.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primeflex/primeflex.css'

const app = createApp(App)

const piniaStore = createPinia()

app.use(piniaStore)
app.use(persistPiniaStore)
app.use(PrimeVue)
app.use(router)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)
app.use(ToastService)

app.mount('#app')
