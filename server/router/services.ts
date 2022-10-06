import {Request, Response, Router} from 'express'
import {getDestinations, IDestination, setDestinations} from '../services/destinations'
import {testDestinations} from '../services/destinations/foo'

export const servicesRouter = Router()

// define the home page route
servicesRouter.get('/', (req: Request, res: Response) => {
  res.send(getDestinations())
})

servicesRouter.post('/', (req: Request, res: Response) => {
  console.log(`received data ${JSON.stringify(req.body, null, 2)}`)
  setDestinations(req.body)
  res.send(getDestinations())
})

servicesRouter.post('/test', async (req: Request, res: Response) => {
  console.log(`received test data ${JSON.stringify(req.body, null, 2)}`)
  await testDestinations(req.body as IDestination)
  res.sendStatus(200)
})
