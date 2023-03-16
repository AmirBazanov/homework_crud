import { validate, ValidationError } from 'class-validator'
import { http_response } from '../types'
import { toJson } from '../helpers/dto-helper'
import { plainToInstance } from 'class-transformer'
import { CreateMovieDto } from '../dto/create-movie.dto'
import { ValidationErrorHandler } from './validation-error-handler'

export const createMovieValidation = async (
  object: string,
  res: http_response
) => {
  let createMovieDto: CreateMovieDto = new CreateMovieDto()
  try {
    createMovieDto = plainToInstance(CreateMovieDto, JSON.parse(object))
  } catch (e) {
    res.writeHead(400, { 'Content-Text': 'application/json' })
    res.end(toJson({ error_code: 400, message: 'wrong json format' }))
    return
  }

  return validate(createMovieDto).then((error: ValidationError[]) => {
    if (!ValidationErrorHandler(error, res)) {
      return Promise.resolve(createMovieDto)
    }
  })
}
