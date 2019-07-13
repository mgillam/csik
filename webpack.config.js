
const path = require('path')

const entries = (function generateEntries () {
  return {
    socketControl: './payload_src/socketControl.js'
  }
})()

module.exports = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'payloads')
  }
}
