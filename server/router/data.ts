import {Request, Response, Router} from 'express'
import {forwardToDestinations} from '../services/destinations/forwarder'
import {ISpindelData, ISpindelDataWithTimestamp} from 'types'
import {logger} from '../util/logging'

export const dataRouter = Router()

let lastData = {} as ISpindelDataWithTimestamp
let originalGravity: number

// define the home page route
dataRouter.get('/', (req: Request, res: Response) => {
  res.send(lastData)
})

dataRouter.post('/', (req: Request, res: Response) => {
  handleData(req.body as ISpindelData)

  res.sendStatus(204)
})

/**
 * Allow the FE to reset the OG
 */
dataRouter.put('/og', (req: Request, res: Response) => {
  const og = req.body.originalGravity
  logger.info(`resetting OG to ${og}`)
  originalGravity = og
  lastData.originalGravity = og
  res.sendStatus(204)
})

// Probably move this to a separate service as we grow
const handleData = (data: ISpindelData) => {
  logger.info('received data from iSpindel')
  logger.debug(`data: ${JSON.stringify(data, null, 2)}`)

  // If the data received just now is more than 24 hours after the last received data, then assume a new
  // fermentation has begun and reset the OG
  if (!lastData?.lastUpdate || Date.now() - lastData?.lastUpdate > 24 * 60 * 60 * 1000) {
    logger.info(`Data last received on ${lastData?.lastUpdate} - setting OG to ${data.gravity}`)
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
  ID: 123456,
  gravity: 1.050,
  temperature: 25,
  temp_units: 'C',
  battery: 3.5,
  angle: 45,
  interval: 1800,
  RSSI: -70,
}
