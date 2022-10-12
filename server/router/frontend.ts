import {Router} from 'express'
import path from 'path'

/**
 * Serve static HTML/CSS/JS from the backend. This is for production deployments only where we want the same
 * FE/BE served from the same host/docker container.
 *
 * The files are stuffed into the correct paths during the docker build
 */
export const frontendRouter = Router()

frontendRouter.get('/static/js/:js', (req, res, _) => {
  res.sendFile(path.join(__dirname, '..', 'build/static/js', req.params.js));
})
frontendRouter.get('/static/css/:css', (req, res, _) => {
  res.sendFile(path.join(__dirname, '..', 'build/static/css', req.params.css));
})
frontendRouter.get('/*', (req, res, _) => {
  res.sendFile(path.join(__dirname, '..', 'build/index.html'));
})
