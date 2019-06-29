/*eslint-disable fp/no-unused-expression*/
const express = require('express')
const { resolve } = require('path')
const _ = require('lodash')
const loadScript = require('./lib/loadScript')
const renderable = require('./lib/renderable')
const listDir = require('./lib/listDir')

const app = express()
const port = 3000
const getPayload = loadPayloads()

app.get('/', (req, res) => {
    return res.send(
      getPayload('soxfil')({ HOST: req.hostname })
    )
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function loadPayloads() {
  const payloads = listDir(
    resolve('./scripts/')).reduce(
      (payloads, file) => {
        return _.set(payloads, _.trimEnd(file, '.js'), 
        renderable(
          loadScript(
            resolve(`./scripts/${file}`)
          )
      )
    )
  }, {})
  return (key) => {
    return payloads[key]
  }
}