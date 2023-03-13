import http from 'http'
import { ReqMethods } from './requests_methods'
import { DB } from './database/CRUD-methods'
import { CONTENT_TYPE } from './constants'
import { toJson } from './helpers/dto-helper'

export class Controller {
  private readonly server: http.Server
  private readonly db: DB
  private readonly reqMethods: ReqMethods
  constructor(server: http.Server, db: DB) {
    this.server = server
    this.reqMethods = new ReqMethods(this.server)
    this.db = db
  }

  public create = () => {
    this.reqMethods.listen('POST', '/create', async (req, res, body) => {
      if (body) {
        const db_res = this.db.createMovie(body).catch(reason => {
          res.writeHead(400, CONTENT_TYPE.json_type)
          res.end(JSON.stringify(reason))
          return
        })
        db_res.then(data => {
          res.writeHead(200, CONTENT_TYPE.json_type)
          if (data) {
            res.end(toJson(data))
          }
          return
        })
      }
    })
  }

  public delete = () => {
    this.reqMethods.listen('DELETE', '/delete', (req, res, body, params) => {
      if (params) {
        const db_res = this.db.deleteMovie(params[0]).catch(reason => {
          res.writeHead(400, CONTENT_TYPE.json_type)
          res.end(JSON.stringify(reason))
          return
        })

        db_res.then(data => {
          res.writeHead(200, CONTENT_TYPE.json_type)
          if (data) {
            res.end(toJson(data))
          }
          return
        })
      }
    })
  }

  public update = () => {
    this.reqMethods.listen('POST', '/update', async (req, res, body) => {
      console.log(body)
      if (body) {
        console.log(body)
        const db_res = this.db.updateMovie(body).catch(reason => {
          res.writeHead(400, CONTENT_TYPE.json_type)
          res.end(JSON.stringify(reason))
          return
        })
        db_res.then(data => {
          res.writeHead(200, CONTENT_TYPE.json_type)
          if (data) {
            res.end(toJson(data))
          }
          return
        })
      }
    })
  }

  public find = () => {
    this.reqMethods.listen('GET', '/find', (req, res, body, params) => {
      if (params) {
        const db_res = this.db.findMovie(params[0]).catch(reason => {
          res.writeHead(400, CONTENT_TYPE.json_type)
          res.end(JSON.stringify(reason))
          return
        })

        db_res.then(data => {
          res.writeHead(200, CONTENT_TYPE.json_type)
          if (data) {
            res.end(toJson(data))
          }
          return
        })
      }
    })
  }
}
