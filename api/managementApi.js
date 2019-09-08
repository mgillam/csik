const express = require('express')
const cors = require('cors')
const attackRouter = require('../routers/attack')
const clientRouter = require('../routers/client')

const api = express()

api.use(cors())
api.use(express.json())
api.use('/atk', attackRouter)
api.use('/api', clientRouter)

module.exports = api
