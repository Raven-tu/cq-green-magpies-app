/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-14 15:54:08
 * @FilePath: /cq-green-magpies-app/server/api/auth/connect.get.ts
 * @Description: 连接到 nuxt ws
 */
import WebSocket from 'ws'
import type { Events } from '@tsuk1ko/cq-websocket'
import { testWs2cq } from '~/server/utils/ws/ws2cq'
import ChatService from '~/server/service/chat.service'
import { formatCQCtx } from '~/server/utils/helper/logsHelper'

export default defineEventHandler(async (event) => {
  // 请求头中获取 cookie 中的 accessToken
  const reqAccessToken = getCookie(event, 'accessToken')

  // 已经连接转发ws
  if (globalThis.ws)
    return responseObject(200, 'is ready', {})

  try {
    // TODO: 从 DB 中获取
    const { host, port, accessToken } = useRuntimeConfig().cqConfig
    const [msg, botInstance] = await testWs2cq(host, Number(port), accessToken)
    // 向 global 中添加 cqBot
    globalThis.cqBot = botInstance
    const ws = new WebSocket('ws://localhost:4000', { headers: { cookie: `accessToken=${reqAccessToken}` } })
    // 向 global 中添加 nuxt ws
    globalThis.ws = ws

    // 设置相互转发
    botInstance.once('message', () => {
      const sendObj = { message: 'nuxt client onmessage', retCode: 200, userAgent: 'nuxt-client' }
      ws.send(JSON.stringify(sendObj))
    })
    botInstance.on('message', (e, ctx, tags) => {
      const [logsInfo] = formatCQCtx(ctx)
      const { message_type, target_id } = logsInfo
      // 保存聊天记录
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

    // 所有信息转发 用于日志
    botInstance.on('meta_event', (ctx) => {
      ws.send(JSON.stringify(ctx))
    })

    ws.on('message', (data) => {
      try {
        const wsMsg = JSON.parse(data.toString())
        if (wsMsg.from === 'nt-server') {
          const { action, params, echo } = wsMsg

          botInstance.call(action, action, params)
            .then((res) => {
              ws.send(JSON.stringify({ ...res, echo }))
            }).catch((err) => {
              ws.send(JSON.stringify(err))
            })
        }
      }
      catch (e) {
        console.error(e)
      }
    })

    return responseObject(200, 'ok', {
      host,
      msg,
    })
  }
  catch (error: any) {
    return responseObject(400, error.message, {})
  }
})
