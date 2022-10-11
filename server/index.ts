import express, {Express, NextFunction, Request, Response} from 'express';
import {dataRouter}  from './router/data'
import {servicesRouter}  from './router/services'

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.use('/api/data', dataRouter)
app.use('/api/services', servicesRouter)
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  return res.status(500).send({error: err.message})
})

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
