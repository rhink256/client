<template>
    <v-card class="mx-auto" max-width="344" outlined>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="headline mb-1">Name: {{status.name}}</v-list-item-title>
                <v-list-item-subtitle>Status: {{status.state}}</v-list-item-subtitle>
                <v-list-item-subtitle>IP: {{status.address}}</v-list-item-subtitle>
                <v-list-item-subtitle>AP: {{status.ssid}}</v-list-item-subtitle>
                <v-list-item-subtitle>Signal Strength: {{status.signal}}</v-list-item-subtitle>
                <v-card-actions>
                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on }">
                            <v-button text small color="primary" v-on="on">Configure...</v-button>
                        </template>
                        <v-card>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">Configure: {{status.address}}</h3>
                                    <v-text-field 
                                        label="Name" 
                                        single-line 
                                        v-model="updatedName"></v-text-field>
                                    <v-text-field
                                        label="Calibration (°F)"
                                        single-line
                                        v-model="updatedCalibration"></v-text-field>
                                </div>
                            </v-card-title>
                            <v-card-actions>
                                <v-btn text color="primary" @click="commitConfig(status.id)">Save</v-btn>
                                <v-btn text @click="dialog = false">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card-actions>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['status'],
    
    data() {
        return {
        updatedName: "",
        updatedCalibration: "",
        dialog: false
        };
    },
    methods: {
        ...mapActions([
        'sendConfiguration'
    ]),
    commitConfig(id) {
        let config = {
            name: {
                id: id, 
                name: this.updatedName
            },
            calibration: {
                sensorId: id,
                offset: (this.updatedCalibration / 1.8)
            }
        }
        this.sendConfiguration(config)
        this.dialog=false;
    }
  },
}
</script>
