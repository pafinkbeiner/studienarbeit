import lowdb, { AdapterSync } from "lowdb"
import FileSync from "lowdb/adapters/FileSync"

const db = lowdb(new FileSync('db.json'));

db.defaults({machines: []})
  .write()

export default db;