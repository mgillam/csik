const attackServer = require('./serverInterfaces/attackHttpServer')
const attackSocket = require('./serverInterfaces/attackSocket')
const managementServer = require('./serverInterfaces/managementHttpServer')
const managementSocket = require('./serverInterfaces/managementSocket')

const attackPort = 3000

attackSocket.on('connection', (socket) => {
  console.log('socket-id connected: ', socket.id)
  socket.join(['hostinfo', 'log', 'debug'])
  // socket.emit('run', 'alert("xss")')
})

attackServer.listen(attackPort, () => console.log(`CSIK Server listening on port ${attackPort}!`))

const managementPort = 3001

managementSocket.on('connection', (socket) => {
  console.log('Client connected')
})

managementServer.listen(managementPort, 'localhost', () => console.log(`Management interface listening on port ${managementPort}`))
