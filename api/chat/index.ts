/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-24 16:15:01
 * @FilePath: /cq-green-magpies-app/api/chat/index.ts
 * @Description: 聊天相关 api
 */

import { useCustomFetch } from '~/composables/useHttpFetch'
import type { commmonFetchRes } from '~/composables/useHttpFetch'
import type { LogsChatInfo } from '~/type/CQ'

/** 登录参数 */
interface LoginParams {
  id?: number
  name: string
  password: string
}

export function getChatLogs(type: 'group' | 'private', id: number, page = 1, pageSize = 10) {
  return useCustomFetch<commmonFetchRes<{
    rows: LogsChatInfo[]
    count: number
  }>>('/api/chat/getChatLogs', {
    method: 'GET',
    query: {
      id: `${id}`,
      type,
      page: `${page}`,
      pageSize: `${pageSize}`,
    },
  })
}

export function addChatLogs(id: number, type: 'group' | 'private', chatInfo: LogsChatInfo) {
  return useCustomFetch<commmonFetchRes<void>>(
    '/api/chat/addChatLogs', {
      method: 'POST',
      body: {
        id,
        type,
        chatInfo,
      },
    })
}
