/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-24 16:03:17
 * @FilePath: /cq-green-magpies-app/api/user/index.ts
 * @Description: cq-用户相关
 */

import type { commmonFetchRes } from '~/composables/useHttpFetch'
import { useCustomFetch } from '~/composables/useHttpFetch'

/** 登录参数 */
interface LoginParams {
  id?: number
  name: string
  password: string
}

/**
 * @description: cq-获取好友列表
 * @returns  cq-获取好友列表
 */
export function userLogin(user: LoginParams) {
  const { id, name, password } = user
  type TypeRes = commmonFetchRes<{
    token: string
    id: number
    name: string
  }>
  return useCustomFetch<TypeRes>('/api/auth/login', {
    method: 'POST',
    body: {
      id,
      name,
      password,
    },
  })
}

export function checkUserInfo() {
  return useCustomFetch<commmonFetchRes<{
    token: string
    id: number
    name: string
  }>>('/api/auth/check', {
    method: 'GET',
  })
}

export function checkConnect() {
  return useCustomFetch<commmonFetchRes<''>>('/api/auth/connect', {
    method: 'GET',
  })
}
