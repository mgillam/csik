import * as fs from 'fs'

export default function (path) {
  return fs.readdirSync(path, { encoding: 'utf8' })  
}