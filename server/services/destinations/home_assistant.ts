import axios from 'axios'
import {IHomeAssistantDestination, ISpindelData} from 'types'

export const sendToHomeAssistant = async (destination: IHomeAssistantDestination, data: ISpindelData) => {
  const url = destination.url + '/api/states/sensor.' + data.name
  await axios.post(
    url,
    {
      'state': data.temperature,
      'attributes': {
        'friendly_name': 'beer_temp',
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
