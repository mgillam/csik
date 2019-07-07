import express from 'express'
import loaderController from '../controllers/loader.mjs'
import payloadController from '../controllers/payload.mjs'

const router = express.Router()

router.get('/loader/:loader', loaderController.get)
router.get('/payload/:payload', payloadController.get)

export default router
