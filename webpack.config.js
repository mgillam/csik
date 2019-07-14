
const path = require('path')
const listDir = require('./lib/listDir')

const entries = (function generateEntries () {
  // let entries = {}
  let payloads = listDir(path.resolve('./payload_src/'))
  let entries = payloads.reduce((map, filename) => {
    map[removeExt(filename)] = `./payload_src/${filename}`
    return map
  }, {})
  return entries
})()

function removeExt (filename) {
  filename = filename.split('.')
  filename.pop()
  return filename.join('.')
}

module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'payloads')
  }
}
