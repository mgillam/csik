const express = require('express')
const loaderController = require('../controllers/loader')
const aliasController = require('../controllers/alias')
const targetController = require('../controllers/target')

const router = express.Router()

router.get('/loaders', loaderController.list)

router.get('/loaders/without/:filter', loaderController.listNotInFilter)

router.get('/loaders/madeof/:filter', loaderController.listInFilter)

router.get('/aliases/:key', aliasController.get)

router.post('/aliases/:key', aliasController.set)

router.delete('/aliases/:key', aliasController.remove)

router.get('/targets', targetController.list)

router.post('/targets/:target/deploy/:payload', targetController.deploy)

module.exports = router