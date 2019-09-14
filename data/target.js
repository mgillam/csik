const { targets } = require('./db')

module.get = function get (id) {
  const target = targets.findOne({ 'id': id })
  return target ? { id: target.id, nickname: target.nickname } : null
}

module.set = function set (id, nickname) {
  targets.insert({ id: id, nickname: nickname })
}

module.remove = function remove (id) {
  targets.findAndRemove({ 'id': id })
}
