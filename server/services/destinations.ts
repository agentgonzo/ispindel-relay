import {IDestination, IHttpDestination, IInfluxDBDestination} from 'types'

let _destinations = [
  {
    type: 'HTTP',
    url: 'http://httpbin.org/anything',
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
