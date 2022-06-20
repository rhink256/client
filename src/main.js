import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { store } from './components/SensorStore'
import { routes } from './routes'
import vuetify from './plugins/vuetify'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  store,
  router,
  vuetify,
  render: h => h(App)
})
