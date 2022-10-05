import {Request, Response, Router} from 'express'
import {getDestinations, setDestinations} from '../services/destinations'

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
