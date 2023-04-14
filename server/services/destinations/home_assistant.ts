import axios from 'axios'
import {IHomeAssistantDestination, ISpindelData} from 'types'

export const sendToHomeAssistant = async (destination: IHomeAssistantDestination, data: ISpindelData) => {
  const url = destination.url + '/api/states/sensor.' + 'ispindel_temperature' // TODO make it configurable
  await axios.post(
    url,
    {
      'state': data.temperature,
      'attributes': {
        'friendly_name': 'iSpindel Temperature',
        'unit_of_measurement': '°C',
      }
    },
    {
      headers: {
        'Authorization': 'Bearer ' + destination.token,
        'Content-Type': 'application/json',
      }
    }
  )
}
