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

  // res.send({})
})
