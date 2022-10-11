import {sendHttp} from './http'
import {testData} from '../../router/data'
import {sendToInfluxDB} from './influxdb'
import {IDestination, IHttpDestination, IInfluxDBDestination, ServiceType} from 'types'

export const testDestinations = async (destination: IDestination) => {
  switch (destination.type) {
    case ServiceType.HTTP:
      return await sendHttp(destination as IHttpDestination, testData)
    case ServiceType.InfluxDB:
      return await sendToInfluxDB(destination as IInfluxDBDestination, testData)
    default:
      throw new Error(`unknown type: ${destination.type}`)
  }
}
