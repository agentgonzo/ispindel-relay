import express, { Express, Request, Response } from 'express';
import {dataRouter}  from './router/data'
import {servicesRouter}  from './router/services'

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/api', (req: Request, res: Response) => {
  res.send({message: 'hello steve'});
});

app.use('/api/data', dataRouter)
app.use('/api/services', servicesRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
