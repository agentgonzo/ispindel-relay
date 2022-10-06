import {IHttpDestination} from './destinations/http'

export interface IDestination {
  type: 'HTTP' | 'InfluxDB' | 'Ubidots'
  error?: string
}

interface IInfluxDBDestination extends IDestination {
  hostname: string
  port: string
  database: string
}

interface IUbidotsDestination extends IDestination {
  token: string
}

let _destinations = [
  {
    type: 'HTTP',
    host: 'example.com',
    port: '80',
    path: '/api',
    token: '',
  } as IHttpDestination,
  {
    type: 'InfluxDB',
    hostname: 'example.com',
    port: '8443',
    database: 'mydb',
    error: "this is my error message",
  } as IInfluxDBDestination
] as IDestination[]
// TODO. Load this from disk

export const getDestinations = (): IDestination[] => {
  return _destinations
}

export const setDestinations = (destinations: IDestination[]) => {
  _destinations = destinations
  // TODO Save these to disk
}
