/*eslint-disable fp/no-unused-expression*/
const express = require('express')
const { resolve } = require('path')
const _ = require('lodash')
const listDir = require('./lib/listDir')

const app = express()
const port = 3000
const getLoader = loadLoaders()

const payloadUrl = 'http://localhost:3000/testPayload'

app.get('/', (req, res) => {
    return res.send(
      getLoader('jqueryGet').script({ PAYLOAD_URL: payloadUrl })
    )
})

app.listen(port, () => console.log(`CSIK Server listening on port ${port}!`))

function loadLoaders() {
  const loaders = listDir(
    resolve('./loaders/')).reduce(
      (payloads, file) => {
        return _.set(payloads, _.trimEnd(file, '.js'), 
          require(`./loaders/${file}`)
        )
  }, {})
  return (key) => {
    return loaders[key]
  }
}