export class CONTENT_TYPE {
  static json_type = { 'Content-Text': 'application/json' }
}

export class PrismaErrors {
  static P1001 = 'Could connect to database'
  static P1002 = 'Database connection timeout'

  static P2002 = 'Data should be unique on field'
}
