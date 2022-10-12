import {Request, Response, Router} from 'express'
import {forwardToDestinations} from '../services/destinations/forwarder'
import {ISpindelData, ISpindelDataWithTimestamp} from 'types'

export const dataRouter = Router()

let lastData = {} as ISpindelDataWithTimestamp
let originalGravity: number

// define the home page route
dataRouter.get('/', (req: Request, res: Response) => {
  res.send(lastData)
})

dataRouter.post('/', (req: Request, res: Response) => {
  console.log(`headers: ${JSON.stringify(req.headers)}`)

  handleData(req.body as ISpindelData)

  res.sendStatus(204)
})

// Probably move this to a separate serivce as we grow
const handleData = (data: ISpindelData) => {
  console.log(`received iSpindel data: ${JSON.stringify(data, null, 2)}`)

  // If the data received just now is more than 24 hours after the last received data, then assume a new
  // fermentation has begun and reset the OG
  if (!lastData?.lastUpdate || Date.now() - lastData?.lastUpdate > 24 * 60 * 60 * 1000) {
    console.debug(`Data last reveiced on ${lastData?.lastUpdate} - setting OG to ${data.gravity}`)
    originalGravity = data.gravity
  }

  lastData = {
    ...data,
    lastUpdate: Date.now(),
    originalGravity,
  }
  forwardToDestinations(data)
}

export const testData: ISpindelData = {
  name: 'iSpindel01',
  gravity: 1.050,
  temperature: 25,
  temp_units: 'C',
  battery: 3.5,
  angle: 45,
  period: 1800,
}
