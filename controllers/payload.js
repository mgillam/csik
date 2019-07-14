const { resolve } = require('path')

const controller = {
  get: (req, res) => {
    try {
      res.sendFile(resolve('./payloads/' + req.params.payload + '.js'))
    } catch (err) {
      res.status(500).sendJson({ msg: 'Failed' })
    }
  },
  list: (req, res) => {
    res.status(200)
  },
  deploy: (req, res) => {
    res.status(200)
  }
}

module.exports = controller
