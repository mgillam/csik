import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import cors from 'cors'
import attackRouter from './routers/attack.mjs'
import clientRouter from './routers/client.mjs'

const attackApi = express()
const managementApi = express()
const attackServer = http.createServer(attackApi)
const managementServer = http.createServer(managementApi)

const attackSocket = socketio(attackServer)
const attackPort = 3000

const managementSocket = socketio(managementServer)
const managementPort = 3001

attackApi.use(cors())
attackApi.use('/atk', attackRouter)
attackApi.get('/:alias', (req, res) => {
  res.send('Getting alias: ' + req.params.alias)
})
attackSocket.on('connection', (socket) => {
  console.log('Target connection received')
  socket.emit('run', 'alert("xss")')
})

attackServer.listen(attackPort, () => console.log(`CSIK Server listening on port ${attackPort}!`))

managementApi.use(cors())
managementApi.use('/atk', attackRouter)
managementApi.use('/api', clientRouter)
managementSocket.on('connection', (socket) => {
  console.log('Client connected')
})

managementServer.listen(managementPort, 'localhost', () => console.log(`Management interface listening on port ${managementPort}`))
