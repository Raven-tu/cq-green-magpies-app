/*
 * @Author: raventu
 * @Date: 2023-07-20 18:10:36
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-21 14:51:14
 * @FilePath: /cq-green-magpies-app/server/plugins/CQconnect.ts
 * @Description:
 */
import type { Events } from '@tsuk1ko/cq-websocket'
import { testWs2cq } from '~/server/utils/ws/ws2cq'
import ChatService from '~/server/service/chat.service'
import { formatCQCtx } from '~/server/utils/helper/logsHelper'

export default defineNitroPlugin(async (nitroApp) => {
  // TODO: 从 DB 中获取
  const { host, port, accessToken } = useRuntimeConfig().cqConfig
  const [msg, botInstance] = await testWs2cq(host, Number(port), accessToken)

  // TODO: 连接失败退出 nuxt 服务
  if (msg !== 'ok') {
    console.log(msg)
    process.exit() // 失效 无法退出
  }

  // 向 global 中添加 cqBot
  globalThis.cqBot = botInstance

  // 保存聊天记录
  botInstance.on('message', (e, ctx, tags) => {
    const [logsInfo] = formatCQCtx(ctx)
    const { message_type, target_id } = logsInfo
    ChatService.addChatLog(message_type, target_id, logsInfo)
  })

  // 信息转发
  const actionArr: Events[] = ['message.private', 'message.group', 'message.group.@.me']

  actionArr.forEach(name => botInstance.off(name))
  // 管理员消息
  // botInstance.on('message.private', () => ())
  // 私聊
  // botInstance.on('message.private', () => ())
  // 群组@
  // botInstance.on('message.group.@.me', () => ())
  // 群组
  // botInstance.on('message.group',  () => ())
})
