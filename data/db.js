const Loki = require('lokijs')

const db = new Loki('data.json')

const aliases = db.addCollection('aliases')

module.exports = db
module.aliases = aliases
