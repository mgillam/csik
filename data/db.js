const Loki = require('lokijs')

const db = new Loki('data.json')

const aliases = db.addCollection('aliases')
const targets = db.addCollection('targets')

module.exports = db
module.aliases = aliases
module.targets = targets
