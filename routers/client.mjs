import express from 'express'
import loaderController from '../controllers/loader.mjs'
import aliasController from '../controllers/alias.mjs'

const router = express.Router()

router.get('/loaders', loaderController.list)

router.get('/loaders/without/:filter', loaderController.listNotInFilter)

router.get('/loaders/madeof/:filter', loaderController.listInFilter)

router.get('/aliases/:key', aliasController.get)

router.post('/aliases/:key', aliasController.set)

router.delete('/aliases/:key', aliasController.remove)

export default router
