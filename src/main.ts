import * as http from 'http'
import { App } from './app'
import { DB } from './database/CRUD-methods'

const main = () => {
  const db = new DB()
  const server = http.createServer()
  const app = new App(server, db)
  app.run()
  return server
}

main().listen(3000, () => console.log('Server runs on http://localhost:3000'))
