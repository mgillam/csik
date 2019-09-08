const express = require('express')
const cors = require('cors')
const attackRouter = require('../routers/attack')
const alias = require('../data/alias')
const loaderController = require('../controllers/loader')

const api = express()
api.use(cors())
api.use(express.json())
api.use('/atk', attackRouter)
api.get('/:alias', (req, res) => {
  let matchingAlias = alias.get(req.params.alias)
  if (matchingAlias) {
    if (matchingAlias.type === alias.Types.LOADER) {
      req.params.loader = matchingAlias.name
      return loaderController.get(req, res)
    } else {
      res.status(500).json({ msg: 'Not yet implemented for this type' })
    }
  } else {
    res.sendStatus(404)
  }
})

module.exports = api
