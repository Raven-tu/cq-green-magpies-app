/*
 * @Author: raventu
 * @Date: 2023-07-20 18:10:36
 * @LastEditors: raventu
 * @LastEditTime: 2023-08-02 16:42:50
 * @FilePath: /cq-green-magpies-app/server/plugins/CQconnect.ts
 * @Description: CQ websocket 连接 消息处理
 */
import process from 'node:process'
import type { Events } from '@tsuk1ko/cq-websocket'
import type { WebSocket } from 'ws'
import { testWs2cq } from '~/server/utils/ws/ws2cq'
import ChatService from '~/server/service/chat.service'
import { formatCQCtx } from '~/server/utils/helper/logsHelper'
import { groupMsg, privateAndAtMsg } from '~/server/utils/ws/cqMsg'

export default defineNitroPlugin(async () => {
  // TODO: 从 DB 中获取
  const { host, port, accessToken } = useRuntimeConfig().cqConfig
  const [msg, botInstance] = await testWs2cq(host, Number(port), accessToken)
  // TODO: 连接失败退出 nuxt 服务
  if (msg !== 'ok') {
    console.error('cq-websocket 连接失败')
    process.exit() // 失效 无法退出
  }
  // 向 global 中添加 cqBot
  globalThis.cqBot = botInstance

  const wss = globalThis.wss

  type cWebsocket = WebSocket & { name: string }
  // 设置相互转发
  const forwardTheMessage = (data: string) => {
    wss.clients.forEach((client) => {
      const _client = client as cWebsocket
      //   // binary表示数据是否是二进制。binary:false表示不是二进制
      _client.send(data, { binary: false })
    })
  }

  // 所有信息转发 用于日志
  botInstance?.on('meta_event', (ctx) => {
    forwardTheMessage(JSON.stringify(ctx))
  })

  // 保存聊天记录
  botInstance.on('message', (_e, ctx) => {
    const [logsInfo] = formatCQCtx(ctx)
    const { message_type, target_id, sender_id } = logsInfo
    // 保存 到 db
    message_type === 'group'
      ? ChatService.addChatLog(message_type, target_id, logsInfo)
      : ChatService.addChatLog(message_type, sender_id, logsInfo)
    // 转发 CQ 消息
    forwardTheMessage(JSON.stringify(ctx))
  })

  // 信息转发
  const actionArr: Events[] = ['message.private', 'message.group', 'message.group.@.me']

  actionArr.forEach(name => botInstance.off(name))
  // 管理员消息
  // botInstance.on('message.private', () => ())
  // 私聊
  botInstance.on('message.private', privateAndAtMsg)
  // 群组@
  botInstance.on('message.group.@.me', groupMsg)
  // 群组
  botInstance.on('message.group', groupMsg)
})
