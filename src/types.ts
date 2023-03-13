import http from 'http'

export type HTTP_METHODS =
  | 'GET'
  | 'POST'
  | 'HEAD'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTION'
export type http_response = http.ServerResponse<http.IncomingMessage>
