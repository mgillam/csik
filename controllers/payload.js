const { resolve } = require('path')
const graymatter = require('gray-matter')

const controller = {
  get: (req, res) => {
    try {
      res.sendFile(resolve('./payloads/' + req.params.payload + '.js'))
    } catch (err) {
      res.status(500).send({ msg: 'Failed' })
    }
  },
  list: (req, res) => {
    res.status(200)
  },
  details: (req, res) => {
    try {
      let reconFm = graymatter.read('./payload_src/' + req.params.payload + '.js', { delims: ['/*', '*/'] })
      return res.status(200).send(reconFm.data)
    } catch (err) {
      console.error(err)
      return res.status(500).send({ msg: 'Failed' })
    }
  },
  deploy: (req, res) => {
    res.status(200)
  }
}

module.exports = controller
