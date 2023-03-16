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

  public createMovie = () => {
    this.reqMethods.listen('POST', '/movie/create', async (req, res, body) => {
      if (body) {
        this.db
          .createMovie(body)
          .catch(reason => {
            res.writeHead(400, CONTENT_TYPE.json_type)
            res.end(JSON.stringify(reason))
            return
          })
          .then(data => {
            res.writeHead(201, CONTENT_TYPE.json_type)
            if (data) {
              res.end(toJson(data))
            }
            return
          })
      }
    })
  }

  public deleteMovie = () => {
    this.reqMethods.listen(
      'DELETE',
      '/movie/delete',
      (req, res, body, params) => {
        if (params) {
          this.db
            .deleteMovie(params.id)
            .catch(reason => {
              res.writeHead(400, CONTENT_TYPE.json_type)
              res.end(JSON.stringify(reason))
              return
            })
            .then(data => {
              res.writeHead(200, CONTENT_TYPE.json_type)
              if (data) {
                res.end(toJson(data))
              }
              return
            })
        }
      }
    )
  }

  public updateMovie = () => {
    this.reqMethods.listen('POST', '/movie/update', async (req, res, body) => {
      if (body) {
        this.db
          .updateMovie(body)
          .catch(reason => {
            res.writeHead(400, CONTENT_TYPE.json_type)
            res.end(JSON.stringify(reason))
            return
          })
          .then(data => {
            res.writeHead(200, CONTENT_TYPE.json_type)
            if (data) {
              res.end(toJson(data))
            }
            return
          })
      }
    })
  }

  public getMovies = () => {
    this.reqMethods.listen('GET', '/movie/find', (req, res, body, params) => {
      if (params) {
        this.db
          .getMovies(params?.id)
          .catch(reason => {
            res.writeHead(400, CONTENT_TYPE.json_type)
            res.end(JSON.stringify(reason))
            return
          })
          .then(data => {
            res.writeHead(200, CONTENT_TYPE.json_type)
            if (data) {
              res.end(toJson(data))
            }
            return
          })
      }
    })
  }

  public createGenre = () => {
    this.reqMethods.listen('POST', '/genre/create', async (req, res, body) => {
      if (body) {
        this.db
          .createGenre(body)
          .catch(reason => {
            res.writeHead(400, CONTENT_TYPE.json_type)
            res.end(JSON.stringify(reason))
            return
          })
          .then(data => {
            res.writeHead(201, CONTENT_TYPE.json_type)
            if (data) {
              res.end(toJson(data))
            }
          })
      }
    })
  }

  public deleteGenre = () => {
    this.reqMethods.listen(
      'DELETE',
      '/genre/delete',
      (req, res, body, params) => {
        if (params) {
          this.db
            .deleteGenre(params.id)
            .catch(reason => {
              res.writeHead(400, CONTENT_TYPE.json_type)
              res.end(JSON.stringify(reason))
            })
            .then(data => {
              res.writeHead(200, CONTENT_TYPE.json_type)
              if (data) {
                res.end(toJson(data))
              }
            })
        }
      }
    )
  }

  public updateGenre = () => {
    this.reqMethods.listen('POST', '/genre/update', async (req, res, body) => {
      if (body) {
        this.db
          .updateGenre(body)
          .catch(reason => {
            res.writeHead(400, CONTENT_TYPE.json_type)
            res.end(JSON.stringify(reason))
            return
          })
          .then(data => {
            res.writeHead(200, CONTENT_TYPE.json_type)
            if (data) {
              res.end(toJson(data))
            }
            return
          })
      }
    })
  }

  public getGenres = () => {
    this.reqMethods.listen('GET', '/genre/find', (req, res, body, params) => {
      if (params) {
        this.db
          .getGenres(params?.id)
          .catch(reason => {
            res.writeHead(400, CONTENT_TYPE.json_type)
            res.end(JSON.stringify(reason))
            return
          })
          .then(data => {
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
