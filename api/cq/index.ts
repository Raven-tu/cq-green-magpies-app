/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-12 14:39:04
 * @FilePath: /cq-green-magpies-app/api/cq/index.ts
 * @Description: api-用户相关
 */

import type { commmonFetchRes } from '~/api/aptTemplet'
import { commenReq } from '~/api/aptTemplet'

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
/**
 * @description: cq-获取好友列表
 * @returns  cq-获取好友列表
 */
export function getFriendList() {
  return cqApiReq({ action: 'get_friend_list' }) as commmonFetchRes<TypeFriendItem[]>
}
/**
 * @description: cq-获取群组列表-类型
 */
export interface TypeGroupItem {
  'group_create_time': number
  'group_id': number
  'group_level': number
  'group_name': string
  'max_member_count': number
  'member_count': number
}
/**
 * @description: cq-获取群组列表-类型
 * @returns  cq-获取群组列表
 */
export function getGroupList() {
  return cqApiReq({ action: 'get_group_list' }) as commmonFetchRes<TypeGroupItem[]>
}
