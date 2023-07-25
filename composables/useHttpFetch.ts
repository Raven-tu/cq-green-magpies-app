/*
 * @Author: raventu
 * @Date: 2023-06-29 18:24:35
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 13:10:32
 * @FilePath: /cq-green-magpies-app/composables/useHttpFetch.ts
 * @Description: 请求封装
 */
import {
  createDiscreteApi,
} from 'naive-ui'
import type { UseFetchOptions } from 'nuxt/app'
import { defu } from 'defu'

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

export interface commmonFetchRes<T> {
  data: T
  msg: string // 错误信息返回描述
  code: number // 接口请求状态
  error?: {
    errorMsg: string
  }
}

const { message } = createDiscreteApi(
  ['message'],
)

function getBaseUrl() {
  let baseURL = ''
  if (process.env.NODE_ENV === 'production') {
    // 生产环境
    if (process.server) {
      // SSR请求内网
      baseURL = 'http://127.0.0.1:3000/'
    }
    else {
      baseURL = '/'
    }
  }
  else {
    // 本地开发环境
    baseURL = 'http://127.0.0.1:3000/'
  }
  return baseURL
}

/**
 * 通用 useFetch 请求模板
 * @param  {reqParams} {path, method, query, body, header}
 * @returns Promise {data, status}
 */

export function useCustomFetch<T>(url: string, options: UseFetchOptions<T> = {}) {
  const accessToken = useCookie('accessToken')
  const defaults: UseFetchOptions<T> = {
    baseURL: getBaseUrl(), // 基本url
    key: url,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    onRequest({ request, options }) {
      options.headers = {
        ...options.headers,
        ...(accessToken.value ? { Authorization: `Bearer ${accessToken.value}` } : {}),
      }
    },
    // 响应拦截器
    onRequestError({ request, options, error }) {
      // Handle the request errors
      console.log('request', request)
    },
    // 请求拦截器
    async onResponse({ response }) {
      const { code, msg } = typeof response._data === 'string' ? JSON.parse(response._data) : response._data
      if (code === 400) {
        message.error(msg)
        return response._data
      }
      else if (code === 200) {
        return response
      }
    },
    async onResponseError({ request, response, options }) {
      if (response.status === 401) {
        message.error('登录过期，请重新登录')
        await navigateTo('/start', { replace: true, redirectCode: 401 })
        return response._data
      }
      else
      // Handle the response errors 404
      if (response.status === 404) {
        message.error('请求的资源不存在')
        return response._data
      }
      // Handle the response errors 500
      else if (response.status === 500) {
        message.error('服务器错误')
        return response._data
      }
    },

  }
  const params = defu(options, defaults)
  return useFetch(url, params)
}
