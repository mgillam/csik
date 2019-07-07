import { resolve } from 'path'

const controller = {
  get: (req, res) => {
    res.sendFile(resolve('./payloads/' + req.params.payload + '.js'))
  }
}

export default controller
