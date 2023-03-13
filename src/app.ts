import * as http from 'http'
import { ReqMethods } from './requests_methods'
import { DB } from './database/CRUD-methods'
import { Controller } from './controller'

export class App {
  private readonly server: http.Server
  private readonly reqMethods: ReqMethods
  private readonly controller: Controller
  constructor(server: http.Server, db: DB) {
    this.controller = new Controller(server, db)
    this.server = server
    this.reqMethods = new ReqMethods(this.server)
  }

  public run = async () => {
    this.controller.createMovie()
    this.controller.deleteMovie()
    this.controller.updateMovie()
    this.controller.getMovies()
    this.controller.createGenre()
    this.controller.deleteGenre()
    this.controller.updateGenre()
    this.controller.getGenres()
  }
}
