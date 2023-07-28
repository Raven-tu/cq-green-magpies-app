/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-28 16:03:56
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

export interface registerParams {
  username: string
  password: string
  admin?: boolean
}

/**
 * 用户注册
 * @param user
 * @returns
 */
export function userRegister(user: registerParams) {
  const { username, password, admin } = user
  type TypeRes = commmonFetchRes<{
    username: string
    id: number
  }>
  return useCustomFetch<TypeRes>('/api/auth/register', {
    method: 'POST',
    body: {
      username,
      password,
      admin,
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
