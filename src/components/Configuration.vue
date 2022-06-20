<template>
    <div>
        <v-expansion-panels>
            <v-expansion-panel
                v-for="(item,i) in sensorData"
                :key="i"
            >
            <v-expansion-panel-header>{{item.name}}</v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-text-field label="Name" single-line v-model="sensorData"></v-text-field>
            </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
    methods: {
        ...mapGetters([
            'getSensors'
        ]),
        ...mapActions([
            'refreshStatus',
            'refreshData'
        ])
    },
    data() {
        let vm = this;
        console.log(this.$store.state.sensors);
        return {
            sensorData: JSON.parse(JSON.stringify(vm.$store.getSensors))
        }
    },
    computed: {
        sensorData() {
            return this.$store.state.sensors;
        }
    },
    watch: {
        sensorData: function() {
           this.$store.commit('setName');
        }
    },
    // mounted() {
    //     this.$store.dispatch('refreshData');
    // }
}
</script>