import { validate, ValidationError } from 'class-validator'
import { http_response } from '../types'
import { toJson } from '../helpers/dto-helper'
import { plainToClass } from 'class-transformer'
import { CreateGenreDto } from '../dto/create-genre.dto'

export const createGenreValidation = async (
  object: string,
  res: http_response
) => {
  let createGenreDto: CreateGenreDto = new CreateGenreDto()
  try {
    createGenreDto = plainToClass(CreateGenreDto, JSON.parse(object))
  } catch (e) {
    res.writeHead(400, { 'Content-Text': 'application/json' })
    res.end(toJson({ error_code: 400, message: 'wrong json format' }))
    return createGenreDto
  }
  const error_messages: { [key: string]: string }[] = []
  validate(createGenreDto)
    .then((err: ValidationError[]) => {
      err.map(err => {
        if (err.constraints) {
          error_messages.push(err.constraints)
        }
      })
    })
    .then(() => {
      if (error_messages.length > 0) {
        res.writeHead(400, { 'Content-Text': 'application/json' })
        res.end(toJson({ error_code: 400, message: error_messages }))
        return
      }
    })
  return createGenreDto
}
