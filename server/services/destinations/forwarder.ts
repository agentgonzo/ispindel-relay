import {getDestinations} from '../destinations'
import {sendHttp} from './http'
import {sendToInfluxDB} from './influxdb'
import {IHomeAssistantDestination, IHttpDestination, IInfluxDBDestination, ISpindelData, ServiceType} from 'types'
import {logger} from '../../util/logging'
import {sendToHomeAssistant} from './home_assistant'

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
        case ServiceType.HomeAssistant:
          await sendToHomeAssistant(destination as IHomeAssistantDestination, data)
          break
        default:
          logger.error(`Unknown destination type: ${destination.type} - skipping`)
      }
      // Assume a successful send
      delete destination.error
    } catch (error) {
      logger.error(`Could not send to ${destination.type}: ${error} - skipping`)
      destination.error = (error as Error).message
    }
  }
}
