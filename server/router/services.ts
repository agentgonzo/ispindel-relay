import {NextFunction, Request, Response, Router} from 'express'
import {getDestinations, setDestinations} from '../services/destinations'
import {testDestinations} from '../services/destinations/test'
import {IDestination} from 'types'
import {logger} from '../util/logging'

export const servicesRouter = Router()

// define the home page route
servicesRouter.get('/', (req: Request, res: Response) => {
  res.send(getDestinations())
})

servicesRouter.post('/', (req: Request, res: Response) => {
  logger.info(`Updating services ${JSON.stringify(req.body, null, 2)}`)
  setDestinations(req.body)
  res.send(getDestinations())
})

servicesRouter.post('/test', async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.debug(`received test data ${JSON.stringify(req.body, null, 2)}`)
    await testDestinations(req.body as IDestination)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})
