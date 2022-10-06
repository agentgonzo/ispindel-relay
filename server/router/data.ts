import {Request, Response, Router} from 'express'

export const dataRouter = Router()

// define the home page route
dataRouter.get('/', (req: Request, res: Response) => {
  res.send({
    gravity: 1.032,
    temperature: 20.5,
    battery: 4.07,
    tilt: 47,
    period: 1800,
    lastUpdate: Date.UTC(2022,9,4,9),
  })
})

dataRouter.post('/', (req: Request, res: Response) => {
  console.log(`received iSpindel data: ${JSON.stringify(req.body, null, 2)}`)
  console.log(`headers: ${req.headers}`)
  // TODO Call the statuses
  res.sendStatus(204)
})

export const testData = {
  gravity: 1.050,
  temperature: 25,
  battery: 3.5,
  tilt: 45,
  period: 1800,
}
