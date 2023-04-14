import {sendHttp} from './http'
import {testData} from '../../router/data'
import {sendToInfluxDB} from './influxdb'
import {IDestination, IHomeAssistantDestination, IHttpDestination, IInfluxDBDestination, ServiceType} from 'types'
import {sendToHomeAssistant} from './home_assistant'

export const testDestinations = async (destination: IDestination) => {
  switch (destination.type) {
    case ServiceType.HTTP:
      return await sendHttp(destination as IHttpDestination, testData)
    case ServiceType.InfluxDB:
      return await sendToInfluxDB(destination as IInfluxDBDestination, testData)
    case ServiceType.HomeAssistant:
      return await sendToHomeAssistant(destination as IHomeAssistantDestination, testData)
    default:
      throw new Error(`unknown type: ${destination.type}`)
  }
}
