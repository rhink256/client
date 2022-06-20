<template>
  <div>
    <h1>Sensor Status</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex v-for="elem in getStatus()" :key="elem.id">
          <app-status :status="elem"></app-status>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Status from './Status.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    appStatus: Status
  },
  methods: {
    ...mapActions([
      'connectStatusSocket',
    ]),
    ...mapGetters([
      'getStatus'
    ])
  },
  mounted () {
    this.connectStatusSocket()
  }
}
</script>
