import express from 'express'
import loaderController from '../controllers/loader.mjs'

const router = express.Router()

router.get('/loaders', loaderController.list)

router.get('/loaders/without/:filter', loaderController.listNotInFilter)

router.get('/loaders/madeof/:filter', loaderController.listInFilter)

export default router
