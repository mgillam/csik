const express = require('express')
const loaderController = require('../controllers/loader')
const payloadController = require('../controllers/payload')

const router = express.Router()

router.get('/loader/:loader', loaderController.get)
router.get('/payload/:payload', payloadController.get)

module.exports = router
