import { validate, ValidationError } from 'class-validator'
import { http_response } from '../types'
import { toJson } from '../helpers/dto-helper'
import { plainToInstance } from 'class-transformer'
import { CreateGenreDto } from '../dto/create-genre.dto'
import { ValidationErrorHandler } from './validation-error-handler'

export const createGenreValidation = async (
  object: string,
  res: http_response
) => {
  let createGenreDto: CreateGenreDto
  try {
    createGenreDto = plainToInstance(CreateGenreDto, JSON.parse(object))
  } catch (e) {
    res.writeHead(400, { 'Content-Text': 'application/json' })
    res.end(toJson({ error_code: 400, message: 'wrong json format' }))
    return
  }
  return validate(createGenreDto).then((error: ValidationError[]) => {
    if (!ValidationErrorHandler(error, res)) {
      return Promise.resolve(createGenreDto)
    }
  })
}
