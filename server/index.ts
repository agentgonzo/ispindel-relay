import express, {Express, NextFunction, Request, Response} from 'express';
import {dataRouter} from './router/data'
import {servicesRouter} from './router/services'
import {frontendRouter} from './router/frontend'
import {logger} from './util/logging'

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/api/data', dataRouter)
app.use('/api/services', servicesRouter)
app.use('/', frontendRouter) // contains wildcards. Put after all other routers
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  return res.status(500).send({error: err.message})
})

app.listen(port, () => {
  logger.info(`Server is running at https://localhost:${port}`);
})
