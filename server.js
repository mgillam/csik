import express from 'express'
import { resolve } from 'path'
import ld from 'lodash'
import listDir from './lib/listDir.js'

const app = express()
const port = 3000
let getLoader = () => { console.log('Not ready') }

loadLoaders().then((loaderGetter) => {
  getLoader = loaderGetter
})

const payloadUrl = 'http://localhost:3000/testPayload'

app.get('/:loader', (req, res) => {
    return res.send(
      getLoader(req.params.loader).default.script({ PAYLOAD_URL: payloadUrl })
    )
})

app.listen(port, () => console.log(`CSIK listening on port ${port}!`))

async function loadLoaders() {
  let loaders = await listDir(resolve('./loaders/'))
  let loaderMap = {}
  while(loaders.length > 0) {
    let loader = loaders.shift()
    ld.set(loaderMap, ld.trimEnd(loader, '.js'), await import(`./loaders/${loader}`))
  }
  return (key) => {
    return loaderMap[key] || 'Not a loader'
  }
}