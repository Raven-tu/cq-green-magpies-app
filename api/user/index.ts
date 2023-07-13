/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-13 18:22:47
 * @FilePath: /cq-green-magpies-app/api/user/index.ts
 * @Description: cq-用户相关
 */

import { commenReq } from '~/api/aptTemplet'
import type { commmonFetchRes } from '~/api/aptTemplet'

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
  return commenReq({
    path: '/api/auth/login',
    method: 'POST',
    body: {
      id,
      name,
      password,
    },
  }) as commmonFetchRes<{
    token: string
    id: number
    name: string
  }>
}

export function checkUserInfo() {
  return commenReq({
    path: '/api/auth/check',
    method: 'GET',
  }) as commmonFetchRes<{
    token: string
    id: number
    name: string
  }>
}
