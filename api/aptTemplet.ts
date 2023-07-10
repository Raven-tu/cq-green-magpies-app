interface reqParams {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
  query?: Record<string, string>
  body?: Record<string, any>
  header?: any
}

export type commmonAxiosRes<T> = Promise<{
  data: T
  msg: string // 错误信息返回描述
  code: number // 接口请求状态
  error?: {
    errorMsg: string
  }
}>

/**
 * 通用 $fetch  请求模板
 * @param  {reqParams} {path, method, query, body, header}
 * @returns Promise {data, status}
 */
export function commenReq({ path, header, method, body, query }: reqParams) {
  return $fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...header,
    },
    query,
    body,
  })
}
