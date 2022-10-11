import {getDestinations} from '../destinations'
import {sendHttp} from './http'
import {sendToInfluxDB} from './influxdb'
import {IHttpDestination, IInfluxDBDestination, ISpindelData, ServiceType} from 'types'

export const forwardToDestinations = async (data: ISpindelData) => {
  const destinations = getDestinations()
  for (const destination of destinations) {
    try {
      switch (destination.type) {
        case ServiceType.HTTP:
          await sendHttp(destination as IHttpDestination, data)
          break
        case ServiceType.InfluxDB:
          await sendToInfluxDB(destination as IInfluxDBDestination, data)
          break;
        default:
          console.log(`Unknown destination type: ${destination.type} - skipping`)
      }
      // Assume a successful send
      delete destination.error
    } catch (error) {
      console.error(`Could not send to ${destination.type}: ${error} - skipping`)
      destination.error = (error as Error).message
    }
  }
}
