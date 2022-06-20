<template>
    <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{sensor.name}}</v-list-item-title>
                <v-list-item-subtitle class="headline mb-1">{{tempF()}} °F</v-list-item-subtitle>
                <v-list-item-subtitle>{{Math.round(sensor.humidity*10)/10.0}}% Humidity</v-list-item-subtitle>
                <v-list-item-subtitle>{{Math.round(sensor.pressure)}} Pressure</v-list-item-subtitle>
                <v-list-item-subtitle>{{Math.round(toF(dewpoint()))}} °F Dewpoint</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <div v-if="dataIsStale()">
        <v-row align = "center" justify = "end">
            <span class="subheading">Sensor is offline. Report {{Math.round(dataAge())}} minutes old.</span>
            <v-icon>mdi-clock</v-icon>
        </v-row>
        </div>
    </v-card>
</template>

<script>
export default {
  props: ['sensor'],
  methods: {
    dewpoint() {
        let T = this.tempC();
        let RH = this.sensor.humidity;
        return (237.3 * [Math.log(RH/100) + ( (17.27*T) / (237.3+T) )]) / (17.27 - [Math.log(RH/100) + ( (17.27*T) / (237.3+T) )]);
    },
    toF(degC) {
        return degC * 1.8 + 32;
    },
    tempF() {
        return Math.round(this.toF(this.tempC()));
    },
    tempC() {
        let offset = undefined;

        //validity check for sensor offset
        if (this.sensor.offset > -900) {
            offset = this.sensor.offset;
        } else {
            offset = 0;
        }
        return this.sensor.celsius + offset;
    },
    dataAge() {
        // age of data in minutes
        return ((Date.now() - this.sensor.reportTime) / (1000 * 60));
    },
    dataIsStale() {
        return this.dataAge() > (this.sensor.expectedUpdateRateSeconds + 30);
    }
  }
}
</script>
