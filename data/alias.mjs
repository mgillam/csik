import { aliases } from './db.mjs'

export function get (key) {
  const alias = aliases.findOne({ 'key': key })
  return alias ? { key: alias.key, name: alias.name, type: alias.type } : null
}

export function set (key, type, name) {
  aliases.insert({ key: key, type: type, name: name })
}

export function remove (key) {
  aliases.findAndRemove({ 'key': key })
}

export const Types = {
  LOADER: 'Loader',
  PAYLOAD: 'Payload'
}
