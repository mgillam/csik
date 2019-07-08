import Loki from 'lokijs'

const db = new Loki('data.json')

const aliases = db.addCollection('aliases')

export default db
export { aliases }
