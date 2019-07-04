import io from 'socket.io-client'

var socket = io('http://localhost:3000')
socket.on('connect', () => {
    console.log('Connected')
})

socket.on('run', (msg) => {
    eval(msg)
})