import {Request, Response, Router} from 'express'
import {forwardToDestinations} from '../services/destinations/forwarder'
import {ISpindelData} from 'types'

export const dataRouter = Router()

// define the home page route
dataRouter.get('/', (req: Request, res: Response) => {
  res.send({
    gravity: 1.032,
    temperature: 20.5,
    temp_units: 'C',
    battery: 4.07,
    angle: 47,
    period: 1800,
    lastUpdate: Date.UTC(2022,9,4,9),
  })
})

dataRouter.post('/', (req: Request, res: Response) => {
  console.log(`received iSpindel data: ${JSON.stringify(req.body, null, 2)}`)
  console.log(`headers: ${JSON.stringify(req.headers)}`)
  forwardToDestinations(req.body)

  res.sendStatus(204)
})

export const testData: ISpindelData = {
  name: 'iSpindel01',
  gravity: 1.050,
  temperature: 25,
  temp_units: 'C',
  battery: 3.5,
  angle: 45,
  period: 1800,
}
