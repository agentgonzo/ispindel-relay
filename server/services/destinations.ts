import {IDestination} from 'types'
import * as fs from 'fs'
import * as os from 'os'
import path from 'path'
import {logger} from '../util/logging'

const configFileName = path.join(os.homedir(), 'services.json')

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
  logger.error(`Could not load services definition from ${configFileName}`)
}

export const getDestinations = (): IDestination[] => {
  return _destinations
}

export const setDestinations = (destinations: IDestination[]) => {
  _destinations = destinations
  fs.writeFileSync(configFileName, JSON.stringify(destinations))
}
