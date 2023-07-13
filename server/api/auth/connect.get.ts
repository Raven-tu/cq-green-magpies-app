/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-13 18:34:15
 * @FilePath: /cq-green-magpies-app/server/api/auth/connect.get.ts
 * @Description: 连接到 nuxt ws
 */
import WebSocket from 'ws'
import { testWs2cq } from '~/server/utils/ws/ws2cq'

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
    // 信息转发
    // botInstance.on('message', (event, ctx) => {
    //   ws.send(JSON.stringify(ctx))
    // })
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
