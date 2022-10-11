import {IDestination} from 'types'
import * as fs from 'fs'

const configFileName = 'services.json'

// let _destinations = [
//   {
//     type: 'HTTP',
//     url: 'http://httpbin.org/anything',
//     token: '',
//   } as IHttpDestination,
//   {
//     type: 'InfluxDB',
//     hostname: 'example.com',
//     port: '8443',
//     database: 'mydb',
//     error: "this is my error message",
//   } as IInfluxDBDestination
// ] as IDestination[]

let _destinations = [] as IDestination[]
try {
  _destinations = JSON.parse(fs.readFileSync(configFileName) as any)
} catch {
  console.warn(`Could not load services definiton from ${configFileName}`)
}

export const getDestinations = (): IDestination[] => {
  return _destinations
}

export const setDestinations = (destinations: IDestination[]) => {
  _destinations = destinations
  fs.writeFileSync(configFileName, JSON.stringify(destinations))
}
