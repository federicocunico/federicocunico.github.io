import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from "primevue/config";

import "./assets/tailwind.css";
import './main.css'



const app = createApp(App)

app.use(PrimeVue, { theme: 'none' })
app.use(createPinia())
app.use(router)

app.mount('#app')
