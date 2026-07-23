import { Router } from 'express'
import {
  connectGithub,
  connectSlack,
  getIntegrationsStatus,
  disconnectIntegration,
} from './integrationsController.js'
import authMiddleware from '../../middlewares/authMiddlewares.js'

const router = Router()

// Saare routes protected — JWT required
router.use(authMiddleware)

router.post('/github/connect', connectGithub)
router.post('/slack/connect', connectSlack)
router.get('/status', getIntegrationsStatus)
router.delete('/:provider', disconnectIntegration)

export default router