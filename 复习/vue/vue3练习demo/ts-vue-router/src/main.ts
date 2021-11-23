import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { homeLogin } from './service/auth/homeLogin'
window.onload = function () {
  setupApp()
}

function setupApp(){
  createApp(App).use(store).use(router).mount('#app')
  // router.push({name:"About"})
  homeLogin()
}
