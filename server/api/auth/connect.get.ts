/*
 * @Author: raventu
 * @Date: 2023-06-27 18:11:26
 * @LastEditors: raventu
 * @LastEditTime: 2023-07-25 12:31:29
 * @FilePath: /cq-green-magpies-app/server/api/auth/connect.get.ts
 * @Description: 连接到 nuxt ws
 */
import WebSocket from 'ws'

export default defineEventHandler(async (event) => {
  // 请求头中获取  accessToken
  const reqAccessToken = getHeader(event, 'Authorization')
  const { host } = useRuntimeConfig().cqConfig
  // 已经连接转发ws
  if (globalThis.ws)
    return responseObject(200, 'is ready', {})

  try {
    const wsQuery = () => {
      const accessToken = ((reqAccessToken ?? '').replace('Bearer ', ''))
      return `?accessToken=${accessToken}`
    }
    const wsPath = `ws://127.0.0.1:4000/${wsQuery()}`
    const ws = new WebSocket(wsPath)
    // 向 global 中添加 nuxt ws
    globalThis.ws = ws
    const botInstance = globalThis.cqBot
    // 设置相互转发
    // botInstance.once('message', () => {
    //   const sendObj = { message: 'nuxt client onmessage', retCode: 200, userAgent: 'nuxt-client' }
    //   ws.send(JSON.stringify(sendObj))
    // })

    ws.on('error', (err) => {
      err
      debugger
    })

    // 所有信息转发 用于日志
    botInstance?.on('meta_event', (ctx) => {
      ws.send(JSON.stringify(ctx))
    })

    ws.on('message', (data) => {
      try {
        const wsMsg = JSON.parse(data.toString())
        if (wsMsg.from === 'nt-server') {
          const { action, params, echo } = wsMsg
          botInstance?.call(action, action, params)
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
    })
  }
  catch (error: any) {
    return responseObject(400, error.message, {})
  }
})
