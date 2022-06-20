import Sensors from './components/Sensors.vue'
import StatusList from './components/StatusList.vue'

export const routes = [
  { path: '/', component: Sensors },
  { path: '/history', component: Sensors },
  { path: '/status', component: StatusList }
]
