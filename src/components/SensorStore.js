import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const instance = axios.create({
  baseURL: process.env.VUE_APP_SERVER_PROTOCOL + process.env.VUE_APP_SERVER_URL
})

export const store = new Vuex.Store({
  state: {
    sensors: [],
    sensorStatuses: [],
    tempSocket: undefined,
    statusSocket: undefined
  },
  getters: {
    getStatus: (state) => state.sensorStatuses,
    getSensors: (state) => state.sensors
  },
  mutations: {
    setSensors(state, data) {
      let index = state.sensors.findIndex((elem)=>elem.sensorId==data.sensorId);

      if (index >= 0) {
        Vue.set(state.sensors, index, data);
      } else {
        state.sensors.push(data);
      }
    },
    setStatus(state, data) {
      let index = state.sensorStatuses.findIndex((elem)=>elem.id==data.id);
      if (index >= 0) {
        Vue.set(state.sensorStatuses, index, data);
      } else {
        state.sensorStatuses.push(data);
      }
    }
  },
  actions: {
    sendConfiguration({commit}, config) {
      console.log(config.name);
      console.log(config.calibration)
      instance.put(
        '/temp/name',
        config.name,
        {
          headers: {
            'Content-type': 'application/json'
          }
        });

      instance.put(
        'temp/calibration',
        config.calibration,
        {
          headers: {
            'Content-type': 'application/json'
          }
        }
      );
    },
    connectTemperatureSocket({commit}) {
      if (this.tempSocket == undefined) {
        console.log("ENV:"+JSON.stringify(process.env));
        console.log("CONNECTING SOCKET URL:" + process.env.VUE_APP_SERVER_URL)
        this.tempSocket = new WebSocket("ws://" + process.env.VUE_APP_SERVER_URL + "/temp/broadcast");
        this.tempSocket.onmessage = (event) => commit('setSensors', JSON.parse(event.data));
      }
    },
    connectStatusSocket({commit}) {
      if (this.statusSocket == undefined) {
        this.statusSocket = new WebSocket("ws://" + process.env.VUE_APP_SERVER_URL + "/status/broadcast");
        this.statusSocket.onmessage = (event) => commit('setStatus', JSON.parse(event.data));
      }
    },
  }
})
