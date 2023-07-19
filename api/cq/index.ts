/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-19 10:36:26
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

export type ChatType = 'private' | 'group'
/** 发送者类型 */
export interface Sender {
  age: number
  area: string
  card: string
  level: string
  nickname: string
  role: string
  sex: string
  title: string
  user_id: number
}
/** 发送消息类型 */
export interface TypeMessageItem {
  post_type: string
  message_type: string
  time: number
  self_id: number
  sub_type: string
  message: string
  sender: Sender
  message_id: number
  font: number
  group_id: number
  message_seq: number
  raw_message: string
  user_id: number
  anonymous?: null
}

export function getMessages(message_id: number) {
  // {
  //   "action": "get_msg",
  //   "params": {
  //       "message_id": 592710910
  //   },
  //   "echo": "getMessages"
  // }
  const params = {
    message_id,
  }
  return cqApiReq({ action: 'get_msg', params }) as commmonFetchRes<TypeMessageItem>
}

/**
 * @description: cq-发送群组消息
 * @example
 * sendGroupMsg(1000000000, '123')
 */
export function sendGroupMsg(group_id: number, message = '') {
  // {
  //   "action": "send_group_msg",
  //   "params": {
  //       "group_id": 1000000000,
  //       "message": "123"
  //   },
  //   "echo": "sendGroupMsg"
  // }
  const params = {
    group_id,
    message,
  }
  // {
  //     "message_id": 592710910
  // }
  return cqApiReq({ action: 'send_group_msg', params }) as commmonFetchRes<{ message_id: number }>
}

/**
 * @description: cq-发送 私聊消息
 * @example
 * sendPrivateMsg(1000000000, '123')
 */
export function sendPrivateMsg(user_id: number, message = '') {
  // {
  //   "action": "send_private_msg",
  //   "params": {
  //       "user_id": 1000000000,
  //       "message": "123"
  //   },
  //   "echo": "sendPrivateMsg"
  // }
  const params = {
    user_id,
    message,
  }
  // {
  //     "message_id": 592710910
  // }
  return cqApiReq({ action: 'send_private_msg', params }) as commmonFetchRes<{ message_id: number }>
}
