import * as http from 'http'
import { HTTP_METHODS, http_response } from './types'
import { createMovieValidation } from './validation/create-movie.validation'
import { createGenreValidation } from './validation/create-genre.validation'

export class ReqMethods {
  private server: http.Server

  constructor(server: http.Server) {
    this.server = server
  }

  public listen = (
    method: HTTP_METHODS,
    url: string,
    cb: (
      req: http.IncomingMessage,
      res: http_response,
      body?: any,
      params?: object | any
    ) => void
  ) => {
    this.server.on('request', (req, res) => {
      if (req.method == method && req.url?.includes(url)) {
        let body, params
        this.getBody(req, res, data => {
          body = data
          cb(req, res, body)
        })
        this.getParams(req, data => {
          params = data
          cb(req, res, undefined, params)
        })
        if (body || params) cb(req, res, body, params)
      }
    })
  }

  private getBody = (
    req: http.IncomingMessage,
    res: http_response,
    cb: (body: any) => void
  ) => {
    let body = ''
    req.on('data', data => {
      body += data
      if (body.length > 1e6) {
        this.server.closeAllConnections()
        console.log('disconnect')
        return null
      }
    })
    req.on('end', async () => {
      if (body != '' && req.url?.includes('movie')) {
        const createMovieDto = await createMovieValidation(body, res)
        if (createMovieDto.title) {
          cb(createMovieDto)
        }
      } else if (body != '' && req.url?.includes('genre')) {
        const createGenreDto = await createGenreValidation(body, res)
        if (createGenreDto.name) {
          cb(createGenreDto)
        }
      }
    })
  }

  private getParams = (
    req: http.IncomingMessage,
    cb: (params: object | any) => void
  ) => {
    const params_str = req.url?.split('/').slice(2)
    const params: { [key: string]: string } = {}
    if (params_str && params_str.length > 0) {
      params_str.map(str => {
        params[str.split('=')[0]] = str.split('=')[1]
      })
      cb(params)
    }
  }
}
