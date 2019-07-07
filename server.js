import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import cors from 'cors'
import attackRouter from './routers/attack.mjs'
import clientRouter from './routers/client.mjs'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = 3000

app.use(cors())

app.use('/api', clientRouter)
app.use('/atk', attackRouter)

app.get('/:alias', (req, res) => {
  res.send('Getting alias: ' + req.params.alias)
})

io.on('connection', (socket) => {
  console.log('Connection received')
  socket.emit('run', 'alert("xss")')
})

server.listen(port, () => console.log(`CSIK Server listening on port ${port}!`))
