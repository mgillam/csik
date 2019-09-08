const attackApi = require('../api/attackApi')
const http = require('http')

module.exports = http.createServer(attackApi)
