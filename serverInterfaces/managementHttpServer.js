const managementApi = require('../api/managementApi')
const http = require('http')

module.exports = http.createServer(managementApi)
