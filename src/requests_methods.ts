import * as http from 'http'
import { HTTP_METHODS, http_response } from './types'
import { createMovieValidation } from './validation/create-movie.validation'
import { CreateMovieDto } from './dto/create-movie.dto'

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
      body?: CreateMovieDto,
      params?: string[]
    ) => void
  ) => {
    this.server.on('request', (req, res) => {
      if (req.method == method && '/' + req.url?.split('/')[1] === url) {
        let body, params
        this.getBody(req, res, data => {
          body = data
          cb(req, res, body)
        })
        this.getParams(req, data => {
          params = data
          cb(req, res, undefined, params)
        })
        // if (body || params) cb(req, res, body, params)
      }
    })
  }

  private getBody = (
    req: http.IncomingMessage,
    res: http_response,
    cb: (body: CreateMovieDto) => void
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
      if (body != '') {
        const createMovieDto = await createMovieValidation(body, res)
        if (createMovieDto.title) {
          cb(createMovieDto)
        }
      }
    })
  }

  private getParams = (
    req: http.IncomingMessage,
    cb: (params: string[]) => void
  ) => {
    const params = req.url?.split('/').slice(2)
    if (params && params.length > 0) cb(params)
  }
}
