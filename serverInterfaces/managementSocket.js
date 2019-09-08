const socketio = require('socket.io')
const managementServer = require('./managementHttpServer')

const socket = socketio(managementServer)

module.exports = socket
