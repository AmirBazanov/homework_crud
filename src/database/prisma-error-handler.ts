import { PrismaErrors } from '../constants'

export const createErrors = (err: any) => {
  switch (err.code) {
    case 'P1001':
      throw { error_code: err.code, message: PrismaErrors.P1001 }
    case 'P2002':
      throw {
        error_code: err.code,
        message: PrismaErrors.P2002 + err.meta.target,
      }
    default:
      throw err
  }
}
