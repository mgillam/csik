const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const attackRouter = require('./routers/attack')
const clientRouter = require('./routers/client')
const alias = require('./data/alias')
const loaderController = require('./controllers/loader')

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
  console.log('socket-id', socket.id)
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
