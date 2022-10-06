import {IDestination} from '../destinations'
import {IHttpDestination, send} from './http'

export const testDestinations = async (destination: IDestination) => {
  // TODO
  // for (const destination of destinations) {
  //   if (destination.type == 'HTTP') { // TODO: Enum{
  //     await send(destination as IHttpDestination)
  //   } else {
  //     console.log(`unknown: ${destination.type}`)
  //   }
  //
  // }
  console.log('============')
  console.log(destination)
  if (destination.type == 'HTTP') { // TODO: Enum{
    return await send(destination as IHttpDestination)
  } else {
    console.log(`unknown: ${destination.type}`)
  }

}
