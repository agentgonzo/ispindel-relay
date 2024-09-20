import axios from 'axios'
import {IHomeAssistantDestination, ISpindelData} from 'types'

const sendSensorToHomeAssistant = async (
    destination: IHomeAssistantDestination,
    name: String,
    state: Number,
    attributes: Object,
) => {
    return axios.post(
        `${destination.url}/api/states/sensor.ispindel_${name}`, // TODO make it configurable,
        {
            'state': state,
            'attributes': attributes
        },
        {
            headers: {
                'Authorization': 'Bearer ' + destination.token,
                'Content-Type': 'application/json',
            }
        }
    )
}

const calculateBatteryPercentage = (voltage: number) => {
    const high = 4.21
    const low = 3.0
    const range = high - low
    return (voltage - low) / range * 100
}

export const sendToHomeAssistant = async (destination: IHomeAssistantDestination, data: ISpindelData) => {
    await Promise.all([
            sendSensorToHomeAssistant(destination, 'temperature', data.temperature, {
                'friendly_name': 'iSpindel Temperature',
                'unit_of_measurement': '°C',
                'device_class': 'temperature',
            }),

            sendSensorToHomeAssistant(destination, 'gravity', data.gravity, {'friendly_name': 'iSpindel Gravity'}),
            sendSensorToHomeAssistant(destination, 'battery', calculateBatteryPercentage(data.battery), {
                'friendly_name': 'iSpindel Battery',
                'device_class': 'battery',
            }),
            sendSensorToHomeAssistant(destination, 'signal', data.RSSI, {
                'friendly_name': 'iSpindel Signal Strength',
                'device_class': 'signal_strength',
            }),
            sendSensorToHomeAssistant(destination, 'tilt', data.angle, {'friendly_name': 'iSpindel tilt angle'})
        ]
    )
}
