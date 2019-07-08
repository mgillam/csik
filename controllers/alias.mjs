import * as alias from '../data/alias.mjs'

const controller = {
  set: (req, res) => {
    // TODO Check that type is valid
    alias.set(req.params.key, req.body.type, req.body.name)
    res.sendStatus(200)
  },

  remove: (req, res) => {
    alias.remove(req.params.key)
    res.sendStatus(200)
  },

  get: (req, res) => {
    let matchedAlias = alias.get(req.params.key) || { key: null }
    res.status(200).json(matchedAlias)
  }
}

export default controller
