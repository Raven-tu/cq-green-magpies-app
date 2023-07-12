/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 16:26:53
 * @FilePath: /cq-green-magpies-app/api/user/index.ts
 * @Description: cq-用户相关
 */

import { commenReq } from '~/api/aptTemplet'
import type { commmonFetchRes } from '~/api/aptTemplet'

interface cqReqParams {
  action: string
  params?: Record<string, any>
}

export function cqApiReq({ action, params = {} }: cqReqParams) {
  return commenReq({
    path: `/api/cq/${action}`,
    method: 'POST',
    body: {
      action,
      params,
    },
  })
}
/**
 * @description: cq-获取好友列表-类型
 */
export interface TypeFriendItem {
  'nickname': string
  'remark': string
  'user_id': number
}
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
