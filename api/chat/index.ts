/*
 * @Author: raventu
 * @Date: 2023-07-07 17:41:18
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 16:42:36
 * @FilePath: /cq-green-magpies-app/api/chat/index.ts
 * @Description: 聊天相关 api
 */

import { commenReq } from '~/api/aptTemplet'
import type { commmonFetchRes } from '~/api/aptTemplet'
import type { LogsChatInfo } from '~/type/CQ'

/** 登录参数 */
interface LoginParams {
  id?: number
  name: string
  password: string
}

export function getChatLogs(type: 'group' | 'private', id: number, page = 1, pageSize = 10) {
  return commenReq({
    path: '/api/chat/getChatLogs',
    method: 'GET',
    query: {
      id: `${id}`,
      type,
      page: `${page}`,
      pageSize: `${pageSize}`,
    },
  }) as commmonFetchRes<{
    rows: LogsChatInfo[]
    count: number
  }>
}
