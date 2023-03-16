import { ValidationError } from 'class-validator'
import { toJson } from '../helpers/dto-helper'
import { http_response } from '../types'

export const ValidationErrorHandler = (
  err: ValidationError[],
  res: http_response
) => {
  const error_messages: { [key: string]: string }[] = []
  err.map(err => {
    if (err.constraints) {
      error_messages.push(err.constraints)
    }
  })
  if (error_messages.length > 0) {
    res.writeHead(400, { 'Content-Text': 'application/json' })
    res.end(toJson({ error_code: 400, message: error_messages }))
    return true
  }
}
