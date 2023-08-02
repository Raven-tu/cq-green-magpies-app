/*
 * @Author: raventu
 * @Date: 2023-08-02 11:02:04
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 11:13:08
 * @FilePath: /cq-green-magpies-app/server/utils/ws/cqMsg.ts
 * @Description: cq 消息处理
 */

import type { CQEvent } from '@tsuk1ko/cq-websocket'

type CQCtx = Record<string, any>

/**
 * 私聊以及群组@的处理
 * @type {import('cq-websocket').MessageEventListener}
 */
export async function privateAndAtMsg(e: CQEvent, context: CQCtx) {
  switch (context.message_type) {
    case 'private':
      console.log(`收到私聊消息 qq=${context.user_id}`)
      break
    case 'group':
      console.log(`收到群组消息 group=${context.group_id} qq=${context.user_id}`)
      break
    case 'guild':
      console.log(`收到频道消息 guild=${context.guild_id} channel=${context.channel_id} tinyId=${context.user_id}`)
      break
  }
}

/**
 * 群组消息处理
 * @type {import('cq-websocket').MessageEventListener}
 */
export async function groupMsg(e: CQEvent, context: CQCtx) {
  switch (context.message_type) {
    case 'group':
      console.log(`收到群组消息 group=${context.group_id} qq=${context.user_id}`)
      break
    case 'guild':
      console.log(`收到频道消息 guild=${context.guild_id} channel=${context.channel_id} tinyId=${context.user_id}`)
      break
  }
}
