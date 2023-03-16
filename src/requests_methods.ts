import * as http from 'http'
import { HTTP_METHODS, http_response } from './types'
import { createMovieValidation } from './validation/create-movie.validation'
import { createGenreValidation } from './validation/create-genre.validation'
import { CreateGenreDto } from './dto/create-genre.dto'
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
      body?: any,
      params?: object | any
    ) => void
  ) => {
    this.server.on('request', async (req, res) => {
      if (req.method == method && req.url?.includes(url)) {
        if (req.method == 'POST') {
          await this.getBody(req, res, body => {
            cb(req, res, body, undefined)
          })
        }
        if (req.method == 'GET') {
          const params = this.getParams(req)
          cb(req, res, undefined, params)
        }
      }
    })
  }

  public checkRoutes = () => {
    this.server.on('request', (req, res) => {
      res.writeHead(404)
      if (!req.url?.match('(movie|genre)/(find|create|udpate|delete)')) {
        res.end()
      }
      if (req.url?.includes('find') && req.method != 'GET') res.end()
      if (req.url?.includes('create') && req.method != 'POST') res.end()
      if (req.url?.includes('update') && req.method != 'POST') res.end()
      if (req.url?.includes('delete') && req.method != 'DELETE') res.end()
      return
    })
  }

  private getBody = async (
    req: http.IncomingMessage,
    res: http_response,
    cb: (body: CreateMovieDto | CreateGenreDto) => void
  ) => {
    let body = ''
    req.on('data', data => {
      body += data
    })
    req.on('end', async () => {
      if (body != '' && req.url?.includes('movie')) {
        const createMovieDto = await createMovieValidation(body, res)
        if (createMovieDto?.title) {
          cb(createMovieDto)
        }
      }
      if (body != '' && req.url?.includes('genre')) {
        const createGenreDto = await createGenreValidation(body, res)
        if (createGenreDto?.name) {
          cb(createGenreDto)
        }
      }
    })
  }

  private getParams = (req: http.IncomingMessage) => {
    const params_str = req.url?.split('/').slice(2)
    const params: { [key: string]: string } = {}
    if (params_str && params_str.length > 0) {
      params_str.map(str => {
        params[str.split('=')[0]] = str.split('=')[1]
      })
      return params
    }
  }
}
