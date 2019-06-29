/*eslint-disable fp/no-unused-expression*/
const express = require('express')
const { resolve } = require('path')
const _ = require('lodash')
const loadScript = require('./lib/loadScript')
const renderable = require('./lib/renderable')
const listDir = require('./lib/listDir')

const app = express()
const port = 3000
const getLoader = loadLoaders()

app.get('/', (req, res) => {
    return res.send(
      getLoader('soxfil')({ HOST: req.hostname })
    )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function loadLoaders() {
  const loaders = listDir(
    resolve('./loaders/')).reduce(
      (payloads, file) => {
        return _.set(payloads, _.trimEnd(file, '.js'), 
        renderable(
          loadScript(
            resolve(`./loaders/${file}`)
          )
      )
    )
  }, {})
  return (key) => {
    return loaders[key]
  }
}