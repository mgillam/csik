const attackSocket = require('../serverInterfaces/attackSocket')

const controller = {
  list: (req, res) => {
    res.json(Object.keys(attackSocket.of('/').connected))
  },
  deploy: (req, res) => {
    // TODO: Drop payload on target
  }
}

module.exports = controller
