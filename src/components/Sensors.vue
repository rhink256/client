<template>
  <div>
    <h1>Live Data</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex v-for="elem in getSensors()" :key="elem.id">
          <app-sensor :sensor="elem"></app-sensor>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Sensor from './Sensor.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    appSensor: Sensor
  },
  methods: {
    ...mapActions([
      'connectTemperatureSocket'
    ]),
    ...mapGetters([
      'getSensors'
    ])
  },
  mounted() {
    this.connectTemperatureSocket();
  }
}
</script>
