const { aliases } = require('./db')

module.get = function get (key) {
  const alias = aliases.findOne({ 'key': key })
  return alias ? { key: alias.key, name: alias.name, type: alias.type } : null
}

module.set = function set (key, type, name) {
  aliases.insert({ key: key, type: type, name: name })
}

module.remove = function remove (key) {
  aliases.findAndRemove({ 'key': key })
}

module.Types = {
  LOADER: 'Loader',
  PAYLOAD: 'Payload'
}
