const socketio = require('socket.io')
const attackServer = require('./attackHttpServer')

const socket = socketio(attackServer)

module.exports = socket
