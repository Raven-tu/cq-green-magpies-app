interface reqParams {
  path: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'
  query?: Record<string, string>
  body?: Record<string, any>
  header?: any
}

interface FetchOptions {
  headers?: Record<string, string>
  [key: string]: any
}

export type commmonFetchRes<T> = Promise<{
  data: T
  msg: string // 错误信息返回描述
  code: number // 接口请求状态
  error?: {
    errorMsg: string
  }
}>

export function useHttpFetch(url: string, opt: FetchOptions) {
  // token
  const accessToken = useCookie('accessToken')
  // 添加请求头和token
  const headers = {
    ...opt.headers,
    ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}),
  }
  opt.headers = headers
  const nuxtApp = useNuxtApp()
  return useFetch(url, {
    ...opt,
    // onRequest({ request, options }) {
    //   console.log('request', request)
    // },
    // onRequestError({ request, options, error }) {
    //   // Handle the request errors
    //   console.log('request', request)
    // },
    async onResponse({ request, response, options }) {
      // Process the response data
      // 自定义处理数据
      // if (response._data.code === 0){
      //    //处理
      //     response._data = response._data.data
      // }else{
      //
      // }
    },
    async onResponseError({ request, response, options }) {
      // Handle the response errors
      console.log('error', response.status)
      // https://github.com/nuxt/nuxt/issues/14771
      // 未登录401状态
      if (response.status === 401)
        navigateTo({ name: 'login', replace: true })

      else if (response.status === 500)
        console.log('服务器报错！！')
    },
  })
}

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
